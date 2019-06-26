import React, { useState, useMemo, useEffect } from "react";
import {
  acquireGood,
  getListItems,
  removeGood
} from "../../utils/firebase/goods";
import AddGood from "./AddGood";
import Good from "./Good";

function GoodsList({ selectedList }) {
  const [goods, setGoods] = useState([]);
  const [listInfo, setList] = useState("");
  const [monitor, setMonitor] = useState("");

  useEffect(() => {
    setList(selectedList);
  }, [selectedList]);

  const emitGoodName = name => {
    setMonitor(name);
  };

  useEffect(() => {
    let ignore = false;
    // Gets the lists avaialable by name.
    const fetchListItems = async () => {
      if (listInfo.name === undefined) return;
      const result = await getListItems(listInfo.name);
      let goods = [];
      if (result) {
        if (!result.hasOwnProperty("stuff")) return setGoods(goods);
        goods = Object.values(result.stuff);
        if (!ignore) setGoods(goods);
      } else {
        setGoods(goods);
      }
    };
    fetchListItems();
    return () => {
      ignore = true;
    };
  }, [listInfo, monitor]);

  // This just gets a count of how many goods are left to be acquired.
  const goodsRemaining = useMemo(
    () => goods.filter(good => !good.acquired).length,
    [goods]
  );

  const goodAcquiredByUniqueId = uniqueId => {
    acquireGood(uniqueId, listInfo.name);
    setMonitor(goods);
  };

  const removeGoodByUniqueID = uniqueId => {
    removeGood(uniqueId, listInfo.name);
    setMonitor(goods);
  };

  return (
    <div className="inner-container">
      <div className="section-header">Goods List</div>
      <div className="generic-item">
        <div className="goods-list-add-good">
          <AddGood listInfo={listInfo} emitGoodName={emitGoodName} />
        </div>
        <div className="goods-list-remaining">
          Goods Remaining: ({goodsRemaining})
        </div>
        <ul className="list-container">
          {goods.length >= 1
            ? goods.map(good => (
                <Good
                  good={good}
                  goodAcquiredByUniqueId={goodAcquiredByUniqueId}
                  removeGoodByUniqueID={removeGoodByUniqueID}
                  key={good.uniqueId}
                />
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}

export default GoodsList;

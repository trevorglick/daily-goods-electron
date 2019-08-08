import React, { useState, useMemo, useEffect } from "react";
import {
  acquireGood,
  getListItems,
  removeGood
} from "../../utils/firebase/goods";
import AddGood from "./AddGood";
import Good from "./Good";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";

function GoodsList({ selectedList }) {
  const [goods, setGoods] = useState([]);
  const [listInfo, setList] = useState("");
  const [monitor, setMonitor] = useState("");
  const [toggleGoodAdd, setToggleGoodAdd] = useState(false);

  useEffect(() => {
    setList(selectedList);
  }, [selectedList]);

  useEffect(() => {
    const hiderEl = document.getElementById("hider");
    hiderEl.classList.remove("show-lists");
    hiderEl.classList.add("hide-lists");
  }, []);

  const emitGoodName = name => {
    setMonitor(name);
    toggleAdd();
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

  const toggleAdd = () => {
    setToggleGoodAdd(!toggleGoodAdd);
  };

  return (
    <div className="inner-container">
      <div className="section-header">Back to Lists</div>
      <div className="section-header">
        <div className="list-creation">
          <span>{goods.length >= 1 ? "Goods List" : null}</span>
          <span className="createListButton" onClick={toggleAdd}>
            Add good <FontAwesomeIcon icon={faHamburger} />
          </span>
        </div>
      </div>

      <div className="generic-item">
        {toggleGoodAdd ? (
          <div className="goods-list-add-good">
            <AddGood listInfo={listInfo} emitGoodName={emitGoodName} />
          </div>
        ) : null}

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

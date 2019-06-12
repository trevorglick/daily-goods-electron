import React, { useState, useMemo, useEffect, useRef } from "react";
import { getListItems } from "../../utils/firebase/actions";
import AddGood from "./AddGood";
import Good from "./Good";

function GoodsList({ selectedList }) {
  console.log("selectedList");
  console.log(selectedList);
  const [goods, setGoods] = useState([]);
  const [list, setList] = useState("");

  useEffect(() => {
    setList(selectedList);
  }, [selectedList]);

  useEffect(() => {
    let ignore = false;
    // Gets the lists avaialable by name.
    const fetchListItems = async () => {
      const result = await getListItems(list.name);
      let goods = [];
      if (result) {
        goods = result.stuff;
        if (!ignore) setGoods(goods);
      } else {
        setGoods(goods);
      }
    };
    fetchListItems();
    return () => {
      ignore = true;
    };
  }, [list]);

  // This just gets a count of how many goods are left to be acquired.
  const goodsRemaining = useMemo(
    () => goods.filter(good => !good.acquired).length,
    [goods]
  );

  const goodAcquired = index => {
    const newGoods = [...goods];
    newGoods[index].acquired = true;
    setGoods(newGoods);
  };

  const removeGood = index => {
    const newGoods = [...goods];
    newGoods.splice(index, 1);
    setGoods(newGoods);
  };

  return (
    <div className="goods-list-container">
      <div className="goods-list-header">Goods List</div>
      <div className="goods-list-remaining">
        Pending tasks ({goodsRemaining})
      </div>
      <div className="goods-list-item">
        {goods.length >= 1
          ? goods.map((good, index) => (
              <Good
                good={good}
                index={index}
                goodAcquired={goodAcquired}
                removeGood={removeGood}
                key={index}
              />
            ))
          : null}
      </div>
      <div className="goods-list-add-good">
        <AddGood list={list} />
      </div>
    </div>
  );
}

export default GoodsList;

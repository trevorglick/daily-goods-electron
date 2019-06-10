import React, { useState, useMemo, useEffect, useRef } from "react";
import AddGood from "./AddGood";
import Good from "./Good";

function GoodsList({ listOfGoods }) {
  const [goods, setGoods] = useState([]);

  const previousGoodsRef = useRef(listOfGoods.stuff);
  useEffect(() => {
    if (previousGoodsRef.current !== listOfGoods.stuff) {
      if (listOfGoods.stuff) {
        setGoods(listOfGoods.stuff);
        previousGoodsRef.current = listOfGoods.stuff;
      }
    }
  }, [listOfGoods.stuff, goods]);

  // This just gets a count of how many goods are left to be acquired.
  const goodsRemaining = useMemo(
    () => goods.filter(good => !good.acquired).length,
    [goods]
  );

  const addGood = name => {
    const newGoods = [...goods, { name, acquired: false }];
    setGoods(newGoods);
  };

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
        <AddGood addGood={addGood} />
      </div>
    </div>
  );
}

export default GoodsList;

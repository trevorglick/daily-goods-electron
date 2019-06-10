import React, { useState, useMemo } from "react";
import AddGood from "./AddGood";
import Good from "./Good";

function GoodsList() {
  const [goods, setGoods] = useState([
    {
      name: "Cereal",
      acquired: false
    },
    {
      name: "Milk",
      acquired: true
    },
    {
      name: "Ice",
      acquired: false
    }
  ]);

  // This just gets a count of how many goods are left to be acquired.
  // const goodsRemaining = goods.filter(good => !good.acquired).length;
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
        {goods.map((good, index) => (
          <Good
            good={good}
            index={index}
            goodAcquired={goodAcquired}
            removeGood={removeGood}
            key={index}
          />
        ))}
      </div>
      <div className="goods-list-add-good">
        <AddGood addGood={addGood} />
      </div>
    </div>
  );
}

export default GoodsList;

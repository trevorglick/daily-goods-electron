import React, { useState, useEffect } from "react";
import CreateList from "./CreateList";
import GoodsList from "../Goods/GoodsList";
import List from "./List";
import { deleteList, getLists } from "../../utils/firebase/goods";
import "../../style/goods.css";

function AvailableLists({ user }) {
  const [lists, setLists] = useState([]);
  const [monitor, setMonitor] = useState("");
  const [selectedList, setSelectedList] = useState("");

  const emitListName = name => {
    setMonitor(name);
  };

  const deleteListByIndex = index => {
    deleteList(lists[index].name);
    setMonitor(index);
  };

  const selectList = index => {
    setSelectedList(lists[index]);
  };

  useEffect(() => {
    let ignore = false;
    // Gets the lists avaialable by name.
    const fetchLists = async () => {
      const result = await getLists(user.uid);
      let listData = [];
      if (result) {
        listData = Object.values(result);
        if (!ignore) setLists(listData);
      } else {
        setLists(listData);
        setSelectedList("");
      }
    };
    fetchLists();
    return () => {
      ignore = true;
    };
  }, [monitor, selectedList, user.uid]);

  return (
    <div className="inner-container">
      <div className="section-header">Available Lists</div>
      <div className="generic-item">
        <CreateList emitListName={emitListName} />
        <ul className="list-container">
          {lists.length >= 1
            ? lists.map((list, index) => (
                <List
                  list={list}
                  index={index}
                  selectList={selectList}
                  deleteListByIndex={deleteListByIndex}
                  key={index}
                />
              ))
            : null}
        </ul>
        <hr />
      </div>
      {selectedList ? <GoodsList selectedList={selectedList} /> : null}
    </div>
  );
}

export default AvailableLists;

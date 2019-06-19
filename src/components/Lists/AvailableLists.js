import React, { useState, useEffect } from "react";
import CreateList from "./CreateList";
import GoodsList from "../Goods/GoodsList";
import List from "./List";
import { deleteList, getLists } from "../../utils/firebase/goods";

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
      }
    };
    fetchLists();
    return () => {
      ignore = true;
    };
  }, [monitor, selectedList]);

  return (
    <div>
      <div>Create A New List</div>
      <CreateList emitListName={emitListName} />
      <div>
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
      </div>
      <hr />
      <GoodsList selectedList={selectedList} />
    </div>
  );
}

export default AvailableLists;

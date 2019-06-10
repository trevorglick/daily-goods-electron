import React, { useState, useEffect } from "react";
import CreateList from "./CreateList";
import GoodsList from "../Goods/GoodsList";
import List from "./List";
import {
  deleteList,
  getListItems,
  getLists
} from "../../utils/firebase/actions";

function AvailableLists() {
  const [lists, setLists] = useState([]);
  const [listOfGoods, setListOfGoods] = useState([]);
  const [monitor, setMonitor] = useState("");

  const emitListName = name => {
    setMonitor(name);
  };

  const deleteListByIndex = index => {
    console.log(`list to delete ${lists[index].name}`);
    deleteList(lists[index].name);
    setMonitor(index);
  };

  const retrieveListItems = async index => {
    console.log(`retreiving items from ${lists[index].name}`);
    const result = await getListItems(lists[index].name);
    console.log("result from retrievelistitems");
    console.log(result);
    let listOfGoods = [];
    if (result) {
      setListOfGoods(result);
      return listOfGoods;
    } else {
      setListOfGoods(listOfGoods);
    }
  };

  useEffect(() => {
    let ignore = false;
    // Gets the lists avaialable by name.
    const fetchLists = async () => {
      console.log("fetching lists");
      const result = await getLists();
      let listData = [];
      if (result) {
        console.log("we have a result");
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
  }, [monitor]);

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
                // goodAcquired={goodAcquired}
                retrieveListItems={retrieveListItems}
                deleteListByIndex={deleteListByIndex}
                key={index}
              />
            ))
          : null}
      </div>
      <hr />
      <GoodsList listOfGoods={listOfGoods} />
    </div>
  );
}

export default AvailableLists;

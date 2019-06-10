import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateList from "./CreateList";
import List from "./List";
import {
  deleteList,
  getListItems,
  getLists
} from "../../utils/firebase/actions";

function AvailableLists() {
  const [lists, setLists] = useState([]);
  const [monitor, setMonitor] = useState("");

  const emitListName = name => {
    setMonitor(name);
  };

  const deleteListByIndex = index => {
    console.log(`list to delete ${lists[index].name}`);
    deleteList(lists[index].name);
    setMonitor(index);
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
                deleteListByIndex={deleteListByIndex}
                key={index}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default AvailableLists;

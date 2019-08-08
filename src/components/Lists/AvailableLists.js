import React, { useState, useEffect } from "react";
import CreateList from "./CreateList";
import GoodsList from "../Goods/GoodsList";
import List from "./List";
import { deleteList, getLists } from "../../utils/firebase/goods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import "../../style/goods.css";

function AvailableLists({ user }) {
  const [lists, setLists] = useState([]);
  const [monitor, setMonitor] = useState("");
  const [selectedList, setSelectedList] = useState("");
  const [toggleListCreate, setToggleListCreate] = useState(false);

  const emitListName = name => {
    setMonitor(name);
    toggleCreate();
  };

  const deleteListByIndex = index => {
    deleteList(lists[index].name);
    setMonitor(index);
  };

  const selectList = index => {
    setSelectedList(lists[index]);
  };

  const toggleCreate = () => {
    setToggleListCreate(!toggleListCreate);
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
      <span id="hider" className="show-lists">
        <div className="section-header">
          <div className="list-creation">
            <span>{lists.length >= 1 ? "Available Lists" : null}</span>
            <span className="createListButton" onClick={toggleCreate}>
              Create a List <FontAwesomeIcon icon={faCartPlus} />
            </span>
          </div>
        </div>
        <div className="generic-item">
          {toggleListCreate ? <CreateList emitListName={emitListName} /> : null}
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
      </span>
      {selectedList ? <GoodsList selectedList={selectedList} /> : null}
    </div>
  );
}

export default AvailableLists;

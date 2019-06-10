import { database } from "./index";

const BASE_DATABASE = "/GoodsLists/";

function getDBListRef(listName) {
  return database.ref(BASE_DATABASE + listName);
}

function getDBBaseRef() {
  return database.ref(BASE_DATABASE);
}

export async function getLists() {
  const dbRef = getDBBaseRef();
  let payload;
  await dbRef.once("value").then(function(snapshot) {
    payload = snapshot.val();
  });
  return payload;
}

export function createList(listName) {
  console.log(`Creating list: ${listName}`);
  const dbRef = getDBListRef(listName);

  dbRef.set(
    {
      name: listName,
      stuff: [
        { name: "cereal", acquired: false },
        { name: "milk", acquired: false },
        { name: "cookies", acquired: false }
      ]
    },
    error => {
      if (error) {
        console.log("set failed during creat list");
      } else {
        console.log("data successfully sent");
      }
    }
  );
}

export async function getListItems(listName) {
  console.log(`getting list items for ${listName}`);
  const dbRef = getDBListRef(listName);
  let payload;
  await dbRef.once("value").then(function(snapshot) {
    payload = snapshot.val();
  });

  return payload;
}

export function deleteList(listName) {
  const dbRef = getDBListRef(listName);
  dbRef.remove(error => {
    if (error) {
      console.log(`there was an issue deleting ${listName}`);
    } else {
      console.log(`${listName} has been deleted`);
    }
  });
}

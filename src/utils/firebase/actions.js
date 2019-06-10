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
  const itemsInDB = await dbRef.once("value").then(function(snapshot) {
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
      stuff: ["cereal", "milk", "cookies"]
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

export function getListItems(listName) {
  const dbRef = getDBListRef(listName);
  let payload;
  const itemsInDB = dbRef.on("value", items => {
    payload = items.val();
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

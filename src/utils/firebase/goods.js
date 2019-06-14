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
      name: listName
    },
    error => {
      if (error) {
        console.log("set failed during create list");
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

export function addGood(name, listName) {
  const dbRef = getDBListRef(listName)
    .child("stuff")
    .push();

  const uniqueId = dbRef.key;

  dbRef.set({ uniqueId, name, acquired: false }, error => {
    if (error) {
      console.log(`there was an issue adding ${name} to ${listName}`);
    } else {
      console.log(`${name} has been added to ${listName}`);
    }
  });
}

export function removeGood(uniqueId, listName) {
  const dbRef = getDBListRef(listName)
    .child("stuff")
    .child(uniqueId);
  dbRef.remove(error => {
    if (error) {
      console.log(`there was an issue removing ${uniqueId} from ${listName}`);
    } else {
      console.log(`${uniqueId} has been remove from ${listName}`);
    }
  });
}

export async function acquireGood(uniqueId, listName) {
  const dbRef = getDBListRef(listName)
    .child("stuff")
    .child(uniqueId);

  let payload;
  await dbRef.once("value").then(function(snapshot) {
    payload = snapshot.val();
  });

  let acquired = !payload.acquired;

  dbRef.update({ acquired }, error => {
    if (error) {
      console.log(`there was an issue updating ${uniqueId} in ${listName}`);
    } else {
      console.log(`${uniqueId} has been updated from ${listName}`);
    }
  });
}

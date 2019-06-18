import React, { useEffect, useState } from "react";
import Auth from "./Auth/Auth";
import Header from "./Header";
import AvailableLists from "./Lists/AvailableLists";
import { auth } from "../utils/firebase/index";
import { getRedirectResult } from "../utils/firebase/auth";

function App() {
  const [authedUser, setAuthedUser] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setAuthedUser(user);
        getRedirectResult();
      } else {
        setAuthedUser(null);
      }
    });
  }, [authedUser]);

  return (
    <div className="App">
      <div>
        <Header />
        <hr />
      </div>
      <Auth user={authedUser} />
      <AvailableLists />
    </div>
  );
}

export default App;

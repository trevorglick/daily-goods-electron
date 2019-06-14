import React, { useEffect, useState } from "react";
import Auth from "./Auth/Auth";
import Header from "./Header";
import AvailableLists from "./Lists/AvailableLists";
import { auth } from "../utils/firebase/index";

function App() {
  const [authedUser, setAuthedUser] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      user ? setAuthedUser(user) : setAuthedUser(null);
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

import React, { useEffect, useState } from "react";
import Auth from "./Auth/Auth";
import Header from "./Header";
import AvailableLists from "./Lists/AvailableLists";
import { auth } from "../utils/firebase/index";
import "../style/app.css";
// import { getRedirectResult } from "../utils/firebase/auth";

function App() {
  // const [oAuth, setOAuth] = useState(null);
  const [authedUser, setAuthedUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) return setAuthedUser(null);
      if (user) {
        console.log("user info");
        console.log(user);
        setAuthedUser(user);
        if (user.providerData[0].providerId === "password") return;

        // Might need this code, might not, i'll keep it commented for a little bit.

        // const getOAuthToken = async () => {
        //   const result = await getRedirectResult();
        //   return result;
        // };
        // getOAuthToken()
        //   .then(result => {
        //     setOAuth(result);
        //   })
        //   .catch(error => {
        //     setOAuth(error);
        //   });
      } else {
        setAuthedUser(null);
      }
    });
  }, [authedUser]);

  return (
    <div className="app-container">
      <div>
        <Header />
        <hr />
      </div>
      <Auth user={authedUser} />
      {authedUser ? <AvailableLists user={authedUser} /> : null}
    </div>
  );
}

export default App;

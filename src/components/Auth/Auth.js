import React, { useState } from "react";
import CreateAccount from "./CreateAccount";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import "../../style/auth.css";

function Auth({ user }) {
  const [toggleSignIn, setSignIn] = useState(true);

  const createAccount = () => {
    setSignIn(!toggleSignIn);
  };

  return (
    <div className="inner-container">
      {!user && toggleSignIn ? (
        <div className="form form-generic">
          <SignIn />
          <div className="form-field outer-btn">
            <input
              type="submit"
              onClick={createAccount}
              value="Create Account"
            />
          </div>
        </div>
      ) : null}
      {!user && !toggleSignIn ? (
        <div className="form form-generic">
          <CreateAccount />
          <div className="form-field outer-btn">
            <input
              type="submit"
              onClick={createAccount}
              value="Back to Sign In"
            />
          </div>
        </div>
      ) : null}
      {user ? <SignOut /> : null}
    </div>
  );
}

export default Auth;

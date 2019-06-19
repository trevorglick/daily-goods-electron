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
    <div>
      {!user && toggleSignIn ? (
        <div className="auth-div">
          <SignIn />
          <button className="auth-btn" onClick={createAccount}>
            Create Account
          </button>
        </div>
      ) : null}
      {!user && !toggleSignIn ? (
        <div className="auth-div">
          <CreateAccount />
          <button className="auth-btn" onClick={createAccount}>
            Back to Sign In
          </button>
        </div>
      ) : null}
      {user ? <SignOut /> : null}
    </div>
  );
}

export default Auth;

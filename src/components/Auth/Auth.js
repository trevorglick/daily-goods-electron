import React, { useState } from "react";
import CreateAccount from "./CreateAccount";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

function Auth({ user }) {
  const [toggleSignIn, setSignIn] = useState(true);

  const createAccount = () => {
    setSignIn(!toggleSignIn);
  };

  return (
    <div className="auth">
      {!user && toggleSignIn ? (
        <div>
          <button onClick={createAccount}>Create Account?</button>
          <SignIn />
        </div>
      ) : null}
      {!user && !toggleSignIn ? (
        <div>
          <button onClick={createAccount}>Sign In?</button>
          <CreateAccount />
        </div>
      ) : null}
      {user ? <SignOut /> : null}
    </div>
  );
}

export default Auth;

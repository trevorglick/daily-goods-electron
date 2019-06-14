import React from "react";
import CreateAccount from "./CreateAccount";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

function Auth({ user }) {
  return (
    <div className="auth">
      {!user ? (
        <div>
          <SignIn />
          <CreateAccount />
        </div>
      ) : (
        <SignOut />
      )}
    </div>
  );
}

export default Auth;

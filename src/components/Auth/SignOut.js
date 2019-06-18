import React from "react";
import { doSignOut } from "../../utils/firebase/auth";

function SignOut() {
  return (
    <div className="signout">
      <button onClick={() => doSignOut()}>Sign Out</button>
    </div>
  );
}

export default SignOut;

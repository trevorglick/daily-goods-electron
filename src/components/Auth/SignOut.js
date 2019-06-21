import React from "react";
import { doSignOut } from "../../utils/firebase/auth";

function SignOut() {
  return (
    <div className="form form-generic">
      <div className="form-field outer-btn">
        <input type="submit" onClick={() => doSignOut()} value="Sign Out" />
      </div>
    </div>
  );
}

export default SignOut;

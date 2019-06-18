import React, { useReducer } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle
} from "../../utils/firebase/auth";

const initialValues = {
  email: "",
  password: ""
};

function SignIn() {
  // Using useReducer here to keep track of my form object
  const [values, dispatch] = useReducer(formReducer, initialValues);

  const handleChange = e => {
    dispatch(change(e));
  };
  const handleReset = () => {
    dispatch(reset());
  };

  const handleSubmit = e => {
    e.preventDefault();
    doSignInWithEmailAndPassword(values.email, values.password);
    handleReset();
  };

  const loginWithGoogle = () => {
    doSignInWithGoogle();
  };

  return (
    <div className="sign-in">
      <button onClick={loginWithGoogle}>Login with Google</button>
      <div>Login with email and password</div>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            onChange={e => handleChange(e)}
            value={values.email}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            onChange={e => handleChange(e)}
            value={values.password}
          />
        </label>
        <button type="submit" onClick={e => handleSubmit(e)}>
          Submit
        </button>
      </form>
    </div>
  );
}

// action creators
const change = e => ({
  type: "change",
  payload: { field: e.target.name, value: e.target.value }
});
const reset = (payload = initialValues) => ({ type: "reset", payload });

// reducer for the form to handle setting state of object and resetting it.
function formReducer(state, action) {
  switch (action.type) {
    case "change": {
      const { field, value } = action.payload;
      return { ...state, [field]: value };
    }
    case "reset": {
      return action.payload;
    }
    default: {
      throw new Error(`Unrecognized type: ${action.type}`);
    }
  }
}

export default SignIn;

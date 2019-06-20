import React, { useReducer } from "react";
import { doCreateUserWithEmailAndPassword } from "../../utils/firebase/auth";

const initialValues = {
  email: "",
  password: "",
  passwordConfirmation: ""
};

function CreateAccount() {
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
    doCreateUserWithEmailAndPassword(values.email, values.password);
    handleReset();
  };

  return (
    <div className="auth-container">
      <div className="auth-header">Create Account Information</div>
      <div className="login-item">
        <form className="form form-login" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="email" htmlFor="login-email">
              <span className="hidden">Email</span>
            </label>
            <input
              id="login-email"
              className="form-input"
              type="email"
              name="email"
              placeholder="Enter Email Address"
              onChange={e => handleChange(e)}
              value={values.email}
              required
            />
          </div>
          <div className="form-field">
            <label className="password" htmlFor="login-password">
              <span className="hidden">Password</span>
            </label>
            <input
              id="login-password"
              className="form-input"
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={e => handleChange(e)}
              value={values.password}
              required
            />
          </div>
          <div className="form-field">
            <label className="password" htmlFor="login-password">
              <span className="hidden">Password</span>
            </label>
            <input
              id="login-password"
              className="form-input"
              type="password"
              name="passwordConfirmation"
              placeholder="Re-enter Password"
              onChange={e => handleChange(e)}
              value={values.passwordConfirmation}
              required
            />
          </div>
          <div className="form-field">
            <input
              type="submit"
              onClick={e => handleSubmit(e)}
              value="Create Account"
            />
          </div>
        </form>
      </div>
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

export default CreateAccount;

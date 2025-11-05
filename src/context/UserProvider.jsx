import { useState } from "react";
import { UserContext } from "./UserContext";
import api from "../services/api.js";

export function UserProvider({ children }) {
  const [createUserForm, setCreateUserForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  // const defaultUserForm = {fullName: '', email: '', password: ''};

  const LOGIN_ENDPOINT = "/login";
  const SIGNUP_ENDPOINT = "/signup";
  const LOGOUT_ENDPOINT = "/logout";

  const handleSignup = async (e) => {
    try {
      // const response = await api.post(SIGNUP_ENDPOINT, createUserForm);
      console.log("signup successfully with", createUserForm);
      e.preventDefault();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignupFormChange = (e) => {
    setCreateUserForm({
      ...createUserForm,
      [e.target.name]: String(e.target.value),
    });
    // console.log('name:', e.target.name, ' value:', e.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await api
        .post(LOGIN_ENDPOINT, loginForm)
        .then((res) =>
          res.data.error
            ? console.log(res.data.message)
            : console.error(res.data.message)
        );
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoginFormChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: String(e.target.value),
    });
  };

  const handleLogout = async () => {
    try {
      await api.post(LOGOUT_ENDPOINT);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        createUserForm,
        handleSignup,
        handleSignupFormChange,
        loginForm,
        handleLogin,
        handleLoginFormChange,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

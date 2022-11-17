import React, { FC, useState, useEffect } from "react";
import "./SignIn.scss";
import { Input } from "./../Input";
import { Button } from "../Button";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services";
import { useAppDispatch } from "./../../hooks";
import { setUser } from "../../redux";
import { toast } from "react-toastify";

export const SignIn: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

  const [login, { data }] = useLoginMutation();

  const handleClick = (e: any) => {
    e.preventDefault();
    if (pass && email) {
      login({ user: { email, password: pass } });
    }
  };

  useEffect(() => {
    if (!!data) {
      const { token, username, image, email } = data.user;
      localStorage.setItem("token", token);
      dispatch(setUser({ username, image, token, email, isAuth: true }));
      navigate("/");
      toast.success("Logged in", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [data, dispatch, navigate]);
  return (
    <form className="signin">
      <h3 className="signin__title">Sign In</h3>
      <ul className="signin__inputs">
        <Input
          type="email"
          title="Email address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          title="Password"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
        />
      </ul>
      <Button text="Login" width="100%" onClick={handleClick} />
      <p className="signin__quest">
        Don’t have an account? <NavLink to={"/signup"}>Sign Up.</NavLink>
      </p>
    </form>
  );
};

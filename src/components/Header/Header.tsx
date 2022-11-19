import React, { FC } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { logout } from "../../redux";
import { useAppDispatch } from "./../../hooks";
import { toast, ToastContainer } from "react-toastify";

const NoAuth: FC = () => {
  return (
    <div className="header__sign">
      <NavLink to={"/signin"} className="header__sign-in">
        Sign In
      </NavLink>
      <NavLink to={"/signup"} className="header__sign-up">
        Sign Up
      </NavLink>
    </div>
  );
};

export const Auth: FC<{ onClick: () => any }> = ({ onClick }) => {
  const { username, image } = useAppSelector((state) => state.user);
  return (
    <div className="header__auth">
      <NavLink to={"/new-post"} className="header__auth-create">
        Create article
      </NavLink>
      <div className="header__auth-user">
        <NavLink to={"/edit"} className="name">
          {username}
        </NavLink>
        <div className="image">
          <img
            src={
              image
                ? image
                : "https://static.productionready.io/images/smiley-cyrus.jpg"
            }
            alt=""
          />
        </div>
      </div>
      <div onClick={onClick} className="header__auth-logout">
        Log out
      </div>
    </div>
  );
};

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.user);
  const onLogout = () => {
    dispatch(logout());
    toast.info("Logged out!", {
      position: "top-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="header">
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="header__container">
        <div className="header__logo">
          <NavLink to={"/"}>Realworld Blog</NavLink>
        </div>
        {isAuth ? <Auth onClick={onLogout} /> : <NoAuth />}
      </div>
    </div>
  );
};

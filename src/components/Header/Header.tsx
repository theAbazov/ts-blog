import React, { FC } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";

const NoAuth: FC = () => {
  return (
    <div className="header__sign">
      <div className="header__sign-in">Sign In</div>
      <div className="header__sign-up">Sign Up</div>
    </div>
  );
};

export const Header: FC = () => {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">
          <NavLink to={"/"}>Realworld Blog</NavLink>
        </div>
        <NoAuth />
      </div>
    </div>
  );
};

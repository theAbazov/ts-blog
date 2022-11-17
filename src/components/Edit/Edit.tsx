import React, { FC, useState, useEffect } from "react";
import { useUpdateUserMutation } from "../../services";
import { Button } from "../Button";
import { Input } from "../Input";
import "./Edit.scss";
import { toast } from "react-toastify";
import { useAppDispatch } from "./../../hooks";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux";

export const Edit: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const [update, { data, isError }] = useUpdateUserMutation();

  const onClick = (e: any) => {
    e.preventDefault();
    if (email && username && password && image) {
      update({ user: { email, username, image, password } });
    } else {
      toast.warn("Fill the fields correctly", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    if (data) {
      const { token, username, email, image } = data.user;
      dispatch(setUser({ token, username, email, image, isAuth: true }));
      navigate("/");
      toast.success("User edited successfully");
    }
    if (isError)
      toast.warn("This name is already taken", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  }, [data, isError, navigate, dispatch]);

  return (
    <div className="edit">
      <div className="edit__title"> Edit Profile</div>
      <ul className="edit__inputs">
        <Input
          title="Username"
          onChange={(e) => setUserName(e.target.value)}
          value={username}
        />
        <Input
          title="Email addres"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          title="New password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Input
          title="Avatar img (url)"
          onChange={(e) => setImage(e.target.value)}
          value={image}
        />
      </ul>

      <Button onClick={onClick} width="100%" text="Save" />
    </div>
  );
};

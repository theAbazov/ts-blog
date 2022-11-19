import React, { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { Header } from "./components/Header";
import { PostList } from "./components/PostList";
import { PostDetail } from "./components/PostDetail";
import { SignIn } from "./components/SignIn/SignIn";
import { SignUp } from "./components/SignUp/SignUp";
import { useLazyGetUserQuery } from "./services";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setUser } from "./redux";
import { toast } from "react-toastify";
import { Edit } from "./components/Edit";
import { Create } from "./components/Create";
import { EditPost } from "./components/EditPost";

const App: FC = () => {
  const [getUser, { data, error, isSuccess, isError }] = useLazyGetUserQuery();
  const dispatch = useAppDispatch();
  const { token: tok } = useAppSelector((s) => s.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(setUser({ token }));
  }, [dispatch]); // es-lint кричал что так нельзя и вот добавил dispatch

  useEffect(() => {
    if (tok) getUser(undefined);
  }, [tok, getUser]); // es-lint кричал что так нельзя и вот добавил getUser

  useEffect(() => {
    if (isSuccess && data) {
      const { username, image, token, email } = data.user;
      dispatch(setUser({ username, image, token, isAuth: true, email }));
    }
    if (isError) toast.error("User not found");
  }, [isSuccess, data, dispatch, error, isError]); // анологично)

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:slug" element={<PostDetail />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/new-post" element={<Create />} />
        <Route path="/post-edit/:slug/" element={<EditPost />} />
      </Routes>
    </div>
  );
};

export default App;

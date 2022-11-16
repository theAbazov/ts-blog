import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import "./vars.scss";
import "./App.scss";
import { Header } from "./components/Header";
import { PostList } from "./components/PostList";
import { PostDetail } from "./components/PostDetail";

const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:slug" element={<PostDetail />} />
      </Routes>
    </div>
  );
};

export default App;

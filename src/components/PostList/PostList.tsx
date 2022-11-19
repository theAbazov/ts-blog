import { Pagination } from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import { v4 } from "uuid";
import { useAppSelector } from "../../hooks";
import { useLazyGetPostListQuery } from "../../services";
import { Post } from "./Post";
import "./PostList.scss";

export const PostList: FC = () => {
  const { token, isAuth } = useAppSelector((s) => s.user);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [getPosts, { data, isSuccess, isLoading }] = useLazyGetPostListQuery();

  useEffect(() => {
    getPosts({ limit, page });
  }, [isAuth, token, page, limit, getPosts]);

  if (isLoading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  return (
    <div className="postlist">
      {isSuccess &&
        data!.articles.map((article) => {
          return <Post key={v4()} article={article} />;
        })}
      {isSuccess && (
        <Pagination
          shape="rounded"
          count={Math.ceil(data!.articlesCount / limit)}
          onChange={(_, page) => setPage(page)}
          page={page}
        />
      )}
    </div>
  );
};

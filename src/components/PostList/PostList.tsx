import { Pagination } from "@mui/material";
import React, { FC, useState } from "react";
import { useGetPostListQuery } from "../../services";
import { Post } from "./Post";
import "./PostList.scss";

export const PostList: FC = () => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const token = localStorage.getItem("token") || undefined;
  const { data, isSuccess, isLoading } = useGetPostListQuery({
    limit,
    token,
    page,
  });

  if (isLoading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  return (
    <div className="postlist">
      {isSuccess &&
        data.articles.map((article) => {
          return <Post key={article.slug.split("-")[2]} article={article} />;
        })}
      {isSuccess && (
        <Pagination
          shape="rounded"
          count={Math.ceil(data.articlesCount / limit)}
          onChange={(_, page) => setPage(page)}
          page={page}
        />
      )}
    </div>
  );
};

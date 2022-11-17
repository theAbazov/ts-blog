import React, { FC } from "react";
import "./PostDetail.scss";
import { useParams } from "react-router-dom";
import { Article, useGetPostDetailQuery } from "../../services";
import { format } from "date-fns";

const PostDetailUI: FC<{ article: Article }> = ({ article }) => {
  const {
    title,
    favorited,
    favoritesCount,
    author: { image, username },
    tagList,
    description,
    createdAt,
  } = article;
  return (
    <div className="postdetail">
      <div className="post">
        <div className="post-wrapper">
          <div className="post__content">
            <div className="post__title">
              <div className="post__title-text postdetail__title-text">
                {title}
              </div>
              <div className="post__like">
                <div
                  className={
                    favorited ? "post__like-icon liked" : "post__like-icon"
                  }
                ></div>
                <span>{favoritesCount}</span>
              </div>
            </div>
            <div className="post__tags">
              {tagList.map((tag: string) => (
                <span className="post__tags-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="post__desc postdetail__desc">{description}</div>
          </div>
          <div className="post__author">
            <div className="post__author-data">
              <div className="post__author-name">{username}</div>
              <div className="post__author-created">
                {format(new Date(createdAt || "1 1 2022"), "PP")}
              </div>
            </div>
            <div className="post__author-avatar">
              <img src={image} alt="" />
            </div>
          </div>
        </div>
        <div className="postdetail__body">{article?.body}</div>
      </div>
    </div>
  );
};

export const PostDetail: FC = () => {
  const { slug } = useParams();
  const { data, isSuccess } = useGetPostDetailQuery(slug);

  if (isSuccess) return <PostDetailUI article={data.article} />;
  return <p style={{ textAlign: "center" }}>Loading...</p>;
};

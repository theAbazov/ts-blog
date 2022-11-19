import React, { FC } from "react";
import format from "date-fns/format";
import {
  Article,
  useFovoriteMutation,
  useUnFavoriteMutation,
} from "../../../services";
import { NavLink } from "react-router-dom";
import { v4 } from "uuid";
import "./Post.scss";

export const Post: FC<{ article: Article }> = ({ article }) => {
  const [like] = useFovoriteMutation();
  const [unlike] = useUnFavoriteMutation();
  const {
    title,
    favorited,
    favoritesCount,
    author: { image, username },
    tagList,
    description,
    createdAt,
    slug,
  } = article;

  const handleLike = () => {
    if (favorited) {
      unlike(slug);
    } else {
      like(slug);
    }
  };

  return (
    <div className="postlist__post post">
      <div className="post-wrapper">
        <div className="post__content">
          <div className="post__title">
            <div className="post__title-text">
              <NavLink to={`/post/${slug}`}>{title}</NavLink>
            </div>
            <div className="post__like">
              <div
                onClick={() => handleLike()}
                className={
                  favorited ? "post__like-icon liked" : "post__like-icon"
                }
              ></div>
              <span>{favoritesCount}</span>
            </div>
          </div>
          <div className="post__tags">
            {tagList.map((tag) => (
              <span className="post__tags-tag" key={v4()}>
                {tag}
              </span>
            ))}
          </div>
          <div className="post__desc">{description}</div>
        </div>
        <div className="post__author">
          <div className="post-wrapper">
            <div className="post__author-data">
              <div className="post__author-name">{username}</div>
              <div className="post__author-created">
                {format(new Date(createdAt), "PP")}
              </div>
            </div>
            <div className="post__author-avatar">
              <img src={image} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

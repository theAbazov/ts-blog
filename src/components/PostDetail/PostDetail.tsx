import React, { FC, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  Article,
  useDeletePostMutation,
  useFovoriteMutation,
  useGetPostDetailQuery,
  useUnFavoriteMutation,
} from "../../services";
import { format } from "date-fns";
import { useAppSelector } from "../../hooks";
import { toast } from "react-toastify";
import "./PostDetail.scss";
import "./modal.scss";

const PostDetailUI: FC<{ article: Article }> = ({ article }) => {
  const navigate = useNavigate();

  const [like] = useFovoriteMutation();
  const [unlike] = useUnFavoriteMutation();
  const [deletePost, { isSuccess }] = useDeletePostMutation();

  const [modal, setModal] = useState(false);
  const [agree, setAgree] = useState(false);

  const { username: currentUser } = useAppSelector((s) => s.user);

  const {
    title,
    favorited,
    favoritesCount,
    author: { image, username },
    tagList,
    description,
    createdAt,
    body,
    slug,
  } = article;

  const handleLike = () => {
    if (favorited) {
      unlike(slug);
    } else {
      like(slug);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Deleted", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (agree) {
      deletePost(slug);
    }
    return () => setAgree(false);
  }, [agree, slug, deletePost]);

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
                  onClick={() => handleLike()}
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
            <div className="post__author-wrapper">
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
            {currentUser === username && (
              <div className="btns">
                <button
                  onClick={() => setModal((e) => !e)}
                  className="btn btn__delete"
                >
                  Delete
                  {modal && (
                    <div onClick={(e) => e.stopPropagation()} className="modal">
                      <div className="modal__title">
                        <div className="modal__icon"></div>
                        <p>Are you sure to delete this article?</p>
                      </div>
                      <div className="modal__buttons">
                        <div
                          onClick={() => setModal(false)}
                          className="modal__btn no"
                        >
                          No
                        </div>
                        <div
                          onClick={() => {
                            setAgree(true);
                            setModal(false);
                          }}
                          className="modal__btn yes"
                        >
                          Yes
                        </div>
                      </div>
                    </div>
                  )}
                </button>
                <NavLink to={`/post-edit/${slug}`} className="btn btn__edit">
                  Edit
                </NavLink>
              </div>
            )}
          </div>
        </div>
        <div className="postdetail__body">{body}</div>
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

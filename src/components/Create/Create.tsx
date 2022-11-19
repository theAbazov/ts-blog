import React, { useState, useEffect, FC } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import "./Create.scss";
import { useCreatePostMutation } from "../../services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface TagType {
  text: string;
  id: number;
  handleChange: (value: string, id: number) => any;
  handleDelete: (id: number) => any;
}

export const Tag: FC<TagType> = ({ text, id, handleChange, handleDelete }) => {
  return (
    <li className="tags__item">
      <input
        type="text"
        value={text}
        onChange={(e) => handleChange(e.target.value, id)}
        placeholder="Tag"
      />
      <button className="tags__delete" onClick={() => handleDelete(id)}>
        Delete
      </button>
    </li>
  );
};

export const Create: React.FC = () => {
  const navigate = useNavigate();
  const [createPost, { data }] = useCreatePostMutation();

  //error states
  const [titleErr, setTitltErr] = useState("");
  const [descError, setDescError] = useState("");
  const [textErr, setTextErr] = useState("");
  //error states

  // states
  const [tags, setTags] = useState([{ text: "", id: 1 }]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  // state
  const handleChange = (value: string, current: number) => {
    setTags((tags) =>
      tags.map((tag) =>
        current === tag.id ? { text: value, id: tag.id } : tag
      )
    );
  };

  const handleDelete = (current: number) => {
    setTags((tags) => tags.filter((tag) => current !== tag.id));
  };

  const addTag = (e: any) => {
    e.preventDefault();
    setTags((tags) => [
      ...tags,
      { text: "", id: tags.length ? tags[tags.length - 1].id + 1 : 1 },
    ]);
  };

  const send = (e: any) => {
    e.preventDefault();
    if (text) {
      setTextErr("");
    } else {
      setTextErr("Text is required");
    }

    if (description) {
      setDescError("");
    } else {
      setDescError("Description is required");
    }

    if (title) {
      setTitltErr("");
    } else {
      setTitltErr("Title is required");
    }
    const body = {
      article: {
        title,
        description,
        body: text,
        tagList: tags.map((tag) => tag.text),
      },
    };
    if (text && description && title) createPost(body);
  };

  useEffect(() => {
    if (data) {
      navigate("/");
      toast.success("Post created successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [data, navigate]);

  return (
    <form className="create">
      <h3 className="create__title">Create new article</h3>
      <ul className="create__inputs">
        <Input
          title="Title"
          isError={!!titleErr}
          errorMsg={titleErr}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          title="Short description"
          isError={!!descError}
          errorMsg={descError}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          title="text"
          isError={!!textErr}
          errorMsg={textErr}
          type="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          height="170px"
        />
      </ul>
      <div className="create__tags tags">
        <div className="form__title tags__title">Tags</div>
        <div className="tags__content">
          <ul className="tags__inputs">
            {tags.map(({ text, id }) => (
              <Tag
                key={id}
                text={text}
                id={id}
                handleChange={handleChange}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
          <button onClick={addTag} className="tags__add">
            Add tag
          </button>
        </div>
      </div>
      <Button text="Send" onClick={send} width="319px" />
    </form>
  );
};

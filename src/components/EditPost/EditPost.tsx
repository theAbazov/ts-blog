import React, { useState, useEffect, FC } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { useUpdatePostMutation, useGetPostDetailQuery } from "../../services";
import { useNavigate, useParams } from "react-router-dom";
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

export const EditPost: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [editPost, { data }] = useUpdatePostMutation();
  const { data: currentArticle } = useGetPostDetailQuery(slug);

  //error states
  const [titleErr, setTitltErr] = useState("");
  const [descError, setDescError] = useState("");
  const [textErr, setTextErr] = useState("");
  //error states

  // states
  const [tags, setTags] = useState<{ text: string; id: number }[]>([]);
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
      slug,
      body: {
        article: {
          title,
          description,
          body: text,
          tagList: tags.map((tag) => tag.text),
        },
      },
    };
    if (text && description && title) editPost(body);
  };

  useEffect(() => {
    if (currentArticle) {
      const { title, description, body, tagList } = currentArticle.article;
      setTitle(title);
      setDescription(description);
      setText(body);
      console.log("check");
      tagList.forEach((tag) => {
        setTags((tags) => [
          ...tags,
          { text: tag, id: tags.length ? tags[tags.length - 1].id + 1 : 1 },
        ]);
      });
    }
  }, [currentArticle]);

  useEffect(() => {
    if (data) {
      navigate("/");
      toast.success("Post edited successfully", {
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
      <h3 className="create__title">Edit article</h3>
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

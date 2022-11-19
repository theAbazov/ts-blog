import React, { FC } from "react";
import "./Input.scss";

interface InputTypes {
  type?: string;
  title: string;
  isError?: boolean;
  errorMsg?: string;
  onChange: (e: any) => any;
  value: string;
  height?: string;
}

export const Input: FC<InputTypes> = ({
  type,
  title,
  isError,
  errorMsg,
  onChange,
  value,
  height,
}) => {
  if (type !== "textarea") {
    return (
      <li className="form">
        <label htmlFor={title} className="form__title">
          {title}
        </label>
        <input
          id={title}
          className={isError ? "form__input error-border" : "form__input"}
          style={{ height }}
          type={type}
          onChange={onChange}
          value={value}
          placeholder={title}
        />
        {isError && <div className="form__error">{errorMsg}</div>}
      </li>
    );
  }
  return (
    <li className="form">
      <label htmlFor={title} className="form__title">
        {title}
      </label>
      <textarea
        id={title}
        className={isError ? "form__input error-border" : "form__input"}
        style={{ height, resize: "none" }}
        onChange={onChange}
        value={value}
        placeholder={title}
      />
      {isError && <div className="form__error">{errorMsg}</div>}
    </li>
  );
};

Input.defaultProps = {
  type: "text",
  isError: false,
  errorMsg: "Не предвиденная ошибка",
  height: "40px",
};

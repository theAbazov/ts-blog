import React, { FC } from "react";
import "./Input.scss";

interface InputTypes {
  type?: string;
  title: string;
  isError?: boolean;
  errorMsg?: string;
  onChange: (e: any) => any;
  value: string;
}

export const Input: FC<InputTypes> = ({
  type,
  title,
  isError,
  errorMsg,
  onChange,
  value,
}) => {
  return (
    <label className="form">
      <div className="form__title">{title}</div>
      <input
        className={isError ? "form__input error-border" : "form__input"}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={title}
      />
      {isError && <div className="form__error">{errorMsg}</div>}
    </label>
  );
};

Input.defaultProps = {
  type: "text",
  isError: false,
  errorMsg: "Не предвиденная ошибка",
};

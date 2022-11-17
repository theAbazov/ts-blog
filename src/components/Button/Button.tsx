import React, { FC } from "react";

interface ButtonTypes {
  onClick: (e: object) => void;
  text: string;
  width: string;
}

export const Button: FC<ButtonTypes> = ({ text, width, onClick }) => {
  const style = {
    width,
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#1890ff",
    border: "none",
    outline: "none",
    borderRadius: "4px",
    color: "white",
  };
  return (
    <button onClick={onClick} style={style}>
      {text}
    </button>
  );
};

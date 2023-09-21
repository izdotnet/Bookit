"use client";
import React from "react";
import { ButtonProps } from "../../types";

function Button({ disabled, style, handleClick, type, children }: ButtonProps) {
  return (
    <button
      className={style}
      disabled={disabled}
      type={type}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;

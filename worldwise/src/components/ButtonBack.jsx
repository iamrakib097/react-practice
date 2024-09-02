import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function ButtonBack() {
  const navigator = useNavigate();
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        navigator(-1);
      }}
      type="back"
    >
      <span> &larr;Back</span>
    </Button>
  );
}

export default ButtonBack;

import React from "react";

export default function Button({ onClick, value, label }) {
  return (
    <div onClick={onClick} className="button" value={value}>
      {label}
    </div>
  );
}

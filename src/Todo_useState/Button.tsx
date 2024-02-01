import React from "react";

interface propType {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<propType> = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>Save</button>
    </div>
  );
};

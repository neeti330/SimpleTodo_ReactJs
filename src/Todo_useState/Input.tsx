import React from "react";

interface propsType {
  value: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input: React.FC<propsType> = (props) => {
  return (
    <div>
      <input value={props.value} onChange={props.onChange} />
    </div>
  );
};

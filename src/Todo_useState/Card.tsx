import React from "react";

interface propsType {
  name?: string;
  index?: number;
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
}

export const Card: React.FC<propsType> = (props) => {
  return (
    <div className={"card"}>
      {props.name}
      <button
        onClick={() => {
          props.onEdit?.(props.index!);
        }}
      >
        Edit
      </button>
      <button
        onClick={() => {
          props.onDelete?.(props.index!);
        }}
      >
        Delete
      </button>
    </div>
  );
};

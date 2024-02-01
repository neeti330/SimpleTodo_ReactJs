import React from "react";
import { reducerAction } from ".";

interface propsType {
  name: string;
  dispatch: React.Dispatch<reducerAction>;
  index: number;
}

const Card: React.FC<propsType> = (props) => {
  return (
    <div className={"card"}>
      {props.name}

      <button
        onClick={() => {
          props.dispatch({
            type: "change2Edit",
            payload: { index: props.index },
          });
        }}
      >
        Edit
      </button>

      <button
        onClick={() => {
          props.dispatch({ type: "delete", payload: { index: props.index } });
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Card;

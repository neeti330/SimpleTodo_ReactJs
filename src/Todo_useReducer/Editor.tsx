import React, { useReducer } from "react";

interface propsType {
  type: string;
  name?: string;
  onAdd?: (obj: { name: string }) => void;
  onUpdate?: (index: number, obj: { name: string }) => void;
  index?: number;
}

type state_Type = {
  name: string;
};

type reducer_Action =
  | { type: "setState"; payload: { name: string } }
  | { type: "reset"; payload?: undefined };

const reducer = (state: state_Type, action: reducer_Action): state_Type => {
  switch (action.type) {
    case "setState":
      return { ...state, name: action.payload.name };
    case "reset":
      return { ...state, name: "" };
    default:
      return state;
  }
};

export const Editor: React.FC<propsType> = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    name: props.name || "",
  });

  const _fn = {
    save: () => {
      if (props.type == "edit") {
        props.onUpdate?.(props.index!, state);
      } else {
        props.onAdd?.(state);
        dispatch({ type: "reset" });
      }
    },
    onSet: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "setState", payload: { name: e.target.value } });
    },
  };

  return (
    <div className={"edit"}>
      <p className={"text"}>{props.type}</p>
      <input value={state.name} onChange={_fn.onSet} />
      <button onClick={_fn.save}>Save</button>
    </div>
  );
};

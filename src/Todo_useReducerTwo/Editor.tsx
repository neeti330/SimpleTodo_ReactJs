import React, { useReducer } from "react";
import { reducerAction } from ".";

interface propsType {
  type: string;
  name?: string;
  index?: number | undefined;
  dispatch_add?: React.Dispatch<reducerAction>;
  dispatch_edit?: React.Dispatch<reducerAction>;
}

type state_Type = {
  name: string | undefined;
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

const Editor: React.FC<propsType> = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    name: props.name || "",
  });

  const _fn = {
    save: () => {
      props.type == "edit"
        ? props.dispatch_edit?.({
            type: "edit",
            payload: { name: state.name ?? "", index: props.index! },
          })
        : props.dispatch_add?.({
            type: "add",
            payload: { name: state.name ?? "" },
          });
      dispatch({ type: "reset" });
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
export default Editor;

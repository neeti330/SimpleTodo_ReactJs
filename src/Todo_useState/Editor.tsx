import React, { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

interface propsType {
  type: string;
  name?: string;
  onAdd?: (obj: { name: string }) => void;
  onUpdate?: (index: number, obj: { name: string }) => void;
  index?: number;
}

export const Editor: React.FC<propsType> = (props) => {
  const [state, setState] = useState({
    name: props.name || "",
  });

  const _fn = {
    save: () => {
      if (props.type == "edit") {
        props.onUpdate?.(props.index!, state);
      } else {
        props.onAdd?.(state);
      }
    },
  };

  return (
    <div className={"edit"}>
      <p className={"text"}>{props.type}</p>
      <input
        value={state.name}
        onChange={(e) => {
          setState({ ...state, name: e.target.value });
        }}
      />
      <button onClick={_fn.save}>Save</button>
      {/* <Input value={state.name} onChange={(e)=>{ setState({...state, name:e.target.value})}}/>
            <Button onClick={_fn.save}/> */}
    </div>
  );
};

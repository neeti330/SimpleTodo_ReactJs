import React, { useReducer } from "react";
import { Card } from "./Card";
import { Editor } from "./Editor";

type stateType = {
  mode: "view" | "edit";
  name: string;
}[];

type reducerAction =
  | { type: "add"; payload: { name: string } }
  | { type: "edit"; payload: { name: string; index: number } }
  | { type: "change2Edit"; payload: { index: number } }
  | { type: "delete"; payload: { index: number } };

const reducer = (list: stateType, action: reducerAction): stateType => {
  switch (action.type) {
    case "add":
      const newList = [...list];
      newList.push({
        ...action.payload,
        mode: "view",
      });
      return newList;
    case "edit":
      const newUserList: stateType = list.map((item, i) => {
        if (action.payload.index == i)
          return { ...action.payload, mode: "view" };
        return item;
      });
      return newUserList;
    case "change2Edit":
      const newEditList: stateType = list.map((item, i) => ({
        ...item,
        mode: action.payload.index === i ? "edit" : "view",
      }));
      return newEditList;
    case "delete":
      return list.filter((item, i) => i !== action.payload.index);
    default:
      return list;
  }
};

const Todo_useReducer: React.FC = () => {
  const [list, dispatch] = useReducer(reducer, []);

  const _fn = {
    forAdd: (data: { name: string }) => {
      dispatch({ type: "add", payload: { name: data.name } });
    },
    forEdit: (index: number, data: { name: string }) => {
      dispatch({ type: "edit", payload: { name: data.name, index: index } });
    },
    forDelete: (index: number) => {
      dispatch({ type: "delete", payload: { index: index } });
    },
    forChangetoEdit: (index: number) => {
      dispatch({ type: "change2Edit", payload: { index: index } });
    },
  };

  return (
    <div>
      <div>
        <h1>TODO LIST:</h1>
        <Editor type={"add"} onAdd={_fn.forAdd} />
      </div>
      <div>
        {list.map((item, i) => {
          return (
            <div key={i}>
              {item.mode == "edit" ? (
                <Editor
                  type={"edit"}
                  name={item.name}
                  onUpdate={_fn.forEdit}
                  index={i}
                />
              ) : (
                <Card
                  name={item.name}
                  index={i}
                  onDelete={_fn.forDelete}
                  onEdit={_fn.forChangetoEdit}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo_useReducer;

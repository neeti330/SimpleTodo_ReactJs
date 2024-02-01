import React, { useReducer } from "react";
import Card from "./Card";
import Editor from "./Editor";

type listType = {
  mode: "edit" | "view";
  name: string;
}[];

export type reducerAction =
  | { type: "add"; payload: { name: string } }
  | { type: "edit"; payload: { name: string; index: number } }
  | { type: "change2Edit"; payload: { index: number } }
  | { type: "delete"; payload: { index: number } };

const reducer = (list: listType, action: reducerAction): listType => {
  switch (action.type) {
    case "add":
      const newList = [...list];
      newList.push({
        ...action.payload,
        mode: "view",
      });
      return newList;
    case "edit":
      const newUserList: listType = list.map((item, i) => {
        if (action.payload.index == i)
          return { ...action.payload, mode: "view" };
        return item;
      });
      return newUserList;

    case "change2Edit":
      const newEditList: listType = list.map((item, i) => ({
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

const Todo_useReducerTwo: React.FC = () => {
  const [list, dispatch] = useReducer(reducer, []);
  return (
    <div>
      <div>
        <h1>TODO LIST:</h1>
        <Editor type="add" dispatch_add={dispatch} />
      </div>
      <div>
        {list.map((item, i) => {
          return (
            <div key={i}>
              {item.mode == "edit" ? (
                <Editor
                  type="edit"
                  name={item.name}
                  index={i}
                  dispatch_edit={dispatch}
                />
              ) : (
                <Card name={item.name} index={i} dispatch={dispatch} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo_useReducerTwo;

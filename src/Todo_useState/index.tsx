import React, { useState } from "react";
import { Card } from "./Card";
import { Editor } from "./Editor";

type stateType = {
  mode: "view" | "edit";
  name: string;
}[];

const Todo_useState: React.FC = () => {
  const [list, setList] = useState<stateType>([]);

  const _fn = {
    add: (data: { name: string }) => {
      const newList = [...list];
      newList.push({
        ...data,
        mode: "view",
      });
      setList(newList);
    },
    edit: (index: number, data: { name: string }) => {
      const newList: stateType = list.map((item, i) => {
        if (index == i) {
          return { ...data, mode: "view" };
        }
        return item;
      });
      setList(newList);
    },
    delete: (index: number) => {
      const newList = list.filter((item, i) => index !== i);
      setList(newList);
    },
    change2Edit: (index: number) => {
      const newList: stateType = list.map((item, i) => ({
        ...item,
        mode: index === i ? "edit" : "view",
      }));
      setList(newList);
    },
  };

  return (
    <div>
      <div>
        <h1>TODO LIST:</h1>
        <Editor type={"add"} onAdd={_fn.add} />
      </div>
      <div>
        {list.map((item, i) => {
          return (
            <div key={i}>
              {item.mode == "edit" ? (
                <Editor
                  type={"edit"}
                  name={item.name}
                  onUpdate={_fn.edit}
                  index={i}
                />
              ) : (
                <Card
                  name={item.name}
                  index={i}
                  onDelete={_fn.delete}
                  onEdit={_fn.change2Edit}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo_useState;

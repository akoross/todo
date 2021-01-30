import React from "react";
import TodoListItem from "./todo-list-item";
import "./todo-list.css";

const TodoList = ({ todos, onDeleted, importantItem, doneItem }) => {
   const elements = todos.map((item) => {
      const { id, ...itemProps } = item;
      return (
         <li key={id} className="list-group-item">
            <TodoListItem
               {...itemProps}
               onDeleted={() => onDeleted(id)}
               importantItem={() => importantItem(id)}
               doneItem={() => doneItem(id)}
            />
         </li>
      );
   });

   return <ul className="list-group todo-list">{elements}</ul>;
};

export default TodoList;

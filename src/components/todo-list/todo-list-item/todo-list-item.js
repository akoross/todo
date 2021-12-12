import React from 'react';
import './todo-list-item.css';

const TodoListItem = ({
  label,
  onDeleted,
  importantItem,
  doneItem,
  important,
  done,
}) => {
  let classNames = 'todo-list-item';
  if (done) {
    classNames += ' done';
  }
  if (important) {
    classNames += ' important';
  }
  return (
    <span className={classNames}>
      <span className="todo-list-item-label " onClick={doneItem}>
        {label}
      </span>

      <button
        type="button"
        className="btn btn-outline-success btn-sm red float-right"
        onClick={onDeleted}
      >
        <i className="fa fa-trash-o" />
      </button>
      <button
        type="button"
        className="btn btn-outline-success btn-sm"
        onClick={importantItem}
      >
        <i className="fa fa-exclamation" />
      </button>
    </span>
  );
};

export default TodoListItem

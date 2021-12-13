import React, { useEffect, useState } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form';

const App = () => {
  const [todoData, setTodoData] = useState([]);
  const [term, setTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const savedTodoData = (item) =>
    JSON.parse(localStorage.getItem(item) || '[]');

  useEffect(() => {
    setTodoData(savedTodoData('todoData'));
  }, []);

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoData));
  }, [todoData]);

  const createTodoItem = (label) => {
    return {
      label,
      important: false,
      done: false,
      id: Date.now(),
    };
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const doneItem = (id) =>
    setTodoData((prev) => toggleProperty(prev, id, 'done'));

  const importantItem = (id) =>
    setTodoData((prev) => toggleProperty(prev, id, 'important'));

  const deleteItem = (id) =>
    setTodoData((prev) => prev.filter((el) => el.id !== id));

  const addItem = (text) => {
    const newItem = createTodoItem(text);
    setTodoData((prev) => [...prev, newItem]);
  };

  const search = (items, term) =>
    term.length === 0
      ? items
      : items.filter((item) => {
          return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });

  const onSearch = (term) => setTerm(term);
  const onFilterChange = (filter) => setFilter(filter);

  const changeFilter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  const visibleItems = changeFilter(search(todoData, term), filter);
  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;

  return (
    <div>
      <AppHeader done={doneCount} todo={todoCount} />
      <div className="top-panel d-flex">
        <SearchPanel search={onSearch} />
        <ItemStatusFilter filter={filter} onFilterChange={onFilterChange} />
      </div>
      <TodoList
        todos={visibleItems}
        onDeleted={deleteItem}
        importantItem={importantItem}
        doneItem={doneItem}
      />
      <ItemAddForm onItemAdded={addItem} />
    </div>
  );
};
export default App;

import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";

export default class App extends Component {
   maxId = 100;

   state = {
      todoData: [
         this.createTodoItem("Drink Coffee"),
         this.createTodoItem("Make Awesome App"),
         this.createTodoItem("Have a lunch"),
      ],
      term: "",
      filter: "all",
   };

   createTodoItem(label) {
      return {
         label,
         important: false,
         done: false,
         id: this.maxId++,
      };
   }

   toggleProperty = (arr, id, propName) => {
      const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      const newItem = { ...oldItem, [propName]: !oldItem[propName] };
      return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
   };

   doneItem = (id) => {
      this.setState(({ todoData }) => {
         return {
            todoData: this.toggleProperty(todoData, id, "done"),
         };
      });
   };

   importantItem = (id) => {
      this.setState(({ todoData }) => {
         return {
            todoData: this.toggleProperty(todoData, id, "important"),
         };
      });
   };

   deleteItem = (id) => {
      this.setState(({ todoData }) => {
         const idx = todoData.findIndex((el) => el.id === id);

         const newArray = [
            ...todoData.slice(0, idx),
            ...todoData.slice(idx + 1),
         ];

         return {
            todoData: newArray,
         };
      });
   };

   addItem = (text) => {
      const newItem = this.createTodoItem(text);
      this.setState(({ todoData }) => {
         const newArr = [...todoData, newItem];

         return {
            todoData: newArr,
         };
      });
   };

   search(items, term) {
      if (term.length === 0) {
         return items;
      }

      return items.filter((item) => {
         return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
      });
   }

   onSearch = (term) => this.setState({ term });
   onFilterChange = (filter)=>this.setState({filter});

   filter(items, filter) {
      switch (filter) {
         case "all":
            return items;
         case "active":
            return items.filter((item) => !item.done);
         case "done":
            return items.filter((item) => item.done);
         default:
            return items;
      }
   }

   render() {
      const { todoData, term, filter } = this.state;
      const visibleItems = this.filter(this.search(todoData, term), filter);
      const doneCount = todoData.filter((el) => el.done).length;
      const todoCount = todoData.length - doneCount;

      return (
         <div>
            <AppHeader done={doneCount} todo={todoCount} />
            <div className="top-panel d-flex">
               <SearchPanel search={this.onSearch} />
               <ItemStatusFilter
                  filter={filter}
                  onFilterChange={this.onFilterChange}
               />
            </div>
            <TodoList
               todos={visibleItems}
               onDeleted={this.deleteItem}
               importantItem={this.importantItem}
               doneItem={this.doneItem}
            />
            <ItemAddForm onItemAdded={this.addItem} />
         </div>
      );
   }
}
import React, { Component } from "react";
import "./search-panel.css";

export default class SearchPanel extends Component {
   state = {
      term: "",
   };

   searchChange = (e) => {
      const term = e.target.value;
      this.setState({ term });
      this.props.search(term);
   };

   render() {
      return (
         <input
            className="search-input"
            placeholder="search"
            value={this.state.term}
            onChange={this.searchChange}
         />
      );
   }
}

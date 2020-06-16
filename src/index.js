import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ToDoInput extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    // add value to the list
  }

  render() {
    return (
      <form className="todo-form" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Add new..." />
        <input type="submit" value="Add" />
      </form>
    );
  }
}

class ToDoApp extends React.Component {
  render() {
    return (
      <div className="todo">
        <div className="title">
          <h1>To Do List<span role="img">📝</span></h1>
        </div>
        <div className="todo-board">
          <ToDoInput />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ToDoApp />,
  document.getElementById('root')
);
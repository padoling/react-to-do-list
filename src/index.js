import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  handleCloseClick(e) {
    this.props.onCloseClick(e.target.id);
  }

  render() {
    return (
      <li>
        <button className="check-btn"></button>
        {this.props.value}
        <span 
          id={this.props.id}
          className="close-btn"
          onClick={this.handleCloseClick}>❌</span>
      </li>
    );
  }
}

class ToDoInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleTodoChange = this.handleTodoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTodoChange(e) {
    this.props.onTodoChange(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          placeholder="Add new..." 
          value={this.props.todoValue}
          onChange={this.handleTodoChange} />
        <input type="submit" value="Add" />
      </form>
    );
  }
}

class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoValue: '',
      cnt: 0,
      listItems: []
    };

    this.handleTodoChange = this.handleTodoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  handleTodoChange(value) {
    this.setState({todoValue: value});
  }

  handleSubmit() {
    this.setState({
      listItems: this.state.listItems.concat([{
        id: this.state.cnt + 1,
        value: this.state.todoValue
      }]),
      cnt: this.state.cnt + 1,
      todoValue: ''
    });
  }

  handleCloseClick(id) {
    const listItems = this.state.listItems;
    this.setState({
      listItems: listItems.filter(item => item.id !== parseInt(id))
    });
  }

  render() {
    const listItems = this.state.listItems;
    const todoList = listItems.map(todo => {
      return <ListItem 
        key={todo.id} 
        id={todo.id}
        value={todo.value}
        onCloseClick={this.handleCloseClick} />;
    })

    return (
      <div className="todo">
        <div className="title">
          <h1>To Do List<span role="img">📝</span></h1>
        </div>
        <div className="todo-board">
          <div className="todo-input">
            <ToDoInput 
              todoValue={this.state.todoValue} 
              onTodoChange={this.handleTodoChange}
              onSubmit={this.handleSubmit} />
          </div>
          <div>
            <ul className="todo-list">
              {todoList}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ToDoApp />,
  document.getElementById('root')
);
function TodoList({ $app, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {};
}

function TodoItem({}) {}

export { TodoList, TodoItem };

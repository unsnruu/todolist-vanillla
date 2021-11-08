const TodoList = (function () {
  function TodoList($parent, initialState) {
    this.state = initialState;
    this.$target = document.createElement("ul");
    this.$target.className = TodoList;

    $parent.appendChild(this.$target);
  }

  TodoList.prototype = {
    constructor: TodoList,
    setState(nextState) {
      this.state = nextState;
      this.render();
    },
    render() {
      const todoItems = this.state.map((todoObj) => `<li>${todoObj.text}</li>`);
      this.$target.innerHTML = todoItems.join("");
    },
  };
  return TodoList;
})();

export { TodoList };

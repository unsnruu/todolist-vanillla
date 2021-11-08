import { TodoHeader } from "./TodoHeader.js";
import { TodoList } from "./TodoList.js";

const Todos = (function () {
  function Todos($app, initialState, onClickPrev) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "Todos hide";

    // Appending target to App
    $app.appendChild(this.$target);
    // 외부에서 TodoHeader의 접근을 방지하기 위해 this binding을 하지 않음.
    // 따라서 prototype에서 setState, render 메소드를 생성하지 않는다.
    // 어차피 한 번만 생성될 것이므로 앱에서 문제가 될 것 같진 않지만...
    const todoHeader = new TodoHeader(
      this.$target,
      this.state.where,
      onClickPrev
    );
    const todoList = new TodoList(this.$target, this.state.todos);

    this.setState = (nextState) => {
      this.state = nextState;
      todoHeader.setState(this.state.where);
      todoList.setState(this.state.todos);
    };
  }

  return Todos;
})();

export { Todos };

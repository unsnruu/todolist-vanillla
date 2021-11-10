import { TodoHeader } from "./TodoHeader.js";
import { TodoList } from "./TodoList.js";
import { getId } from "../../api.js";

// TodoItem 추가 버튼 구현해야함.

const Todos = (function () {
  function Todos($app, initialState, onClickPrev, onClickAdd, onClickDelete) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "Todos hide";
    // Appending target to App
    $app.appendChild(this.$target);

    // Components
    const $TodoHeader = new TodoHeader(
      this.$target,
      this.state.where,
      onClickPrev
    );
    const $TodoList = new TodoList(
      this.$target,
      this.state.todos,
      onClickDelete
    );
    //// TodoAdd Component - this binding을 위해 화살표 함수로 선언
    const $TodoAdd = (() => {
      const $container = document.createElement("div");
      //// $container > children
      const $addBtn = document.createElement("button");
      $addBtn.className = "addBtn";
      $addBtn.textContent = "+";
      $addBtn.addEventListener("click", () => {
        const newTodoText = $textInput.value;
        const newTodo = { text: newTodoText, created: new Date(), id: getId() };
        $textInput.value = "";
        onClickAdd(newTodo);
      });

      const $textInput = document.createElement("input");
      $textInput.setAttribute("type", "text");
      $textInput.setAttribute("placeholder", "무엇을 해야하나요?");
      $textInput.setAttribute("autofocus", "true");

      //// Appending
      $container.appendChild($addBtn);
      $container.appendChild($textInput);
      this.$target.appendChild($container);

      return $container;
    })();

    //// 외부에서 컴포넌트들의 접근을 방지하기 위해 this binding을 하지 않음.
    //// 따라서 Todos 생성자 함수의 prototype에서 setState, render 메소드를 생성하지 않는다.
    //// 대신 setState와 Todos 생성자 함수의 instance property로 생성한다.
    //// 어차피 한 번만 생성될 것이므로 앱에서 문제가 될 것 같진 않지만...

    this.setState = (nextState) => {
      this.state = nextState;
      $TodoHeader.setState(this.state.where);
      $TodoList.setState(this.state.todos);
    };
  }

  return Todos;
})();

export { Todos };

import { TodoHeader } from "./TodoHeader.js";
import { TodoList } from "./TodoList.js";
import { getId } from "../../api.js";

// TodoItem 추가 버튼 구현해야함.

const Todos = (function () {
  function Todos(
    $app,
    initialState,
    onClickPrev,
    onClickAdd,
    onClickDelete,
    onClickEdit
  ) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "todos hide";
    this.$target.style.display = "none";
    // Appending $target to App
    $app.appendChild(this.$target);

    // Components
    // $target > $TodoHeader
    const $TodoHeader = new TodoHeader(
      this.$target,
      this.state.where,
      onClickPrev
    );
    // $target > $TodoList
    const $TodoList = new TodoList(
      this.$target,
      this.state.todos,
      onClickDelete,
      onClickEdit
    );
    // $target > $TodoAdd
    // this binding을 위해 화살표 함수로 선언
    const $TodoAdd = (() => {
      const $container = document.createElement("div");
      $container.className = "todoAdd";
      //// $container > $addBtn
      const $addBtn = document.createElement("button");
      $addBtn.className = "addBtn";
      $addBtn.textContent = "+";
      $addBtn.addEventListener("click", () => {
        const newTodoText = $textInput.value;
        if (!newTodoText.length) return;
        const newTodo = { text: newTodoText, created: new Date(), id: getId() };
        $textInput.value = "";
        onClickAdd(newTodo);
      });
      //// $container > $textInput
      const $textInput = document.createElement("input");
      $textInput.setAttribute("type", "text");
      $textInput.setAttribute("placeholder", "무엇을 해야하나요?");
      $textInput.setAttribute("autofocus", "true");
      $textInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter" && $textInput.value.length) {
          // textInput.value.length을 조건으로 설정한 이유
          // 아무 것도 없는 todo를 추가하지 않기 위해서
          // 한글 입력시 keyup/keydown에서 엔터 입력 이벤트가 두번 실행되는 문제가 있기 때문에
          // 해당 문제 참고 https://www.inflearn.com/questions/9010
          const newTodoText = $textInput.value;
          const newTodo = {
            text: newTodoText,
            created: new Date(),
            id: getId(),
          };
          $textInput.value = "";
          onClickAdd(newTodo);
        }
      });

      //// Appending
      $container.appendChild($addBtn);
      $container.appendChild($textInput);
      this.$target.appendChild($container);

      return $container;
    })();

    // 함수 외부에서의 하위 컴포넌트들에 대한 접근을 방지하기 위해 this binding을 하지 않음.
    // 따라서 Todos this로 조회가 불가능 하므로 생성자 함수의 prototype에서 setState, render 메소드를 생성하지 않는다.
    // 대신 setState와 Todos 생성자 함수의 instance property로 생성한다.
    // 어차피 한 번만 생성될 것이므로 앱에서 문제가 될 것 같진 않지만...

    let timerId = null;
    this.setState = (nextState) => {
      this.state = nextState;
      $TodoHeader.setState(this.state.where);
      $TodoList.setState(this.state.todos);

      this.render();
    };
    this.render = () => {
      if (timerId) {
      }
      if (this.state.where === null) {
        //onClickPrev
        this.$target.className = "todos hide";
        timerId = setTimeout(() => {
          this.$target.style.display = "none";
          timerId = null;
        }, 400);
      } else {
        this.$target.style.display = "flex";
        if (timerId) {
          clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
          this.$target.className = "todos";
          timerId = null;
        }, 0);
      }
    };
  }

  return Todos;
})();

export { Todos };

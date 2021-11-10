import { getId } from "../../api.js";

const TodoList = (function () {
  function TodoList($parent, initialState, onClickDelete) {
    this.state = initialState;
    this.onClickDelete = onClickDelete;
    this.$target = document.createElement("ul");
    this.$target.className = "todoList";

    $parent.appendChild(this.$target);
  }

  TodoList.prototype = {
    constructor: TodoList,
    setState(nextState) {
      this.state = nextState;
      this.render();
    },
    render() {
      // 아래 로직은 todo를 추가할 떄, 전체가 추가되지 않도록 해야 할 듯.
      this.$target.innerHTML = "";
      const $fragment = document.createDocumentFragment();

      this.state.forEach((todo) => {
        const { text, id } = todo;
        const $li = document.createElement("li");
        const $deleteBtn = document.createElement("button");
        $deleteBtn.className = "deleteBtn";
        $deleteBtn.textContent = "delete";
        $deleteBtn.addEventListener("click", (event) => {
          const $parentLi = event.target.parentElement;
          const selectedId = $parentLi.dataset.id;
          this.onClickDelete(selectedId);
        });
        $li.setAttribute("data-id", id);
        $li.className = "todoItem";
        $li.textContent = text;

        $li.appendChild($deleteBtn);
        $fragment.appendChild($li);
      });
      this.$target.appendChild($fragment);

      // innerHTML을 사용하면 간단하긴 한데,
      // 모든 요소 노드들이 리렌더링 되어서 비효율적이라는 생각이 든다.
      // delete를 사용하기 위해서, 아래 로직을 사용하지 않음
      // const todoItems = this.state.map((todoObj) => `<li>${todoObj.text}</li>`);
      // this.$target.innerHTML = todoItems.join("");
    },
  };
  return TodoList;
})();

export { TodoList };

const TodoList = (function () {
  function TodoList($parent, initialState, onClickDelete, onClickEdit) {
    this.state = initialState;
    this.$targetUl = document.createElement("ul");
    this.$targetUl.className = "todoList";
    // Component - ul: event(dblclick)
    this.$targetUl.addEventListener("dblclick", ({ target }) => {
      const lis = Array.from(this.$targetUl.children);
      if (target.matches(".todoItem > input")) {
        // ul > li > input
        lis.forEach(($li) => {
          const $input = $li.children[1];
          if ($input === target) {
            $input.disabled = false;
            window.getSelection().collapseToEnd();
          } else {
            $input.disabled = true;
          }
        });
      } else {
        lis.forEach(($li) => {
          const $input = $li.children[1];
          $input.disabled = true;
        });
      }
    });

    this.onClickDelete = onClickDelete;
    this.onClickEdit = onClickEdit;

    $parent.appendChild(this.$targetUl);
  }

  TodoList.prototype = {
    constructor: TodoList,
    setState(nextState) {
      this.state = nextState;
      this.render();
    },
    render() {
      // 아래 로직은 todo를 추가할 떄, 전체가 추가되지 않도록 해야 할 듯.
      // innerHTML을 쓰지않고는 구현할 수 없을까.
      this.$targetUl.innerHTML = "";
      const $fragment = document.createDocumentFragment();
      this.state.forEach((todoObj) => {
        const todoItem = TodoItem(
          todoObj,
          this.onClickDelete,
          this.onClickEdit
        );
        $fragment.appendChild(todoItem);
      });
      this.$targetUl.appendChild($fragment);

      // innerHTML을 사용하면 간단하긴 한데,
      // 모든 요소 노드들이 리렌더링 되어서 비효율적이라는 생각이 든다.
      // delete를 사용하기 위해서, 아래 로직을 사용하지 않음
      // const todoItems = this.state.map((todoObj) => `<li>${todoObj.text}</li>`);
      // this.$target.innerHTML = todoItems.join("");
    },
  };
  return TodoList;
})();

function TodoItem(todoObj, onClickDelete, onClickEdit) {
  const { text, id, completed } = todoObj;
  //container
  const $container = document.createElement("li");
  $container.className = "todoItem";
  $container.setAttribute("data-id", id);
  //container: event handlers
  $container.addEventListener("click", () => {
    //click 이벤트가 발생시 background-color를 바꾼다.
  });
  //container > checkbox
  const $checkbox = document.createElement("div");
  if (!completed) {
    $checkbox.className = "checkbox";
  } else {
    $checkbox.className = "checkbox complete";
  }
  $checkbox.addEventListener("click", () => {
    $checkbox.classList.toggle("complete");
    const checkedTodo = { ...todoObj, completed: !completed };
    onClickEdit(checkedTodo);
  });
  //container > input
  const $input = document.createElement("input");
  $input.value = text;
  $input.disabled = true;
  $input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      $input.disabled = true;
      const editedTodo = { ...todoObj, text: event.target.value };
      onClickEdit(editedTodo);
    }
  });
  //container > deleteBtn
  const $deleteBtn = document.createElement("button");
  $deleteBtn.className = "deleteBtn";
  $deleteBtn.textContent = "delete";
  $deleteBtn.addEventListener("click", () => {
    onClickDelete(id);
  });
  //container:disabled=false" > editBtn
  // const $editBtn = document.createElement("button");
  // $editBtn.classList = "editBtn";
  // $editBtn.textContent = "edit";
  // $editBtn.addEventListener("click", (event) => {});

  //Appending
  $container.append($checkbox);
  $container.appendChild($input);
  $container.appendChild($deleteBtn);

  return $container;
}

export { TodoList };

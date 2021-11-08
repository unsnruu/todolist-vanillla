const Todos = (function () {
  function Todos($app, initialState, onClickPrev) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "Todos hide";

    //Issue
    //prev(goBack)버튼을 어디에 구현해야 할까.
    //1. header(button과 title) 부분과 todolist부분을 나눈다. -> 아예 생성자 함수 생성
    //2. 억지로 여기서 우겨넣기...?

    // TodoHeader
    //// PrevBtn : 처음에 this로 구현했는데, 굳이 프로퍼티로 만들 필요가 없을 듯.
    //// 오히려 외부접근을 차단하는 편이 낫기때문에 변수로 대체.
    const $prevBtn = document.createElement("button");
    $prevBtn.addEventListener("click", onClickPrev);
    $prevBtn.textContent = "<";
    //// Title : render에서 참조하기 위해 this binding. 인스턴스 프로퍼티로 만듦.
    this.$title = document.createElement("h3");
    this.$title.textContent = "menu1";
    //// Merge
    this.$target.appendChild(this.$title);
    this.$target.appendChild($prevBtn);

    // TodoList : render에서 this로 참조하므로 this로 선언함
    // 이후 #render에서 $todolist를 참조하지 않고,
    // 여기 생성자 함수에서 아예 처리하면 cosnt로 선언할 수 있지 않을까?
    this.$todolist = document.createElement("ul");
    this.$target.appendChild(this.$todolist);

    // Appending target to App
    $app.appendChild(this.$target);
  }
  Todos.prototype = {
    constructor: Todos,
    setState(nextState) {
      this.state = nextState;
      this.render();
    },
    render() {
      const todos = this.state.todos.map(
        (todoObj) => `<li>${todoObj.text}</li>`
      );
      this.$todolist.innerHTML = `
        ${todos.join("")}
      `;
      this.$title.innerHTML = this.state.where;
    },
  };
  return Todos;
})();

export { Todos };

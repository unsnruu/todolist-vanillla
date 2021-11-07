const Todos = (function () {
  function Todos($app, initialState, onClickPrev) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "Todos";

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
    //// Title : 처음에 this로 구현했는데, 굳이 프로퍼티로 만들 필요가 없을 듯.
    //// 오히려 외부접근을 차단하는 편이 낫기때문에 변수로 대체.
    const $title = document.createElement("h3");
    $title.textContent = "menu1";
    //// Merge
    this.$target.appendChild($title);
    this.$target.appendChild($prevBtn);

    // TodoList
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
      const todos = this.state.map((todo) => `<li>${todo}</li>`);
      this.$todolist.innerHTML = `
        ${todos.join("")}
      `;
    },
  };
  return Todos;
})();

export { Todos };

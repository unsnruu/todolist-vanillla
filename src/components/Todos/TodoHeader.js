const TodoHeader = (function () {
  function TodoHeader($parent, initialState, onClickPrev) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "TodoHeader";

    // PrevBtn : 처음에 this로 구현했는데, 굳이 프로퍼티로 만들 필요가 없을 듯.
    // 오히려 외부접근을 차단하는 편이 낫기때문에 변수로 대체.
    const prevBtn = document.createElement("button");
    prevBtn.addEventListener("click", onClickPrev);
    prevBtn.textContent = "<";

    // Title : render에서 참조하기 위해 this binding. 인스턴스 프로퍼티로 만듦.
    this.$title = document.createElement("h3");
    this.$title.textContent = "menu1";
    // Append to $target(===Todos);
    this.$target.appendChild(this.$title);
    this.$target.appendChild(prevBtn);

    $parent.appendChild(this.$target);
  }
  TodoHeader.prototype = {
    constructor: TodoHeader,
    setState(nextState) {
      this.state = nextState;
      this.render();
    },
    render() {
      this.$title.textContent = this.state;
    },
  };
  return TodoHeader;
})();

export { TodoHeader };

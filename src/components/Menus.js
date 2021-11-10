const Menus = (function () {
  function Menus($app, initialState, onClickMenu) {
    this.state = initialState;

    const $title = document.createElement("h2");
    $title.textContent = "오늘은 무슨 일을 할까요?";
    $app.appendChild($title);

    this.$target = document.createElement("ul");
    this.$target.className = "Menus";

    // this.$target.addEventListener("click", onClickMenu);
    $app.appendChild(this.$target);

    this.onClickMenu = onClickMenu;
  }

  Menus.prototype = {
    constructor: Menus,
    setState(nextState) {
      if (this.state === nextState) return;
      this.state = nextState;
      this.render();
    },
    render() {
      this.$target.innerHTML = "";

      const menuLists = this.state.map((menu) => {
        const list = document.createElement("li");
        list.textContent = menu;
        list.addEventListener("click", this.onClickMenu);
        return list;
      });
      menuLists.forEach((list) => this.$target.appendChild(list));
    },
  };

  return Menus;
})();

export { Menus };

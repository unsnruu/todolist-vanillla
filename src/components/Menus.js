const Menus = (function () {
  function Menus($app, initialState, onClickMenu) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "menu";
    // Component: $target > $title
    const $title = document.createElement("h2");
    $title.className = "menuTitle";
    $title.textContent = "오늘은 무슨 일을 할까요?";
    // Component: $target > $menuList
    this.$menuList = document.createElement("ul");
    this.$menuList.className = "menuList";
    this.$menuList.addEventListener("click", (event) => {
      if (event.target.matches(".menuItem")) {
        onClickMenu(event.target.textContent);
      }
    });
    // Appending
    this.$target.appendChild($title);
    this.$target.appendChild(this.$menuList);
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
      this.$menuList.innerHTML = "";

      const $fragment = document.createDocumentFragment();
      this.state.forEach((menu) => {
        const $li = document.createElement("li");
        $li.className = "menuItem";
        $li.textContent = menu;
        $fragment.appendChild($li);
      });

      this.$menuList.appendChild($fragment);
    },
  };

  return Menus;
})();

export { Menus };

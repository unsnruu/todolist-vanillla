const Menus = (function () {
  function Menus($app, initialState, onClickMenu) {
    this.state = initialState;
    this.$target = document.createElement("ul");

    this.$target.className = "Menus";
    this.$target.addEventListener("click", onClickMenu);
    $app.appendChild(this.$target);
  }

  Menus.prototype = {
    constructor: Menus,
    setState(nextState) {
      if (this.state === nextState) return;
      this.state = nextState;
      this.render();
    },
    render() {
      const title = "무엇을 해야하나요?";
      const menuLists = this.state.map((menu) => `<li>${menu}</li>`);
      this.$target.innerHTML = `
        <h2>${title}</h2>
        ${menuLists.join("")}
      `;
    },
  };

  return Menus;
})();

export { Menus };

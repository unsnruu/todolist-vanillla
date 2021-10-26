export function CategoryList({ $app, initalState, onClick }) {
  this.state = initalState;

  this.$target = document.createElement("ul");
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { isRoot, categories } = this.state;

    this.$target.innerHTML = "";
    console.log("isRoot", isRoot);
    if (isRoot) {
      categories.forEach((cat) => {
        const $cat = document.createElement("li");
        $cat.textContent = cat;
        $cat.addEventListener("click", onClick);
        this.$target.appendChild($cat);
      });
    }
  };
}

export function Navbar({ $app, initialState, onPrevClick }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { where } = this.state;
    const $nav = document.createElement("nav");
    $app.appendChild($nav);
    //어떻게 하면 리렌더링을 방지할 수 있을까
    //뒤로가기 표기하기
    const $prevBtn = document.createElement("button");
    $prevBtn.textContent = "<";
    $prevBtn.addEventListener("click", onPrevClick);
    //this.state를 통해 현재 user가 위치한 catergory를 제목으로 보여줌
    const $title = document.createElement("h3");
    $title.textContent = this.state;

    $nav.appendChild($prevBtn);
    $nav.appendChild($title);
  };
}

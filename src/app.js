import { getMenus, getTodos } from "./api.js";
import { Menus } from "./components/Menus.js";
import { Todos } from "./components/Todos.js";

// const cache = {};

export default function App($app) {
  this.rootState = { menus: [], todos: [], where: null };

  const onClickMenu = async (event) => {
    const clickedMenu = event.target.textContent;
    const todoData = await getTodos(clickedMenu);
    // 캐쉬 저장 구현할 것
    this.setState({ ...this.rootState, where: clickedMenu, todos: todoData });
    // Style
    todos.$target.className = "Todos";
  };
  const onClickPrev = () => {
    // Todos의 prevBtn 컴포넌트를 누를 수 있는 상태에서는 이미 menus데이터가 존재하므로
    // 별도의 데이터 작업은 필요 없다. 대신 Todos 컴포넌트를 안보이게 해야함.
    // Style
    todos.$target.className = "Todos hide";
  };
  const menus = new Menus($app, {}, onClickMenu);
  const todos = new Todos($app, {}, onClickPrev);

  this.setState = (nextState) => {
    this.rootState = nextState;
    menus.setState(this.rootState.menus);
    todos.setState({
      todos: this.rootState.todos,
      where: this.rootState.where,
    });
  };

  // this.render은 필요없을 듯. this.setState를 통해,
  // 각 컴포넌트 내부에서 각자 렌더링이 되기 때문이다.
  const init = async () => {
    const menuData = await getMenus();
    const initialData = { ...this.rootState, menus: menuData };
    //캐쉬 추가할 것
    this.setState(initialData);
  };
  init();
}

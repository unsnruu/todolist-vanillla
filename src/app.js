import { getMenus, getTodos, getId } from "./api.js";
import { Menus } from "./components/Menus.js";
import { Todos } from "./components/Todos/Todos.js";

const todosCache = {};

export default function App($app) {
  this.rootState = { menus: [], todos: [], where: null };

  const onClickMenu = async (event) => {
    const clickedMenu = event.target.textContent;
    let todoData;
    if (!todosCache[clickedMenu]) {
      todoData = await getTodos(clickedMenu);
    } else {
      todoData = todosCache[clickedMenu];
    }
    // 캐쉬 저장 구현할 것
    this.setState({ ...this.rootState, where: clickedMenu, todos: todoData });
    // Style
    todos.$target.className = "Todos";
  };
  const onClickPrev = () => {
    // Todos의 prevBtn 컴포넌트를 누를 수 있는 상태에서는 이미 menus데이터가 존재하므로
    // 별도의 데이터 작업은 필요 없다. 대신 Todos 컴포넌트를 안보이게 해야함.
    // Styling
    todos.$target.className = "Todos hide";
    // 사실 뒤로가기를 했을 떄 아예 컴포넌트에 접근을 못하도록 삭제하고,
    // 이후 menu를 클릭할 떄 다시 재생성하는 편이 낫지 않을까 싶기도 하다.

    // setTimeout(() => {
    //   todos.$target.className = "Todos hide completely";
    // }, 1000);
  };

  const onClickAdd = (newTodo) => {
    const nextState = {
      ...this.rootState,
      todos: [...this.rootState.todos, newTodo],
    };
    this.setState(nextState);
  };
  const onClickDelete = (selectedId) => {
    const filterdTodos = this.rootState.todos.filter(
      ({ id }) => selectedId !== id
    );
    const nextState = { ...this.rootState, todos: filterdTodos };
    this.setState(nextState);
  };

  const menus = new Menus($app, {}, onClickMenu);
  const todos = new Todos($app, {}, onClickPrev, onClickAdd, onClickDelete);

  this.setState = (nextState) => {
    this.rootState = nextState;
    if (this.rootState.where) {
      todosCache[this.rootState.where] = this.rootState.todos;
    }
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

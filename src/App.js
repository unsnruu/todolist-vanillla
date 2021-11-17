import { getMenus, getTodos } from "./api.js";
import { Menus } from "./components/Menus.js";
import { Todos } from "./components/Todos/Todos.js";
import { Background } from "./components/Background.js";

const todosCache = {};

export default function App($app) {
  this.rootState = { menus: [], todos: [], where: null, isLoading: false };

  const onClickMenu = async (clickedMenu) => {
    let todoData;

    if (todosCache[clickedMenu]) {
      todoData = todosCache[clickedMenu];
    } else {
      todoData = await getTodos(clickedMenu);
    }

    const nextState = {
      ...this.rootState,
      where: clickedMenu,
      todos: todoData,
    };

    this.setState(nextState);
  };

  const onClickPrev = () => {
    this.setState({ ...this.rootState, where: null });
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
  const onClickEdit = (editedTodo) => {
    const newTodos = this.rootState.todos.map((todo) =>
      todo.id === editedTodo.id ? editedTodo : todo
    );
    this.setState({ ...this.rootState, todos: newTodos });
  };
  // Background($app);
  const menus = new Menus($app, {}, onClickMenu);
  const todos = new Todos(
    $app,
    {},
    onClickPrev,
    onClickAdd,
    onClickDelete,
    onClickEdit
  );

  this.setState = (nextState) => {
    this.rootState = nextState;

    if (this.rootState.where) {
      todosCache[this.rootState.where] = nextState.todos;
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

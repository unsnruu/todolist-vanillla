import {} from "./api.js";
import { Menus } from "./components/Menus.js";
import { Todos } from "./components/Todos.js";

export default function App($app) {
  this.rootState = {};

  const onClickMenu = () => {};
  const onClickPrev = () => {};
  const menus = new Menus($app, {}, onClickMenu);
  const todos = new Todos($app, {}, onClickPrev);

  this.setState = (nextState) => {
    this.rootState = nextState;
    menus.setState(["today", "tomorrow", "next", "chores"]);
    todos.setState(["todo1", "todo2", "todo3", "todo4"]);
  };

  // this.render은 필요없을 듯. this.setState를 통해,
  // 각 컴포넌트 내부에서 각자 렌더링이 되기 때문이다.
  const init = async () => {
    this.setState();
  };
  init();
}

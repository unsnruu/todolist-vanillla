import { getCatData } from "./api.js";
import { Navbar } from "./components/todos/Navbar.js";
import { CategoryList } from "./components/CategoryList.js";
import { TodoList } from "./components/todos/TodoList.js";

export default function App($app) {
  this.state = {
    isLoading: false,
    isRoot: true,
    where: null,
    categories: [],
    todos: [],
  };

  const navbar = new Navbar({
    $app,
    initialState: { where: this.state.where },
    onPrevClick: () => {
      this.setState({ ...this.state, where: null, isRoot: true });
    },
  });

  const categoryList = new CategoryList({
    $app,
    initialState: { categories: this.state.categories },
    onClick: (event) => {
      this.setState({
        ...this.state,
        isRoot: false,
        where: event.target.textContent,
      });
    },
  });

  const todoList = new TodoList({ $app, initialState: {}, onClick: () => {} });

  this.setState = (nextState) => {
    this.state = nextState;
    /*
    $app.innerHTML = "" 의 주의 사항
    -> 컴포넌트 아래에 묶인 $target이 사라지기 떄문에.
    render()에서 $app.appendChild($target)을 하거나,
    아니면 다른 방시을 찾아보는 게 좋을 듯 하다. 
    */

    //this.state.isRoot가 true이면 categoryList가 렌더링
    //this.state.isRoot가 false이면 Todos가 렌더링 되게 한다.
    categoryList.setState({
      isRoot: this.state.isRoot,
      categories: this.state.categories,
    });
    navbar.setState(this.state.where);
    todoList.setState();
  };

  //this.render은 필요없을 듯. this.setState를 통해,
  //각 컴포넌트 내부에서 각자 렌더링이 되기 때문이다.
  //this.render = () => {};

  const init = async () => {
    this.setState({ ...this.state, isLoading: true });
    try {
      const categories = await getCatData();
      this.setState({ ...this.state, isRoot: true, categories });
    } catch (err) {
      throw new Error(err);
    }
    this.setState({ ...this.state, isLoading: false });
  };
  init();
}

//Server의 역할을 대신하는 로직을 구현합니다.

const db = {
  categories: ["Today", "Next Week", "To-Buy", "Shopping", "Chores"],
  todos: {
    Today: [],
    "Next Week": [],
    "To-Buy": [],
    Shopping: [],
    Chores: [],
  },
};

async function getCatData() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      return res(categoriesData);
    }, 1000);
  });
}

async function getTodoData() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      return res(todosData);
    }, 200);
  });
}

export { getCatData, getTodoData };

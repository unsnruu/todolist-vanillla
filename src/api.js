//Server의 역할을 대신하는 로직을 구현합니다.

const categoriesData = ["Immediately", "Tasks", "Shopping"];
const todosData = [
  {
    id: "abc",
    category: "Immediately",
    text: "빨래 하기",
    created: new Date().getTime(),
  },
];

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

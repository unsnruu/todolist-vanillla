//Server의 역할을 대신하는 로직을 구현합니다.

const db = {
  categories: ["Today", "Next Week", "Shopping", "Chores", "(Error)"],
  todos: {
    Today: [
      { text: "서류 보내기", created: new Date(), deadline: new Date() },
      { text: "리액트 스터디" },
      { text: "과제 끝내기" },
    ],
    "Next Week": [],
    Shopping: [{ text: "과자" }, { text: "폼 클렌저" }],
    Chores: [{ text: "강아지 산책 하기" }, { text: "수건 빨래 하기" }],
  },
};

function getMenus() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      return res(db.categories);
    }, 700);
  });
}

function getTodos(menu) {
  return new Promise((res, rej) => {
    if (!db.todos[menu]) {
      return rej(new Error("No menu has found"));
    } else {
      setTimeout(() => {
        return res(db.todos[menu]);
      }, 500);
    }
  });
}

export { getMenus, getTodos };

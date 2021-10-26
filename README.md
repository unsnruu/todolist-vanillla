# Todolist-Vanilla

## Logs

### 2021.10.25

- 어제에 이어서 컴포넌트 함수의 로직의 디자인을 어떻게 해야할지 고민된다.

1. 기존 내가 알고 있던 방식대로

```js
////1
function Sample() {
  this.state = {
    //state
  };
  this.setState = () => {};
  this.render = () => {
    //...rendering
  };
}
```

2. this를 제거하고, state를 숨겨서 클로저 함수로 변환.

```js
////2
function Sample() {
  let state = {
    firstName: "ungseon",
    lastName: "ryu",
    gender: "male",
  };
  const setState = (nextState) => {
    state = nextState;
    render();
  };
  const render = () => {
    //...rendering
  };

  /* 제대로 작동하는 지 확인하고자 만든 함수
  const printState = () => {
    console.log(state);
  };
  */
  return { setState, render };
}
```

2의 경우처럼 작성하면 재사용에 어려움이 있는 걸까?

### 2021.10.24

- 왜 생성자 함수로 작성을 해야할까?
  components를 최상위에서 관리하는 역할의 App.js에서 namespace 방식으로 상태 변화를 components에 capturing 하기 위해서가 아닐까 생각해 본다. 이를 모듈 방식으로 가능하게 할 수는 없을까? (ES6 module, module)

- 어플리케이션은 어떤 식으로 작동하는가?
  1.  Event가 발생한다
  2.  상태가 변화한다.
  3.  상태 변화 함수를 호출한다.
  4.  상태 변화 함수의 내부에서 UI를 다시 렌더링하는 함수가 호출된다.

### 2021.10.23

- 기본적인 파일과 디렉토리를 구성했습니다.
- 해당 애플리케이션의 구조를 어떻게 짜야할지 고민 중입니다.
- 어떤 컴포넌트들이 필요할 지 고민 중입니다.

## Issues

1. 메타 태그 `<meta http-equiv="X-UA-Compatible" content="IE=edge" />`의 뜻하는 바가 무엇인가
   [참고](https://stackoverflow.com/questions/6771258/what-does-meta-http-equiv-x-ua-compatible-content-ie-edge-do)

2. Vanilla JS에서 import/export하기
   .html 파일의 script 부분에 `type` attribute 추가하고 값을 `module` 한다. `<script type="module" src="파일 위치"`.

3. attribute vs property
   [HTML : attribute와 property 의 차이](https://jeongwooahn.medium.com/html-attribute%EC%99%80-property-%EC%9D%98-%EC%B0%A8%EC%9D%B4-d3c172cebc41)

## Reference

[고양이 사진첩 - git](https://github.com/hanameee/vanillaJSKitty)

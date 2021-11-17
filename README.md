# Todolist-Vanilla

## Logs

### 2021.11.12

#### 기능 수정 사항

- [ ] TodoItem의 수정을 한 번에 하나씩 할 수 있도록 구현하기
- [ ] TodoItem를 수정할 때 빈 문자열인 경우 기존의 todo로 복원하기
- [ ] enter말고도 disabled attribute가 true일 때, 외부 화면을 클릭 시 toggle되도록 변경하기
- [x] 완료여부를 확인할 수 있는 checkbox 삽입하기
- [ ] 메뉴창에서 add/edit/delete 기능 구현하기

#### 스타일링을 하면서

- 데스크탑과 모바일에서의 디자인을 다르게 구상해야겠다.
- 데스크탑의 경우 굳이 prev 버튼도 필요없고, todo창을 숨겼다가 보여줄 필요가 없다.
- 모바일의 경우, prev버튼도 필요하고, todo창을 숨겼다가 보여줬다가 해야한다.

### 2021.11.10

공부랑 병행해서 하려니 너무 시간이 오래걸린다.
시간이 오래 걸리다 보니, 아무래도 처음에 가진 흥미가 식는 것도 있다.
그래도 JS의 구조에 대해서 새로 배우면서 하다보니,
성능의 최적화 등을 위해 계속 리팩토링을 할 사항이 생기는 점은 좋다.
이번에 새롭게 알게 된 메소드는 `document.createDocumentFragment`이다.
이를 적용하면 re-rendering 보다 효율적으로 할 수 있다고 한다.

#### 지금까지 구현한 기능

- 초기화면(메뉴 선택 화면)
- 초기화면에서 메뉴(혹은 카테고리)를 선택할 시에만 Todo화면이 나타나는 기능
- Todo 화면에 선택에 카테고리에 등록된 메뉴가 나타나도록 하는 기능
- TodoItems를 추가/삭제하는 기능

#### 앞으로 구현할 기능

- Menu를 추가/삭제/수정하는 기능
- TodoItems를 수정하는 기능
- TodoItems를 완료하는 기능
- 시간대 별로 Menu 화면에서 다른 title 메세지를 보여주는 기능
- TodoItems를 deadline/created 등의 조건에 따라 sorting하는 기능
- typescript로 전환하기

#### 변수/ 클래스 어트러뷰트의 이름과 관련한 규칙

- 식별자는 카멜케이스로 선언한다.
- 식별자가 DOM의 노드라면 $를 붙인다.
- 클래스 어트러뷰트는 카멜케이스로 선언한다.

### 2021.11.4

- 한참만에 다시 프로젝트로 다시 돌아왔다.
- 컴포넌트를 구현하는 도중에 Class와 Prototype, this binding을 어떻게 사용해야 효율적일지 고민이 들어서, `Modern Js Deep Dive`를 공부하였기 때문이다.
- 이렇게 프로젝트를 구현하지 못하도 질질 끄는 행동은 좋지 못하다는 생각이 든다. 지금은 배우는 중이라 괜찮지만, 실제 업무를 할 때 과연 이게 좋은 자세인지에 대한 의문이 든다.
- ['2021 Dev-Matching: 웹 프론트엔드 개발자(상반기)' 기출 문제 해설](https://prgms.tistory.com/53)에서 컴포넌트를 `(일반적)생성자 함수`와 `클래스`를 통해 각각 구현하는 예시를 초반에 보여준다. 그런데 생성자 함수에서는 메소드를 인스턴스 메소드로 구성하고, 클래스에서는 프로토타입 메소드로 구현하는지 잘 모르겠다.
- 어찌되었든 이제 인스턴스와 메소드, 프로토타입 등에 대해 아주 오랜만에 다시 공부할 수 있는 기회였다. 일단은 구현을 우선시하고, 리팩토링을 추후에 진행하는 식으로 방향을 정해본다.

### 2021.10.27

- 초기 화면에서 카테고리를 선택했을 시, 카테고리에 해당되는 todo-list를 구현하는 방법을 고민 중이다.
- 안보이게 처리할 수는 있지만, DOM Node가 계속 남아있다. 이를 어떻게 처리하면 좋을까?
- **일단은 구현, 정리는 나중에!**

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

4. Issue(21.11.16): 메뉴 클릭시 투두 리스트가 갑자기 나타나는 이슈

#### 문제 파악

여러번에 걸쳐 반복적으로 메뉴 버튼을 클릭할 때, 투두리스트가 나타나지 않다가 갑자기 투두 리스트가 나타나는 경우가 있음.
이 경우, 첫 번째 클릭은 마치 아무 동작을 하지 않는 것처럼 동작한다. 다시 클릭하면 트랜지션 효과가 적용되지 않고 바로 투두 리스트의 화면이 갑자기 등장한다.
App.js의 onClickMenu에서 문제가 생긴듯 하다. 아마 `todos.$target.style.display = "flex";` 부분이나, 비동기로 처리한 `todos.$target.className = "todos";`부분이 문제의 원인이 아닐까 싶다.

#### 문제 파악 2

살펴본 결과, 오히려 onClickPrev버튼에 문제가 있음을 발견했다.

```js
// src/App.js > onClickPrev()
setTimeout(() => {
  todos.$target.style.display = "none";
}, 500);
```

해당 이벤트 핸들러는 최소 500ms이후에 display 속성을 변경하는데, 이는 스타일에 적용된 transition이 제대로 작동하기 위함이었다. 그러나 이 트랜지션이 작동하는 도중에 메뉴 버튼이 클릭된다면, 메뉴 클릭 이벤트와 prev 이벤트가 충돌하게 된다.
이를 해결하기 위해서는 트랜지션이 끝나고 메뉴 버튼을 활성화 하거나, 트랜지션의 시간을 조정하는 식으로 회피할 수 있을 것 같다고 당장은 생각이 든다.

#### 해결책 1

일단은 일종의 throttling을 구현해 놓았다. 두 이벤트 핸들러의 상위 스코프에 timerId를 설정하여 setTimout이 발생할 시에 값을 할당하게 하였다. 완료될 시에는 timerId를 null로 재할당하였다. 만약 timerId값이 존재한다면 이벤트가 일어나지 않도록 했으며 `alert`을 사용해서 다시 시도해 달라는 문구를 띄우기로 결정했다.
하지만 빠르게 메뉴를 클릭할 때 이벤트가 발생하지 않는 현상은 그대로이므로, 사용자의 편의를 해치는 건 여전하다. 이 문제를 해결하려면 어떡해야할까. 아직은 감이 잘 오지 않는다. 아마 스타일링을 구현하기 위해 사용한 로직부터 바꿔야 하지 않을까 싶다.
아니면 모두다 시간 차를 두고 setTimeout에 넣을까. timerSecond 변수를 이벤트 핸들러에 선언하고 조금 시간을 늦춰봤지만, 그 부분이 문제가 아닌가 보다. `todos.$target.style.display = "flex";`로 인해 바로 flex가 바뀌는 것이 문제이므로 여기로 손보면 될 것 같다.
`setTimeout(()=>{todos.$target.style.display = "flex";})`로 바꾸어 봤지만, 이상하게 작동했다.

#### 해결책 2

전역적으로 loading 값을 관리하면 좋을 듯 하다. 그러니까 `src/App.js`의 `rootState.loading`에 값을 지정해서 관리를 하는 셈이다.

## Reference

[고양이 사진첩 - git](https://github.com/hanameee/vanillaJSKitty)

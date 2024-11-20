import { createContext, useReducer } from "react";
import { todoReducers } from "../reducers/todoReducer";
// state interface (context)
// 1. state의 원형 제작
//  1-1. state를 변경시킬 함수들의 원형을 제작. (객체 리터럴 형태로)
export const TodoContext = createContext({
  // 아래를 작성하는 이유. 나중에 자동완성 기능을 쓰기 위해
  contextTodo: [],
  // event를 받는 이유? checkbox를 체크 / 체크해제 했을 때, 해당 checkbox값을 얻어 오기 위해서.
  contextDone(event) {},
  contextAddTodo(task, dueDate, alertRef) {},
  // reducer를 만들기 위해 두개 구현
});

// 2. state interface implementation (Contextprovider)
//  2-1. context의 함수들(1-1)을 구현.
export function TodoContextProvider({ children }) {
  // 왜 여기서 state를 또 만드냐? 위에서 만든건 인터페이스
  // 가져야 하는 초기값은 배열.
  //const [todo, setTodo] = useState([
  //{ id: 0, isDone: true, task: "ABC", dueDate: "2024-11-20" },
  //]); // 여기에 todo-Item을 넣어서 테스트를 한번 해본다. 근데 안됌
  // useState를 쓸 수 없는 곳에다가 쓴 것. 위의 context를 공급해주는게 TodoContextProvider. 공급 받을 컴포넌트에서 TodoContextProvider로 적어놨음.
  // 이걸 쓸수 있는 애는 Todo와 AddTodo. provider를 useContext로 쓰고 싶으면 provider를 공급받는 컴포넌트를 새로 만들어야 함. 내가 주는 컴포넌트에서는 못씀.

  // 이렇게 state를 만들면 위에 넣어준다.

  // reducer를 쓰겠다. []는 reducer가 관리할 기본 값. 이 기본값이 todoReducer의 state로 전달됨.(비어있음)
  const [todo, todoDispatcher] = useReducer(todoReducers, []); // dispather가 todoReducer 호출하고 action 정보를 전달함. setTodo 대체.

  const contextImplementation = {
    // app.js에서 가져옴.
    contextTodo: todo, // todo 자체가 배열
    contextDone(event) {
      const checkedDoneId = parseInt(event.target.value);
      const isChecked = event.target.checked;
      // dispatcher 등록
      todoDispatcher({
        type: "DONE",
        payload: { id: checkedDoneId, isChecked },
      });
    },
    contextAddTodo(task, dueDate, alertRef) {
      let alertMessages = [];
      if (!task) {
        alertMessages.push("task를 입력하세요.");
      }

      if (!dueDate) {
        alertMessages.push("due date를 입력하세요.");
      }

      // Modal을 위한 조건
      if (!task || !dueDate) {
        // show에 전달할 배열을 만들어서 넣어줘야 함.
        alertRef.current.show(alertMessages);
        //alert("내용을 입력해야 합니다.");
        return;
      }
      // key value가 동일하기 때문에 : task, :dueDate 생략
      todoDispatcher({ type: "ADD", payload: { task, dueDate } });
    },
  };

  // 3. ContextProvider를 전역으로 구성.
  //  3-1. ContextProvider를 사용할 컴포넌트들을 관리.
  return (
    <TodoContext.Provider value={contextImplementation}>
      {children}
    </TodoContext.Provider>
  );
}

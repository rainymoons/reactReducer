import { createContext, useState } from "react";
// state interface (context)
// 1. state의 원형 제작
//  1-1. state를 변경시킬 함수들의 원형을 제작. (객체 리터럴 형태로)
export const TodoContext = createContext({
  // 아래를 작성하는 이유. 나중에 자동완성 기능을 쓰기 위해
  contextTodo: [],
  // event를 받는 이유? checkbox를 체크 / 체크해제 했을 때, 해당 checkbox값을 얻어 오기 위해서.
  contextDone(event) {},
  contextAddTodo(task, dueDate, alertRef) {},
});

// 2. state interface implementation (Contextprovider)
//  2-1. context의 함수들(1-1)을 구현.
export function TodoContextProvider({ children }) {
  // 왜 여기서 state를 또 만드냐? 위에서 만든건 인터페이스
  // 가져야 하는 초기값은 배열.
  const [todo, setTodo] = useState([
    //{ id: 0, isDone: true, task: "ABC", dueDate: "2024-11-20" },
  ]); // 여기에 todo-Item을 넣어서 테스트를 한번 해본다. 근데 안됌
  // useState를 쓸 수 없는 곳에다가 쓴 것. 위의 context를 공급해주는게 TodoContextProvider. 공급 받을 컴포넌트에서 TodoContextProvider로 적어놨음.
  // 이걸 쓸수 있는 애는 Todo와 AddTodo. provider를 useContext로 쓰고 싶으면 provider를 공급받는 컴포넌트를 새로 만들어야 함. 내가 주는 컴포넌트에서는 못씀.

  // 이렇게 state를 만들면 위에 넣어준다.

  const contextImplementation = {
    // app.js에서 가져옴.
    contextTodo: todo, // todo 자체가 배열
    contextDone(event) {
      const checkedDoneId = parseInt(event.target.value);
      const isChecked = event.target.checked;

      // state를 setTodoList가 아닌 setTodo가 호출되도록 변경
      setTodo((prevTodoItemList) =>
        prevTodoItemList.map((todo) => {
          if (todo.id === checkedDoneId) {
            todo.isDone = isChecked; // 체크를 했던 todo는 값이 바뀌어서 반환된다.
          }
          return todo;
        })
      );
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

      // 값을 가져와서 setTodoList 호출. -> 새롭게 추가한것만 배열에 넣어야 함.
      //prevTodoList최신의 스테이트 -> 배열로 만들어야함.
      // 객체 리터럴로 넣어줌. 그렇게 만들었으니까.
      // 앞에 넣어주면 배열의 가장 앞에 들어감. 반대의 경우 제일 밑.
      setTodo((prevTodoList) => [
        {
          id: prevTodoList.length, // 0-1-2-3-4-5 순으로 증가하므로 length로 준다.
          isDone: false,
          task, // value가 task로 같으므로 생략 가능
          dueDate, // 마찬가지로 생략 가능
        },
        ...prevTodoList,
      ]);
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

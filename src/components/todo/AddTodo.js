import { useContext, useRef } from "react";
import addTodoStyle from "./AddTodo.module.css";
import { Alert } from "../ui/Modal";
import { TodoContext } from "./contexts/TodoContext";

export default function AddTodo() {
  // ref부터 만든다.
  const taskRef = useRef();
  const dueDateRef = useRef();
  const alertRef = useRef();

  // 훅은 (컴포넌트)함수 내부에서만 사용 가능
  const { contextAddTodo } = useContext(TodoContext);

  // task 내용과 duedate내용을 가져와서 setTodoList에 추가
  const onClickAddButtonHandler = () => {
    const task = taskRef.current.value;
    const dueDate = dueDateRef.current.value;

    // TodoContext에 있는 contextAddTodo를 호출.
    contextAddTodo(task, dueDate, alertRef);

    // 입력값 초기화
    taskRef.current.value = "";
    dueDateRef.current.value = "";
  };

  return (
    <div className={addTodoStyle.addTodoWrapper}>
      <label className={addTodoStyle.addTodoLabel} htmlFor="task">
        Task
      </label>
      <input
        className={addTodoStyle.addTodoInput}
        type="text"
        id="task"
        placeholder="Input Task"
        ref={taskRef}
      />

      <label className={addTodoStyle.addTodoLabel} htmlFor="due-date">
        Due Date
      </label>
      <input type="date" id="due-date" ref={dueDateRef} />

      <button
        className={addTodoStyle.addTodoButton}
        onClick={onClickAddButtonHandler}
      >
        등록
      </button>

      <Alert alertRef={alertRef} />
    </div>
  );
}

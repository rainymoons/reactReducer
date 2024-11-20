import { useContext } from "react";
import todoStyle from "./Todo.module.css";
import { TodoContext } from "./contexts/TodoContext";

//onClickDoneHandler이 앱에 있는 스테이트를 바꾸는 것
export default function Todo({ todo }) {
  // todo는 객체리터럴이므로 분해
  const { id, isDone, task, dueDate } = todo;

  // todo의 완료상태 여부에 따라 css 다르게 적용
  const itemStyle = {
    color: isDone ? "#CCC" : "#333",
    textDecoration: isDone ? "line-through" : "none",
  };

  const { contextDone } = useContext(TodoContext);
  const onClickDoneHandler = (event) => {
    // TodoContext에 있는 contextDone 함수 호출
    contextDone(event);
  };

  return (
    <li className={todoStyle.todoItem} style={itemStyle}>
      <div className={todoStyle.inputWrapper}>
        <input
          defaultValue={id}
          type="checkbox"
          onChange={onClickDoneHandler}
          checked={isDone ? "checked" : ""}
        />
      </div>
      <div className={todoStyle.todoName}>{task}</div>
      <div>{dueDate}</div>
    </li>
  );
}

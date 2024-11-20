import { useContext } from "react";
import { TodoContext } from "./contexts/TodoContext";
import Todo from "./Todo";
import AddTodo from "./AddTodo";

export default function TodoList() {
  const { contextTodo } = useContext(TodoContext);

  return (
    <div>
      <h4>
        완료: {contextTodo.filter((todo) => todo.isDone).length} / 미완료:{" "}
        {contextTodo.filter((todo) => !todo.isDone).length}
      </h4>
      <ul>
        {contextTodo.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
      <AddTodo />
    </div>
  );
}

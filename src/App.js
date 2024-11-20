import { TodoContextProvider } from "./components/todo/contexts/TodoContext";
import TodoList from "./components/todo/TodoList";

export default function App() {
  // state와 관련된 모든 것들 삭제
  // 근데 아래에서 state가 필요함 -> contextTodo()

  // context를 땡겨오려고 함.

  return (
    <TodoContextProvider>
      <TodoList />
    </TodoContextProvider>
  );
}

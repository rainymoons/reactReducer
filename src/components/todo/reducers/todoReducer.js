/**
 * state를 관리(변경)하는 함수들만 별도로 분리, 보관하는 함수 => Reducer
 * dispatch가 호출되면 reducer가 호출된다.
 *
 * : context 없이 reducer 만으로도 state 통합 관리가 가능.
 * : 보통 context + reducer의 조합으로 사용한다.
 *  Why? reducer만으로 state를 관리할 경우, 복잡해질 가능성이 높다.
 *  context는 state를 공급만 해준다. reducer만 각각의 state와 관련된 함수들만 모아서 관리.
 * @param {*} state : Reducer가 관리하는 state
 * @param {*} action : state를 변경시킬 정보들(dispatcher에 의해 전달된다.) => {type, payload}
 */
export const todoReducers = (state, action) => {
  /*
      todo 완료 처리할 경우의 action
      {type: "DONE", payload: todo의 id}
    */
  const type = action.type; // action에서 type을 꺼내고

  if (type === "DONE") {
    // todo를 완료 / 미완료 토글하는 코드.
    // 파라미터로 들어온 state는 어떻게 변경 해야 하나?
    // 새로운 state를 반환시킨다. (더 이상 set~~하지 않음)
    return state.map((todo) => {
      if (todo.id === action.payload.id) {
        todo.isDone = action.payload.isChecked; // 체크하면 바꿔서 넣어라.
      }
      return todo; // 여기서 반환하는 대상은 Map임. 그러면 state를 새로 만드는 것(메모리 주소가 바뀐다.)
    });
  } else if (type === "ADD") {
    /*
     * (아래처럼 들어올 것이라고 가정)
     * todo를 추가하는 경우의 action
     * { type: "ADD", payload: {task: "sample task", dueDate: "2024-11-20"}}
     */
    return [
      {
        id: state.length,
        isDone: false,
        task: action.payload.task,
        dueDate: action.payload.dueDate,
      },
      ...state,
    ];
  } // 더 할게 있으면 여기서 또 else if 하면 됨

  // action type이 어디에도 해당하지 않을 때에는, 원래의 state를 그대로 반환시킨다. -> 이렇게 안하면 아무 값도 가지지 않음(void)
  return state;
};

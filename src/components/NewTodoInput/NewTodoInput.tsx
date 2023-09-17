import { memo } from "react";
import { addTodo } from "../../redux/features/todosSlice/todosThunks";
import { useAppDispatch } from "../../redux/hooks";
import { NewTodoInputField } from "../../styles/NewTodoInputStyles";

function NewTodoInput() {
  const dispatch = useAppDispatch();

  const handleSubmitTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    if (e.key === "Enter" && text.trim() !== "" && text.length >= 3) {
      dispatch(addTodo(text));
      e.currentTarget.value = "";
    }
  };

  return (
    <>
      <NewTodoInputField
        minLength={3}
        maxLength={20}
        type="text"
        placeholder="What needs to be done?"
        onKeyDown={handleSubmitTodo}
      />
    </>
  );
}

export default memo(NewTodoInput);

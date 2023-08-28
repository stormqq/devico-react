import { memo } from "react";
import styles from "./NewTodoInput.module.css";

function NewTodoInput({ addTodo }) {
  const handleSubmitTodo = (e) => {
    const text = e.target.value;
    if (e.key === "Enter" && text.trim() !== "" && text.length >= 3) {
      addTodo(text);
      e.target.value = "";
    }
  };
  console.log("NewTodoInput rendered");
  return (
    <>
      <input
        className={styles.todoInput}
        minLength="3"
        maxLength="20"
        type="text"
        placeholder="What needs to be done?"
        onKeyDown={handleSubmitTodo}
      />
    </>
  );
}

export default memo(NewTodoInput);

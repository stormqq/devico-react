import { memo, useState } from "react";
import styles from "./TodoItem.module.css";

// import funcs from useTodos ?

function TodoItem({ todo, setTodos, deleteTodo, toggleCompleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputError, setInputError] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
    setEditedText(todo.text);
  };

  const handleChangeEditing = (e) => {
    setEditedText(e.target.value);
  };

  const handleClickOutside = (e) => {
    if (editedText.trim() !== "" && editedText.trim().length >= 3) {
      handleSave();
    } else {
      setIsEditing(false);
      setEditedText(todo.text);
      setInputError("");
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    setTodos((prevTodos) =>
      prevTodos.map((todoItem) =>
        todoItem.id === todo.id ? { ...todoItem, text: editedText } : todoItem
      )
    );
    setInputError("");
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      if (editedText.trim() === "") {
        setInputError("TODO IS EMPTY");
      } else if (editedText.trim().length < 3) {
        setInputError("TODO IS TOO SHORT");
      } else {
        handleSave();
      }
    }
  };

  console.log("TodoItem rendered", todo.id);
  return (
    <li className={styles.todoItem}>
      <div className={styles.checkName}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleCompleted(todo.id)}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={handleChangeEditing}
            onBlur={handleClickOutside}
            onKeyDown={handlePressEnter}
            className={`${styles.editInput} ${inputError && styles.inputError}`}
          />
        ) : (
          <span
            className={`${todo.completed && styles.completed}`}
            onDoubleClick={handleEdit}
          >
            {todo.text}
          </span>
        )}
        {inputError && (
          <span className={styles.inputErrorMessage}>{inputError}</span>
        )}
      </div>
      <span className={styles.deleteButton} onClick={() => deleteTodo(todo.id)}>
        ❌
      </span>
    </li>
  );
}

export default memo(TodoItem);
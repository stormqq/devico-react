import { memo, useState } from "react";
import styles from "./TodoItem.module.css";
import { deleteTodo, saveEditedTodo } from "../../redux/features/todosSlice/todosThunks";
import { useAppDispatch } from "../../redux/hooks";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
}

function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [inputError, setInputError] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
    setEditedText(todo.text);
  };

  const handleChangeEditing = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value);
  };

  const handleClickOutside = () => {
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
    console.log('todo id: ', todo.id);
    console.log('editedText: ', editedText);
    dispatch(saveEditedTodo({
      id: todo.id,
      text: editedText
    }));
    setInputError("");
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
          onChange={() => {
            console.log('todo.id: ', todo.id);
            dispatch(saveEditedTodo({
              id: todo.id,
            }));
          }}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            minLength={3}
            maxLength={20}
            autoFocus
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
      <span className={styles.deleteButton} onClick={() => {
        console.log('deleting id: ', todo.id)
        dispatch(deleteTodo(todo.id))
      }}>
        ❌
      </span>
    </li>
  );
}

export default memo(TodoItem);

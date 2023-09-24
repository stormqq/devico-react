import { memo, useState } from "react";
import { deleteTodo, saveEditedTodo } from "../../redux/features/todosSlice/todosThunks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CheckNameContainer, DeleteButton, EditingInput, InputError, TodoCheckbox, TodoItemText, TodoListItem } from "../../styles/TodosListItemStyles";

interface TodoItemProps {
  todo: {
    id: string;
    text: string;
    completed: boolean;
  };
}

function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [inputError, setInputError] = useState("");

  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return null;
  }

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
    if (user) {
    dispatch(saveEditedTodo({
      id: todo.id,
      text: editedText,
      uid: user.uid
    }));
  }
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

  const handleChangeCheckbox = () => {
    console.log('from handleChangeCheckbox: ', todo.id, user.uid)
    if (user) {
    dispatch(saveEditedTodo({
      id: todo.id,
      uid: user.uid,
    }));
  }
  };

  const handleDeleteTodo = () => {
    dispatch(deleteTodo({
      id: todo.id,
      uid: user.uid
    }));
  };

  console.log("TodoItem rendered", todo.id);
  return (
    <TodoListItem >
      <CheckNameContainer>
        <TodoCheckbox disableRipple checked={todo.completed} onChange={handleChangeCheckbox} />
        {isEditing ? (
          <EditingInput
            isError={inputError}
            value={editedText}
            minLength={3}
            maxLength={20}
            autoFocus
            onChange={handleChangeEditing}
            onBlur={handleClickOutside}
            onKeyDown={handlePressEnter}
          />
        ) : (
          <TodoItemText completed={todo.completed} onDoubleClick={handleEdit}>
            {todo.text}
          </TodoItemText>
        )}
        {inputError && (
          <InputError>{inputError}</InputError>
        )}
      </CheckNameContainer>
      <DeleteButton disableRipple onClick={handleDeleteTodo}>
        ❌
      </DeleteButton>
    </TodoListItem>
  );
}

export default memo(TodoItem);

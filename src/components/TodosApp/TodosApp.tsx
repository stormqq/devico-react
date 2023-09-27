import TodoList from "../TodoList/TodoList";
import NewTodoInput from "../NewTodoInput/NewTodoInput";
import TodosFilters from "../TodosFilters/TodosFilters";
import { useEffect, useMemo } from "react";
import {
  fetchTodos,
  selectAll,
} from "../../redux/features/todosSlice/todosThunks";
import { removeError } from "../../redux/features/todosSlice/todosSlice";
import { getAllTodosSelector } from "../../redux/selectors/todosSelectors";
import { getCurrErrorSellector } from "../../redux/selectors/currErrorSelector";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  CurrError,
  SelectAllButton,
  TodosHeaderCell,
  TodosHeaderRow,
  TodosTableContainer,
} from "../../styles/TodosAppStyles";
import { getUserByToken } from "../../redux/features/authSlice/authThunks";
import { Table, TableBody, TableFooter, TableHead } from "@mui/material";

function TodoApp() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(getAllTodosSelector);
  const currError = useAppSelector(getCurrErrorSellector);
  const user = useAppSelector((state) => state.auth.user);
  console.log(todos);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        await dispatch(getUserByToken());
      }
      await dispatch(fetchTodos());
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currError) {
      const errorTimeout = setTimeout(() => {
        dispatch(removeError());
      }, 2000);
      return () => {
        clearTimeout(errorTimeout);
      };
    }
  }, [currError]);

  const allTodosCompleted = useMemo(() => {
    return todos.every((todo) => todo.completed);
  }, [todos]);

  return (
    <>
      {currError ? <CurrError>{currError}</CurrError> : null}
      {user ? (
        <TodosTableContainer>
          <Table>
            <TableHead>
              <TodosHeaderRow>
                <TodosHeaderCell>
                  <SelectAllButton
                    allTodosCompleted={allTodosCompleted}
                    onClick={() => dispatch(selectAll(user.uid))}
                  >
                    ❯
                  </SelectAllButton>
                </TodosHeaderCell>
                <TodosHeaderCell>
                  <NewTodoInput />
                </TodosHeaderCell>
              </TodosHeaderRow>
            </TableHead>
            <TableBody>
              <TodoList />
            </TableBody>
            <TableFooter>
              {todos.length > 0 ? <TodosFilters /> : null}
            </TableFooter>
          </Table>
        </TodosTableContainer>
      ) : null}
    </>
  );
}

export default TodoApp;

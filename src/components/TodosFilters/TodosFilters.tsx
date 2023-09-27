import { memo, useMemo, useState } from "react";
import { setFilter } from "../../redux/features/filterSlice/filterSlice";
import { deleteCompletedTodos } from "../../redux/features/todosSlice/todosThunks";
import { getAllTodosSelector } from "../../redux/selectors/todosSelectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  FiltersButton,
  FiltersButtonClearCompleted,
  FiltersText,
} from "../../styles/TodosFiltersStyles";
import {
  TodosItemTableCell,
  TodosItemTableRow,
} from "../../styles/TodosListItemStyles";
import { TableSortLabel } from "@mui/material";

function TodosFilters() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(getAllTodosSelector);
  const user = useAppSelector((state) => state.auth.user);
  const currFilter = useAppSelector((state) => state.filter.filter);

  const totalActive = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  const isSomeCompleted = useMemo(() => {
    return todos.some((todo) => todo.completed);
  }, [todos]);

  return (
    <TodosItemTableRow>
      <TodosItemTableCell><FiltersText>{totalActive} items left</FiltersText></TodosItemTableCell>
      <TodosItemTableCell>
        <TableSortLabel
          active={currFilter === "all" ? true : false}
          onClick={() => dispatch(setFilter("all"))}
        >
          <FiltersButton>All</FiltersButton>
        </TableSortLabel>
        <TableSortLabel
          active={currFilter === "active"}
          direction="asc"
          onClick={() => dispatch(setFilter("active"))}
        >
          <FiltersButton>Active</FiltersButton>
        </TableSortLabel>
        <TableSortLabel
          active={currFilter === "completed"}
          onClick={() => dispatch(setFilter("completed"))}
        >
          <FiltersButton>Completed</FiltersButton>
        </TableSortLabel>
      </TodosItemTableCell>
      <TodosItemTableCell>
        <FiltersButtonClearCompleted
          isSomeCompleted={isSomeCompleted}
          onClick={() => user && dispatch(deleteCompletedTodos(user.uid))}
        >
          Clear completed
        </FiltersButtonClearCompleted>
      </TodosItemTableCell>
    </TodosItemTableRow>
  );
}

export default memo(TodosFilters);

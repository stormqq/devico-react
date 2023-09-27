import { Box, TableCell, TableFooter, TableHead, TableRow, Typography, styled } from "@mui/material";
import { TableContainer } from '@mui/material';
const CurrError = styled(Typography)({
    color: "red",
    fontSize: "16px",
    marginBottom: "10px",
});

const TodosContainer = styled(Box)({
    display: "flex",
    width: "600px",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#fefefe",
    margin: "14px auto",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)",
    position: "relative",
});

const SelectAllButton = styled(Box)(({allTodosCompleted}: {allTodosCompleted: boolean}) => ({
    position: "absolute",
    fontSize: "26px",
    top: "18px",
    left: "23px",
    transform: "rotate(90deg)",
    color: allTodosCompleted ? "#737373" : "#e6e6e6",
}));

const TodosTableContainer = styled(TableContainer)({
    width: "600px",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#fefefe",
    margin: "14px auto",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)",
    position: "relative",
});

const TodosTableHeader = styled(TableHead)({
    width: "100%",
});

const TodosHeaderRow = styled(TableRow)({
    width: "100%",
    border: 'none'
});

const TodosHeaderCell = styled(TableCell)({
    padding: "0px 26px 0px 0px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
});

const TodosTableHeaderCell = styled(TableCell)({
    padding: "0px 26px 0px 0px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
});

const TodosTableFooter = styled(TableFooter)({
    width: "100%",
    fontSize: "24px",
});



export { CurrError, TodosContainer, SelectAllButton, TodosTableContainer, TodosTableHeader, TodosTableHeaderCell, TodosHeaderRow, TodosHeaderCell, TodosTableFooter };
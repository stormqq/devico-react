import { Box, Typography, styled } from "@mui/material";

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
    top: "14px",
    left: "22px",
    transform: "rotate(90deg)",
    color: allTodosCompleted ? "#737373" : "#e6e6e6",
}));


export { CurrError, TodosContainer, SelectAllButton };
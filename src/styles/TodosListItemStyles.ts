import { Input } from "@mui/base";
import { Box, Button, Checkbox, ListItem, Typography, styled } from "@mui/material";

const TodoListItem = styled(ListItem)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 15px",
    borderBottom: "1px solid #ededed",
    "&:hover": {
        "& button": {
            visibility: "visible",
        }
    }
})

const CheckNameContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
});

const TodoCheckbox = styled(Checkbox)({
    "& .MuiSvgIcon-root": {
        width: "30px",
        height: "30px",
    },
    padding: "0",
});

const EditingInput = styled(Input)(({isError}: {isError: string}) => ({
    "& .MuiInput-input": {
        width: "300px",
        background: "#eee",
        fontSize: "24px",
        border: isError ? "2px solid red" : "none",
        "&:focus": {
            outline: "none",
        }
    }
}));

const TodoItemText = styled(Typography)(({completed}: {completed: boolean}) => ({
    fontSize: "24px",
    color: completed ? "#d9d9d9" : "#4d4d4d",
    textDecoration: completed ? "line-through" : "none",
}));

const InputError = styled(Typography)({
    color: "red",
    fontSize: "16px",
});

const DeleteButton = styled(Button)({
    padding: "0",
    fontSize: "24px",
    visibility: "hidden",
    "&:hover": {
        background: 'transparent',
    }

});



export { TodoListItem, CheckNameContainer, TodoCheckbox, EditingInput, TodoItemText, InputError, DeleteButton };
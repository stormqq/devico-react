import { Input } from "@mui/base";
import { styled } from "@mui/material";

const NewTodoInputField = styled(Input)({
    "& .MuiInput-input": {
        fontSize: "24px",
        fontFamily: "inherit",
        fontWeight: "inherit",
        padding: "16px 16px 16px 60px",
        border: "none",
        background: "rgba(0, 0, 0, 0.003)",
        boxShadow: "inset 0 -2px 1px rgba(0,0,0,0.03)",
        boxSizing: "border-box",
        width: "100%",
        "&:focus": {
            outline: "none",
        },
    },
});

export { NewTodoInputField };

import { Button } from "@mui/base";
import { Box, Typography, styled } from "@mui/material";

const FiltersContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "40px",
    padding: "14px"
});

const FiltersText = styled(Typography)({
    fontSize: "16px",
    color: "#777"
});

const FiltersButtonsContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "14px",
});

const FiltersButton = styled(Button)({
    fontSize: "16px",
    padding: "4px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    background: "transparent",
    color: "#777",
    "&:hover": {
        background: "#eee",
    },
})

const FiltersButtonClearCompleted = styled(FiltersButton)(({isSomeCompleted}: {isSomeCompleted: boolean}) => ({
    visibility: isSomeCompleted ? "visible" : "hidden",
}))

export { FiltersContainer, FiltersText, FiltersButtonsContainer, FiltersButton, FiltersButtonClearCompleted };
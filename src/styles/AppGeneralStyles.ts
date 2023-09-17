import { Box, styled } from "@mui/material";


const AppContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    font: "24px Helvetica Neue, Helvetica, Arial, sans-serif",
})

const AppTitle = styled("h1")({
    fontSize: "100px",
    color: "rgba(175, 47, 47, 0.15)",
    textAlign: "center",
});
    

export { AppContainer, AppTitle };
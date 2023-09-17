import { Button } from "@mui/base";
import { Box, styled } from "@mui/material";

const AuthFormContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f5f5f5",
})

const AuthForm = styled("form")({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    maxWidth: "300px",
    background: 'fff',
    borderRadius: "5px",
    padding: "20px",
    backgroundColor: "#fefefe",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)",
    label: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333",
    },
    input: {
        border: "1px solid #ddd",
        borderRadius: "5px",
        padding: "10px",
        outline: "none",
        fontSize: "16px",
    },
    p: {
        fontSize: "12px",
        marginBottom: "10px",
        color: "red",
    },
    button: {
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        fontWeight: "bold",
        padding: "10px",
        background: "tomato",
        color: "#fff",
        cursor: "pointer",
    }
})

const HaveAccountButton = styled(Button)({
    fontSize: "16px",
    fontWeight: "bold",
    color: "#cecece",
    marginTop: "10px",
    cursor: "pointer",
    background: "none",
    border: "none",

    "&:hover": {
        color: "#333",
        transition: "0.4s",
    }
})
    





export { AuthFormContainer, AuthForm, HaveAccountButton };

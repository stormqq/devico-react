import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import API from "../../../services/api";    
import { getUserByToken, loginUser, registerUser } from "./authThunks";

interface User {
    uid: string;
    email: string;
    login: string;
    password?: string;
}
interface AuthState {
    isAuthorized: boolean;
    user?: User | null;
    authError?: string | null;
}

const initialState: AuthState = {
    isAuthorized: false,
    user: null,
    authError: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuthorized = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(getUserByToken.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addMatcher(
            (action) => action.type.endsWith("/rejected"),
            (state, action) => {
                state.authError = action.payload;
            }
        )
    }
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
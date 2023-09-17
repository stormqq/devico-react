import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isAuthorized: boolean;
}

const initialState: AuthState = {
    isAuthorized: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuthorized = action.payload;
        },
    },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
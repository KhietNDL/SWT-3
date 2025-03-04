import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user";

const initialState: null | User = null;

const userSlice = createSlice ({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => action.payload,
        logout: () => initialState,
    },

});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";

// Lấy dữ liệu từ localStorage khi Redux khởi động
const storedUser = localStorage.getItem("userInfo");

const initialState: User | null = storedUser ? JSON.parse(storedUser) : null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); // Lưu vào localStorage
      return action.payload;
    },
    logout: () => {
      localStorage.removeItem("userInfo"); // Xóa khỏi localStorage khi logout
      return null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

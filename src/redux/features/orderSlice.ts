import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Order {
  id: string;
  programId?: string;
  packageName: string;
  fullname: string;
  orderDate: string;
  startDate: string;
  endDate: string;
  price: number;
  duration: string;
  
}

const initialState: { currentOrder: Order | null } = {
  currentOrder: null, // Mặc định không có đơn hàng
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
    },
    clearOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

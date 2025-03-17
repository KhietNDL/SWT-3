import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Order {
  id: string;
  subscriptionName: string;
  accountName: string;
  createAt: string;
  price: number;
  duration: string;
  
}

interface OrderState {
  currentOrder : Order | null;

}

const initialState: OrderState = {
  currentOrder: null, // Mặc định không có đơn hàng
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order | null >) => {
      state.currentOrder = action.payload;
    },
    clearOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

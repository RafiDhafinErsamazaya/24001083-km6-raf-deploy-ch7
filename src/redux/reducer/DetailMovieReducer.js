import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detailData: null,
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setDetailData: (state, action) => {
      state.detailData = action.payload;
    },
  },
});

export const { setDetailData } = detailSlice.actions;

export default detailSlice.reducer;

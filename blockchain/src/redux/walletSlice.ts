import { createSlice } from "@reduxjs/toolkit";
const payloadPersisted = localStorage.getItem("payLoad")||''

const walletSlice = createSlice({
  name: "walletInfo",
  initialState: {
    info:payloadPersisted? [JSON.parse(payloadPersisted)]:[],
  },
  reducers: {
    walletInformation: (state: any, action) => {
      state.info =  [action.payload]
    },
  },
});

export const { walletInformation } = walletSlice.actions;
export default walletSlice.reducer;

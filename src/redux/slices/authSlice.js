import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    session: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.alumni = null;
    },
    setSession: (state, action) => {
      state.session = action.payload;
    },
  },
});

export const { login, logout, setSession } = authSlice.actions;
export default authSlice.reducer;

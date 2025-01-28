import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../src/actions/loginactions";

const initialState = {
  data: [],
  isLoading: false,
  errorMessage: "",
  isAuthorized:false
};
export const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token') // deletes token from storage
      state.isLoading = false
      // state.data = []
      state.errorMessage = ""
      state.isAuthorized=false
    },
  },
  extraReducers: (builder) => {
    builder 
       .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.isAuthorized=false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data=action.payload;
        state.isAuthorized=true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        state.isAuthorized=false;
      });
  },
});
export const { logout } = loginSlice.actions

  export default loginSlice.reducer;

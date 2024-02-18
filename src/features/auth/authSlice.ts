import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../api/store";

interface IInitialState {
   // user: string | null;
   // token: string | null;
   // user: string | null;
   // pwd: string | null;
   roles: number[];
   accessToken: string | null;
}

const initialState: IInitialState = {
   // user: null,
   // pwd: null,
   roles: [],
   accessToken: null,
}; 

const authSlice = createSlice({
   name: "auth",
   initialState: initialState,
   reducers: {
      setCredentials: (state, action) => {
         console.log(action.payload); 
         const { accessToken, roles } = action.payload;
         // state.user = user;
         state.roles = roles;
         state.accessToken = accessToken;
      },
      logOut: (state) => {
         // state.user = null;
         state.roles = [];
         state.accessToken = null;
      },
   },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;

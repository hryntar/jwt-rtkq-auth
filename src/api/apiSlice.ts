import { BaseQueryApi, BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../features/auth/authSlice";
import { RootState } from "./store";

const baseQuery = fetchBaseQuery({
   baseUrl: "http://localhost:3500",
   credentials: "include",
   prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.accessToken;
      if (token) {
         headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
   },
});

const baseQueryWithReauth: BaseQueryFn = async (args: Parameters<BaseQueryFn>[0], api: BaseQueryApi, extraOptions: Parameters<BaseQueryFn>[2]) => {
   let result = await baseQuery(args, api, extraOptions);

   if (result?.error?.status === 403) {
      console.log("sending refresh token");
      // send refresh token to get new access token
      const refreshResult = await baseQuery("/refresh", api, extraOptions);
      console.log(refreshResult);
      if (refreshResult?.data) {
         // const user = (api.getState() as RootState).auth.user
         // store the new token
         // api.dispatch(setCredentials({ ...refreshResult.data, user }))
         api.dispatch(setCredentials({ ...refreshResult.data }));
         // retry the original query with new access token
         result = await baseQuery(args, api, extraOptions);
      } else {
         api.dispatch(logOut());
      }
   }

   return result;
};

export const apiSlice = createApi({
   baseQuery: baseQueryWithReauth,
   endpoints: () => ({}),
});

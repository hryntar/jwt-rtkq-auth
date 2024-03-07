import authApi from "@/api/authApi";
import { IAuthResponse } from "@/types/auth.interfaces";

export const refreshSlice = authApi.injectEndpoints({
   endpoints: (builder) => ({
      refresh: builder.mutation<IAuthResponse, void>({
         query: () => {
            return {
               url: "/refresh",
               method: "POST",
            };
         }
      }),
   }),
});

export const { useRefreshMutation } = refreshSlice;

import { IRegisterCredentials } from "@/types/auth.interfaces";
import authApi from "@/api/authApi";

export const registerSlice = authApi.injectEndpoints({
   endpoints: (builder) => ({
      register: builder.mutation<void, IRegisterCredentials>({
         query: (credentials) => ({
            url: "/registration",
            method: "POST",
            body: { ...credentials },
         }),
      }),
   }),
});

export const { useRegisterMutation } = registerSlice;

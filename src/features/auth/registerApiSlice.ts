import { apiSlice } from "../../api/apiSlice";

interface Credentials {
   user: string;
   pwd: string;
}

export const registerApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      register: builder.mutation<Credentials, Credentials>({
         query: (credentials) => ({
            url: "/register",
            method: "POST",
            body: { ...credentials },
         }),
      }),
   }),
});

export const { useRegisterMutation } = registerApiSlice;

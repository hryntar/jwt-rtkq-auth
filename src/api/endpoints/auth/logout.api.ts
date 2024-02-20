import authApi from "@/api/authApi";

export const logoutSlice = authApi.injectEndpoints({
   endpoints: (builder) => ({
      logout: builder.query<void, void>({
         query: () => "/logout",
      }),
   }),
});

export const { useLogoutQuery } = logoutSlice;

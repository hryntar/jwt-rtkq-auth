import authApi from "@/api/authApi";
import { IUser } from "@/types/data.interfaces";

export const allUsersSlice = authApi.injectEndpoints({
   endpoints: (builder) => ({
      getUsers: builder.query<IUser[], void>({
         query: () => "/users",
         keepUnusedDataFor: 5,
      }),
   }),
});

export const { useGetUsersQuery } = allUsersSlice;

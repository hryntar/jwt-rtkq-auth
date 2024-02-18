import { apiSlice } from "../../api/apiSlice";

interface IUser {
   username: string;
}

export const usersApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getUsers: builder.query<IUser[], void>({
         query: () => "/users",
         keepUnusedDataFor: 5,
      }),
   }),
});

export const { useGetUsersQuery } = usersApiSlice;

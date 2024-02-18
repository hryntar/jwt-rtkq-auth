import { apiSlice } from "../../api/apiSlice";

interface Credentials {
   roles: number[];
   accessToken: string;
}

export const refreshApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        refresh: builder.query<Credentials, void>({
            query: () => '/refresh', 
        }),
    })
})

export const {
    useRefreshQuery,
} = refreshApiSlice
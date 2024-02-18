import { apiSlice } from "../../api/apiSlice";

// interface Credentials {
//    roles: number[];
//    accessToken: string;
// }

export const logoutApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        logout: builder.query<void, void>({
            query: () => '/logout', 
        }),
    })
})

export const {
    useLogoutQuery,
} = logoutApiSlice
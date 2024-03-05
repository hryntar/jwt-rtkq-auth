import { useGetUsersQuery } from "@/api/endpoints/admin/allUsers.api";
import {Spinner} from "@nextui-org/react"; 

const UsersList = () => {

   const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery();

   let content;
   if (isLoading) {
      content = <div className="text-center mt-[70px]"><Spinner label="Loading..." color="primary"></Spinner></div>;
   } else if (isSuccess) {
      content = (
         <section className="grid gap-y-1">
            <h1 className="font-semibold text-primary text-xl mb-3">Users List</h1>
            <ul>
               {users.map((user, i) => {
                  return <li key={i}>{user.username}</li>;
               })}
            </ul> 
         </section>
      );
   } else if (isError) { 
      console.error(error);
      location.reload(); 
   }

   return content;
};
export default UsersList;

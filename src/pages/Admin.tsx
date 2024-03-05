import { FC } from "react";
import { Link } from "react-router-dom";
import UsersList from "@/components/UsersList";

const Admin: FC = () => {
   return (
      <section className="text-xl sm:min-w-[450px] max-sm:w-full p-10 border-1 drop-shadow-2xl shadow-3xl border-primary rounded-3xl backdrop-opacity-20 backdrop-blur-[100px] min-h-[300px]">
         <h1 className="font-bold text-primary text-3xl text-center mb-7">Admins Page</h1>
         <UsersList /> 
         <Link className="hover:text-primary transition font-semibold inline-block mt-10" to="/">Home</Link>
      </section>
   );
};

export default Admin;

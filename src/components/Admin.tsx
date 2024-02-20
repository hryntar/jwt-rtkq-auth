import { FC } from "react";
import { Link } from "react-router-dom";
import UsersList from "./UsersList";

const Admin: FC = () => {
   return (
      <section>
         <h1>Admins Page</h1>
         <br />
         <UsersList /> 
         <br />
         <div className="flexGrow">
            <Link to="/">Home</Link>
         </div>
      </section>
   );
};

export default Admin;

import { Outlet } from "react-router-dom";
import { FC } from "react";

const Layout: FC = () => {

   return (
      <main className="h-[100vh] flex items-center justify-center px-3.5"> 
         <Outlet />
      </main>
   );
};

export default Layout;

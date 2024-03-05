import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "@/app/slices/authSlice";
import { useAppDispatch } from "@/app/store";
import { logoutSlice } from "@/api/endpoints/auth/logout.api";
import { Button } from "@nextui-org/react";

const Home: FC = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const signOut = async () => {
      await dispatch(logoutSlice.endpoints.logout.initiate()).unwrap();
      dispatch(setCredentials({ roles: [], accessToken: null }));
      navigate("/linkpage");
   };

   return (
      <section className="text-xl sm:min-w-[450px] max-sm:w-full p-10 border-1 drop-shadow-2xl shadow-3xl border-primary rounded-3xl backdrop-opacity-20 backdrop-blur-[100px] ">
         <h1 className="font-bold text-primary text-3xl text-center mb-7">Home</h1>
         <nav className="grid gap-y-5 font-semibold mb-[100px]">
            <Link className="hover:text-primary transition" to="/editor">
               Editor page
            </Link>
            <Link className="hover:text-primary transition" to="/admin">
               Admin page
            </Link>
            <Link className="hover:text-primary transition" to="/lounge">
               Lounge
            </Link>
            <Link className="hover:text-primary transition" to="/linkpage">
               Link page
            </Link>
         </nav>
         <Button color="danger" variant="ghost" onClick={signOut} className="font-semibold">
            Sign Out
         </Button>
      </section>
   );
};

export default Home;

import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../features/auth/authSlice";
import { useAppDispatch } from "../api/store";
import { logoutApiSlice } from "../features/auth/logoutApiSlice";
// import useLogout from "../hooks/useLogout"; 

const Home: FC = () => { 
   const navigate = useNavigate();
   // const logout = useLogout();
   const dispatch = useAppDispatch();
   // const [trigger] = logoutApiSlice.endpoints.logout.useLazyQuery();

   const signOut = async () => {
      // await logout();
      await dispatch(logoutApiSlice.endpoints.logout.initiate()).unwrap();
      // trigger();
      dispatch(setCredentials({roles: [], accessToken: null}))
      navigate("/linkpage");
   };

   return (
      <section>
         <h1>Home</h1>
         <br />
         <p>You are logged in!</p>
         <br />
         <Link to="/editor">Go to the Editor page</Link>
         <br />
         <Link to="/admin">Go to the Admin page</Link>
         <br />
         <Link to="/lounge">Go to the Lounge</Link>
         <br />
         <Link to="/linkpage">Go to the link page</Link>
         <div className="flexGrow">
            <button onClick={signOut}>Sign Out</button>
         </div>
      </section>
   );
};

export default Home;

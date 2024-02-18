import { FC } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet} from "react-router-dom";
import { RootState } from "../api/store";
// import useAuth from "../hooks/useAuth";

const RequireAuth: FC<{allowedRoles: number[]}> = ({allowedRoles}) => {
   // const {auth} = useAuth(); 
   const auth = useSelector((state: RootState) => state.auth);
   console.log(auth?.roles?.find(role => allowedRoles?.includes(role)));
   
   const location = useLocation();

   return (
      // auth?.user.length
      //    ? <Outlet />
      //    : <Navigate to='/login' state={{from: location}} replace /> 
      <>
         {!auth.accessToken ? <Navigate to='/login' state={{from: location}} replace /> :
         !auth.roles ? <Navigate to='/unauthorized' state={{from: location}} replace /> :
         auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.accessToken 
               ? <Navigate to="/unauthorized" state={{from: location}} replace/>
               : <Navigate to='/login' state={{from: location}} replace />}
      </>
   );
};

export default RequireAuth;
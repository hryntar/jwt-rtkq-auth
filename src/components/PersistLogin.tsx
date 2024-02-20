import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import useRefreshToken from "../hooks/useRefreshToken";
// import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSelector } from "react-redux";
import { selectCurrentToken, setCredentials } from "../app/slices/authSlice";
import { refreshApiSlice } from "../api/endpoints/auth/refresh.api";
import { useAppDispatch } from "../app/store";
// import useRefreshToken from "../hooks/useRefreshToken";
// import { useRefreshQuery } from "../features/auth/refreshApiSlice";


const PersistLogin = () => {
   const [isLoading, setIsLoading] = useState(true);
   // const refresh = useRefreshToken();
   // const {data, isError} = useRefreshQuery()
   // const { auth } = useAuth();
   const token = useSelector(selectCurrentToken)
   const [persist] = useLocalStorage("persist", false);
   const [trigger ] = refreshApiSlice.endpoints.refresh.useLazyQuery();
   const dispatch= useAppDispatch();
   const navigate = useNavigate();

   useEffect(() => { 
      let isMounted = true;

      const verifyRefreshToken = async () => {
         try {
            const response = await trigger().unwrap();
            dispatch(setCredentials({
               accessToken: response.accessToken,
               roles: response.roles,
            })); 
         } catch (error) {
            console.error(error); 
            navigate("/login");
         }  finally {
            isMounted && setIsLoading(false);
         }
      };

      !token && persist ? verifyRefreshToken() : setIsLoading(false); 
      return () => {
         isMounted = false;
      };
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      console.log(`isLoading: ${isLoading}`);
      console.log(`aT: ${JSON.stringify(token)}`);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isLoading]);
   return <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
// const PersistLogin = () => {
//    const [isLoading, setIsLoading] = useState(true);
//    // const {data, isError} = useRefreshQuery()
//    const token = useSelector(selectCurrentToken)
//    const [persist] = useLocalStorage("persist", false);
//    const {refetch, isError, error} = useRefreshQuery();

//    useEffect(() => {
//       let isMounted = true;

//       const verifyRefreshToken = async () => {
//          try {
//             await refetch();
//          } catch (error) {
//             console.error(error);
//          } finally {
//             isMounted && setIsLoading(false);
//          }
//       };

//       !token && persist ? verifyRefreshToken() : setIsLoading(false);
//       return () => {
//          isMounted = false;
//       };
//    }, []);

//    useEffect(() => {
//       console.log(`isLoading: ${isLoading}`);
//       console.log(`aT: ${JSON.stringify(token)}`);
//    }, [isLoading]);
//    return <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>;
// };

// export default PersistLogin;

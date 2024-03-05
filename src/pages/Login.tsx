import { FC, useRef, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useInput from "@/hooks/useInput";
import useToggle from "@/hooks/useToggle";
import { setCredentials } from "@/app/slices/authSlice";
import { useLoginMutation } from "@/api/endpoints/auth/login.api";
import { useAppDispatch } from "@/app/store";

import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";

import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/icons/EyeSlashFilledIcon";
import { btnAttribs, inputAttribs } from "@/utils/defaultAttribs";

const Login: FC = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const location = useLocation();
   const from: string = location.state?.from?.pathname || "/";

   const userRef = useRef<HTMLInputElement>(null);
   const errRef = useRef<HTMLInputElement>(null);
   
   const [pwd, setPwd] = useState("");
   const [errMsg, setErrMsg] = useState("");
   const [user, resetUser, userAttribs] = useInput("user", "");
   const [check, toggleCheck] = useToggle("persist", false);
   const [isVisible, setIsVisible] = useState(false);
   
   const [login, { isLoading }] = useLoginMutation();

   useEffect(() => {
      userRef.current?.focus();
   }, []);

   useEffect(() => {
      setErrMsg("");
   }, [user, pwd]);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         const userData = await login({ user, pwd }).unwrap();
         dispatch(setCredentials({ ...userData }));
         resetUser("");
         setPwd("");
         navigate(from, { replace: true });
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
         if (!err?.originalStatus) {
            setErrMsg("No Server Response");
         } else if (err.originalStatus === 400) {
            setErrMsg("Missing Username or Password");
         } else if (err.originalStatus === 401) {
            setErrMsg("Incorrect login or password");
         } else {
            setErrMsg("Login Failed");
         }
         errRef.current?.focus();
      }
   };

   return (
      <>
         <section className=" sm:min-w-[450px] max-sm:w-full p-10 border-1 drop-shadow-2xl shadow-3xl border-primary rounded-3xl backdrop-opacity-20 backdrop-blur-[100px] ">
            <h1 className="font-bold text-primary text-3xl text-center mb-7">
               Sign <span className="text-foreground">In</span>
            </h1>
            <form className="grid gap-y-2 " onSubmit={handleSubmit}>
               <Input
                  {...inputAttribs}
                  isInvalid={errMsg ? true : false}
                  errorMessage={errMsg}
                  type="text" 
                  label="Username"
                  ref={userRef}
                  {...userAttribs}
                  classNames={{ label: "after:content-['']" }} 
               /> 
               <Input
                  {...inputAttribs}
                  isInvalid={errMsg ? true : false}
                  errorMessage={errMsg}
                  type={isVisible ? "text" : "password"}
                  label="Password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  classNames={{ label: "after:content-['']" }}
                  endContent={
                     <button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>
                        {isVisible ? (
                           <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                           <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                     </button>
                  }
               /> 
               <Checkbox className="mt-1 mb-[100px]" onChange={toggleCheck} isSelected={check}>
                  <span className="text-sm">Keep me logged in</span>
               </Checkbox> 
               <Button {...btnAttribs} fullWidth isLoading={isLoading} type="submit" >
                  Sign In
               </Button>
            </form>
            <div className="text-sm mt-10">
               Don't have an account?
               <span className="text-primary font-semibold">
                  <Link to="/register"> Sign Up</Link>
               </span>
            </div>
         </section>
      </>
   );
};

export default Login;

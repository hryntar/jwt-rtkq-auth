import { useEffect, useRef, FC, useReducer, useState } from "react"; 
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../api/endpoints/auth/register.api";
import { initialState } from "@/const/RegisterInitState";
import { reducer } from "@/utils/reducers/RegisterReducer";
import { Checkbox, Input } from "@nextui-org/react";
import { btnAttribs, inputAttribs } from "@/utils/defaultAttribs";
import { Button } from "@nextui-org/react";

const Registration: FC = () => {
   const userRef = useRef<HTMLInputElement>(null);
   const errRef = useRef<HTMLInputElement>(null);
   const [agree, setAgree] = useState(false);

   const [state, dispatch] = useReducer(reducer, initialState);

   const [register, { isLoading }] = useRegisterMutation();

   useEffect(() => {
      userRef.current?.focus();
   }, []);

   useEffect(() => {
      dispatch({ type: "SET_USER", payload: state.user });
   }, [state.user]);

   useEffect(() => {
      dispatch({ type: "SET_PWD", payload: state.pwd });
      dispatch({ type: "SET_MATCH_PWD", payload: state.matchPwd });
   }, [state.pwd, state.matchPwd]);

   useEffect(() => {
      dispatch({ type: "SET_ERR_MSG", payload: "" });
   }, [state.user, state.pwd, state.matchPwd]);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         console.log("state", state); 
         await register({ user: state.user, pwd: state.pwd }).unwrap();
         dispatch({ type: "SET_SUCCESS", payload: true });
         dispatch({ type: "SET_USER", payload: "" });
         dispatch({ type: "SET_PWD", payload: "" });
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
         if (!err?.originalStatus) {
            dispatch({ type: "SET_ERR_MSG", payload: "No Server Response" });
         } else if (err.originalStatus === 400) {
            dispatch({ type: "SET_ERR_MSG", payload: "Missing Username or Password" });
         } else if (err.originalStatus === 401) {
            dispatch({ type: "SET_ERR_MSG", payload: "User already exists" });
         } else {
            dispatch({ type: "SET_ERR_MSG", payload: "Registration Failed" });
         }
         errRef.current?.focus();
      }
   };

   return (
      <>
         {state.success ? (
            <section>
               <h1>You successfully registered an account </h1>
               <p>
                  <Link to="/login">Sign In</Link>
               </p>
            </section>
         ) : (
            <section className="sm:min-w-[450px] max-sm:w-full p-10 border-1 drop-shadow-2xl shadow-3xl border-primary rounded-3xl backdrop-opacity-20 backdrop-blur-[100px] ">
               {/* <p ref={errRef} className={state.errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                  {state.errMsg}
               </p> */}
               <h1 className="font-bold text-primary text-3xl text-center mb-7">Register</h1>
               <form className="grid gap-y-2" onSubmit={handleSubmit}>
                  <Input
                     {...inputAttribs}
                     isInvalid={state.errMsg ? true : false}
                     errorMessage={state.errMsg}
                     type="text"
                     label="Username"
                     classNames={{ label: "after:content-['']" }}
                     ref={userRef}
                     onChange={(e) => dispatch({ type: "SET_USER", payload: e.target.value })}
                     aria-invalid={state.validUser ? "false" : "true"}
                     aria-describedby="uidnote"
                     onFocus={() => dispatch({ type: "SET_USER_FOCUS", payload: true })}
                     onBlur={() => dispatch({ type: "SET_USER_FOCUS", payload: false })}
                  />
                  <p
                     id="uidnote"
                     className={
                        state.userFocus && state.user && !state.validUser ? "block p-2 border-1 text-[12px] border-primary rounded-lg" : "hidden"
                     }
                  >
                     Minimum length is 4 characters.
                  </p>

                  <Input 
                     {...inputAttribs}
                     label="Password"
                     type="password"
                     classNames={{ label: "after:content-['']" }}
                     onChange={(e) => dispatch({ type: "SET_PWD", payload: e.target.value })}
                     value={state.pwd}
                     aria-invalid={state.validPwd ? "false" : "true"}
                     aria-describedby="pwdnote"
                     onFocus={() => dispatch({ type: "SET_PWD_FOCUS", payload: true })}
                     onBlur={() => dispatch({ type: "SET_PWD_FOCUS", payload: false })}
                  />
                  <p
                     id="pwdnote"
                     className={state.pwdFocus && !state.validPwd ? "block p-2 border-1 text-[12px] border-primary rounded-lg" : "hidden"}
                  >
                     8 to 32 characters.
                     <br />
                     Must include uppercase and lowercase letters, a number.
                     <br />
                  </p>

                  <Input
                     {...inputAttribs}
                     label="Confirm Password"
                     type="password"
                     onChange={(e) => dispatch({ type: "SET_MATCH_PWD", payload: e.target.value })}
                     value={state.matchPwd}
                     aria-invalid={state.validMatch ? "false" : "true"}
                     aria-describedby="confirmnote"
                     classNames={{ label: "after:content-['']" }}
                     onFocus={() => dispatch({ type: "SET_MATCH_FOCUS", payload: true })}
                     onBlur={() => dispatch({ type: "SET_MATCH_FOCUS", payload: false })}
                  />
                  <p
                     id="confirmnote"
                     className={state.matchFocus && !state.validMatch ? "block p-2 border-1 text-[12px] border-primary rounded-lg" : "hidden"}
                  >
                     Must match the first password input field.
                  </p>
                  <Checkbox className="mt-1 mb-[100px]" onChange={() => setAgree(!agree)}>
                     <span className="text-sm">
                        I agree with <span className="text-primary font-semibold">terms of use</span>
                     </span>
                  </Checkbox>

                  <Button
                     {...btnAttribs}
                     fullWidth
                     isLoading={isLoading}
                     type="submit"
                     isDisabled={!state.validUser || !state.validPwd || !state.validMatch || !agree ? true : false}
                  >
                     Sign Up
                  </Button>
               </form>
               <div className="text-sm mt-10">
                  Already registered?
                  <span className="text-primary font-semibold">
                     <Link to="/login"> Sign In</Link>
                  </span>
               </div>
            </section>
         )}
      </>
   );
};

export default Registration;

import { RegisterReducerState } from "@/types/auth.interfaces";

export const initialState: RegisterReducerState = {
   user: "",
   validUser: false,
   userFocus: false,
   pwd: "",
   validPwd: false,
   pwdFocus: false,
   matchPwd: "",
   validMatch: false,
   matchFocus: false,
   errMsg: "",
   success: false,
};

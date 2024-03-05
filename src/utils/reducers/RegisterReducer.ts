import { PWD_REGEX, USER_REGEX } from "@/const/RegEx";
import { RegisterReducerState } from "@/types/auth.interfaces";
import { RegisterActions } from "@/types/registerActions.type";

export const reducer = (state: RegisterReducerState, action: RegisterActions): RegisterReducerState => {
   switch (action.type) {
      case "SET_USER":
         return { ...state, user: action.payload, validUser: USER_REGEX.test(action.payload) };
      case "SET_PWD":
         return { ...state, pwd: action.payload, validPwd: PWD_REGEX.test(action.payload), validMatch: action.payload === state.matchPwd };
      case "SET_MATCH_PWD":
         return { ...state, matchPwd: action.payload, validMatch: state.pwd === action.payload };
      case "SET_ERR_MSG":
         return { ...state, errMsg: action.payload };
      case "SET_SUCCESS":
         return { ...state, success: action.payload };
      case "SET_USER_FOCUS":
         return { ...state, userFocus: action.payload };
      case "SET_PWD_FOCUS":
         return { ...state, pwdFocus: action.payload };
      case "SET_MATCH_FOCUS":
         return { ...state, matchFocus: action.payload };
      default:
         throw new Error();
   }
};
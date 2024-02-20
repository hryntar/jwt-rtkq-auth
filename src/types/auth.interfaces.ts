export interface IAuthCredentials {
   user: string;
   pwd: string;
}

export interface IAuthResponse {
   roles: number[];
   accessToken: string;
}

export interface IRegisterCredentials {
   user: string;
   pwd: string;
}

import { Response } from "../login/gqlTypes";

export type SignUpReq = {
    firstName: String;
    lastName: String;
    email: String;
    password: String;
    rePassword: String;
}

export type SignUpResponse = {
    signUp: Response
}
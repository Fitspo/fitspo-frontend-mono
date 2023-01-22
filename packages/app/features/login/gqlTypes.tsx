export type SignInResponse = {
    __typename: string;
    message: string;
    success: boolean;
    token: string;
    user: User;
};

export type SignInReq = {
    email: String;
    password: String;
}

export type User = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    fullName: string;
    profilePic: String;
    latestEffort: String;
    email: string;
  }

export type Response = {
    __typename: string;
    message: string;
    success: boolean;
    token: string;
    user: User;
}

export type LoginResponse = {
    signIn: Response
}
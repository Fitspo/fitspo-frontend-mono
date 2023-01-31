export type SignInReq = {
    email: String;
    password: String;
}

export type User = {
    id: String;
    createdAt: Date;
    updatedAt: Date;
    firstName: String;
    lastName: String;
    profilePic: String;
    latestEffort: Effort;
    latestEffortEmoji: String
    email: String;
  }

export enum Effort {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

export type Response = {
    __typename: String;
    message: String;
    success: Boolean;
    token: String;
    user: User;
}

export type LoginResponse = {
    signIn: Response
}
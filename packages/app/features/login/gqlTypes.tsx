export type SignInReq = {
    email: String;
    password: String;
}

export type User = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    profilePic: string;
    latestEffort: Effort;
    latestEffortEmoji: string
    email: string;
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
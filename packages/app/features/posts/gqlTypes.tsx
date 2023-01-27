import { User } from "../login/gqlTypes";

export type Post = {
    id: String;
    creator: User;
    createdAt: Date;
    updatedAt: Date;
    content: String;
    media: String;
    effortEmoji: String;
    effort: Effort;
}

export type Response = {
    success: Boolean
    message: String
    posts: [Post]
}

export type PostCreateInput = {
    content: String;
    effort: Effort;
    effortEmoji: String;
    media: String;
    creator: {
        connect: {
          where: {
            node: {
              id: String;
            }
          }
        }
      }
}

export enum Effort {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

export type PostWhere = {
    ids: [String];
}



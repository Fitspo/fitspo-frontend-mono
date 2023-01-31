import { User } from "../login/gqlTypes";

export type Post = {
    id: string;
    creator: User;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    media: string;
    effortEmoji: string;
    effort: Effort;
}

export type Response = {
    success: Boolean
    message: String
    posts: [Post]
}

export type PostCreateInput = {
    content: string;
    effort: Effort;
    effortEmoji: string;
    media: string;
    creator: {
        connect: {
          where: {
            node: {
              id: string;
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
    ids: [string];
}



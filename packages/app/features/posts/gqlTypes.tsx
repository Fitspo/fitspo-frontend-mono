import { User } from "../login/gqlTypes";

export type PostResponse = {
    postsByUser: [Post];
};

export type CreatePostResponse = {
    post: Post;
}

export type Post = {
    id: String;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    message: String;
    media: String;
    effort: String;
  }


  export type CreatePostReq = {
    message: String;
    effort: String;
    effortEmoji: String;
    media: String;
}

export type PostWhere = {
    id: String;
}

export type EditPostReq = {
    message: String;
    effort: String;
    effortEmoji: String;
    media: String;
}

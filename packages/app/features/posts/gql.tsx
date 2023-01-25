import { gql } from '@apollo/client';

export const GET_POSTS = gql`
    query Posts($where: PostWhere) {
        posts(where: $where) {
            id
            creator {
                id
                firstName
                lastName
                profilePic
            }
            createdAt
            updatedAt
            content
            media
            effort
            effortEmoji
            commentsAggregate {
                count
            }
            comments {
                content
                id
                creator {
                    id
                    firstName
                    lastName
                }
            }
            like {
                creator {
                    id
                    firstName
                    lastName
                }
            }
            likeAggregate {
                count
            }
        }
    }
`;

export const CREATE_POST = gql`
    mutation CreatePost($input: [PostCreateInput!]!) {
    createPosts(input: $input) {
        posts {
        content
        creator {
            id
            firstName
        }
        effort
        effortEmoji
        id
    }
  }
}
`;
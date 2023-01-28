import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
    query CurrentUser {
        currentUser {
            success
            message
            token
            user {
                id
                firstName
                lastName
                email
                profilePic
                followersAggregate {
                    count
                }
                followingAggregate {
                    count
                }
            }
        
        }
    }
`;
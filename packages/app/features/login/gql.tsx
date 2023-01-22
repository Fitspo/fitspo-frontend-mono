import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation signIn($signInReq: SignInReq!) {
        signIn(signInReq: $signInReq) {
            success
            message
            token
            user{
                id
                name
                createdAt
                updatedAt
                profilePic
                latestEffort
                email
            }
        }
    }
`;
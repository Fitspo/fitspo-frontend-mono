import { gql } from '@apollo/client';

export const SIGN_IN = gql`
    mutation signIn($signInReq: SignInReq!) {
        signIn(signInReq: $signInReq) {
            success
            message
            token
            user{
                id
                firstName
                lastName
                createdAt
                updatedAt
                profilePic
                latestEffort
                email
            }
        }
    }
`;
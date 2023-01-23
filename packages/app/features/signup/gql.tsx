import { gql } from '@apollo/client';

export const SIGN_UP = gql`
    mutation signUp($signUpReq: SignUpReq!) {
        signUp(signUpReq: $signUpReq) {
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
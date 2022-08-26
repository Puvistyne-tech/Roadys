import {gql} from "@apollo/client";

export const DELET_USER = gql`
    mutation DeleteUser($deleteUserId: ID!) {
        deleteUser(id: $deleteUserId) {
            id
            pseudo
            email
        }
    }
`

export const GET_CURRENT_USER = gql`
    query currentUser {
        currentUser {
            id
        }
    }
`
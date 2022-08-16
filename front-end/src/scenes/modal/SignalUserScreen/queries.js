import {
    gql
} from "@apollo/client";

export const GET_CURRENT_USER = gql`
    query currentUser {
        currentUser {
            id
            pseudo
            firstname
            lastname
        }
    }
`

export const GET_USER = gql`
    query user($id: ID) {
        user(id: $id) {
            id
            pseudo
            email
            firstname
            lastname
            age
            sex
            kindOfTrip
            nationality
            description
        }
    }
`

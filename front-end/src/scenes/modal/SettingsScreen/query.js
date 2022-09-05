import {gql} from "@apollo/client";

export const DELETE_USER = gql`
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
            email
            pseudo
            firstname
            lastname
            sex
            latitude
            longitude
            age
            photo
            description
            nationality
            kindOfTrip
            isVisibled
            createdAt
            updatedAt
            isBlocked
        }
    }
`

export const INSERT_DELETED_USER = gql`
    mutation createOne($data: deleteUserInput) {
        createOne(data: $data) {
            id
            pseudo
            email
        }

    }
`
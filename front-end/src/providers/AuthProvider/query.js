import {gql} from '@apollo/client';

export const SIGNIN = gql`
    mutation signin($login: String!, $password: String!) {
        signin(data: {pseudo: $login, email: $login, password: $password}) {
            jwt
        }
    }
`

export const SIGNUP = gql`
    mutation signup($pseudo: String!, $email: String!, $password: String!){
        signup(data: {pseudo: $pseudo, email: $email, password: $password}) {
            jwt
        }
    }
`

export const CURRENT_USER = gql`
    query currentUser {
        currentUser {
            id
            pseudo
        }
    }
`

export const GET_CURRENT_USER = gql`
    query currentUser {
        currentUser {
            jwt
        }
    }
`

export const REACTIVATE_USER = gql`
    mutation reactivateDeletedUser( $pseudo: String!, $email: String!, $password: String!) {
        reactivateDeletedUser(data: {pseudo: $pseudo, email: $email, password: $password}) {
            id
            email
            pseudo
            firstname
            lastname
            isBlocked
            isDeleted
            jwt
        }
    }
`
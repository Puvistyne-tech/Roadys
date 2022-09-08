import {
   gql
} from "@apollo/client";

export const GET_USERS = gql`
   query users($excludeCurrentUser: Boolean){
      users(data: {excludeCurrentUser: $excludeCurrentUser}) {
         id
         pseudo
         latitude
         longitude
         age
         sex
         nationality
         photo
         kindOfTrip
      }
   }
`

export const UPDATE_LOCATION = gql`
   mutation updateCurrentUser($latitude: Float!, $longitude: Float!){
      updateCurrentUser(data: {latitude: $latitude, longitude: $longitude}){
         id
         pseudo
         email
         firstname
         lastname
         latitude
         longitude
      }
   }
`

export const GET_CURRENT_USER = gql`
   query currentUser {
      currentUser {
         id
         latitude
         longitude
      }
   }
`

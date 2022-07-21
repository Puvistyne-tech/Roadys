import {
  gql
} from "@apollo/client";

export const GET_USER = gql`
  query user($id: ID) {
    user(id: $id) {
      isVisibled
      firstname
      lastname
      age
      nationality
      kindOfTrip
      description
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!, 
    $isVisibled: Boolean,
    $firstname: String,
    $lastname: String,
    $age: Int,
    $nationality: String,
    $kindOfTrip: String,
    $description: String,
    ){
      updateUser(data: {
        id: $id,
        isVisibled: $isVisibled,
        firstname: $firstname,
        lastname: $lastname,
        age: $age
        nationality: $nationality
        kindOfTrip: $kindOfTrip
        description: $description
      }){
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
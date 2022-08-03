import React, {useEffect, useMemo} from 'react'
import {
   Text,
   View,
   StyleSheet
} from "react-native";
import {Card} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';


import {
   useQuery
} from "@apollo/client";
import {showMessage} from "react-native-flash-message";

import AppStyles from '../../../assets/styles/main.scss';
import {GET_USER} from './queries'
import Loader from '../../components/Loader';

const ProfileCard = ({id}) => {
   const {data, refetch, error} = useQuery(GET_USER, {variables: {id: id}});
   const user = useMemo(() => data?.user, [data])

   useEffect(() => {
      error && showMessage({
         message: "Error",
         description: error.message,
         type: "danger",
         duration: 1000000
      });
   }, [error]);

   useFocusEffect(
      React.useCallback(() => {
         refetch()
      }, [refetch])
   );


   return (

      <View
         style={styles.container}
      >
         {user ?
            <Card
               containerStyle={{
                  borderRadius: 10,
                  shadowColor: "#969595",
                  shadowOffset: {
                     width: 10,
                     height: 10,
                     },
                  shadowOpacity: 0.75,
                  elevation: 10,
                  shadowRadius: 20,
                  // padding:20
               }}
            >
               <Card.Image
                  source={{uri: user?.photo}}
                  PlaceholderContent={<Text>No Photo</Text>}
                  style={{
                     alignContent: "center",
                     maxWidth: '100%',
                     height: '50%',
                     borderRadius: 8,
                     marginBottom: 10
                  }}
               />
               {/*<Card.Divider/>*/}
               <View
                  style={{
                     padding: 20,
                     display: "block",
                     borderBlockColor: "#cccccc",
                     borderRadius: 4,
                     borderWidth: 1,
                     borderColor: '#cecece',
                     shadowColor: '#121211',
                  }}
               >
                  <Card.Title> {user?.firstname} {user?.lastname} </Card.Title>

                  <Card.Divider/>
                  <View style={{flexDirection: "row"}}>
                     <Text style={AppStyles.loginText}>{user?.pseudo}</Text>
                  </View>
                  <View style={{flexDirection: "row"}}>
                     <Text style={AppStyles.loginText}>{user?.age}</Text>
                  </View>
                  <View style={{flexDirection: "row"}}>
                     <Text style={AppStyles.loginText}>{user?.kindOfTrip}</Text>
                  </View>
                  <View style={{flexDirection: "row"}}>
                     <Text style={AppStyles.loginText}>{user?.nationality}</Text>
                  </View>
                  <View style={{flexDirection: "row"}}>
                     <Text style={AppStyles.loginText}>{user?.description}</Text>
                  </View>
               </View>
            </Card>
            :
            <Loader/>
         }
      </View>
   );
}

export default ProfileCard;

const styles = StyleSheet.create({
   container: {
      // flex: 1,
      // display:'flex',
      // flexDirection:'column',
      // justifyContent: 'space-between',
      padding: 20,
      // backgroundColor: '#ecf0f1',
      width: '100%',
      // height:'80%'
   },
   paragraph: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 20
   },
})

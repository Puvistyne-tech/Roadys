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

import Appstyles from '../../../assets/styles/main.scss';
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

   const hexToBase64 = (str) => {
      return 'data:image/jpeg;base64,' +Binary. btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
   }

   return (

      //TODO il faut voir avec François

      // <View style={style.container}>
      //    <View style={styles.container}>
      //       <Image source={{ uri: user?.imageUri }} style={styles.avatar} />
      //       <Card>
      //          <Card.Title>{user?.firstname} {user?.lastname}
      //          </Card.Title>
      //          <Card.Divider />
      //          <View style={{ flexDirection: "row" }}>
      //             <Text style={styles.input}>{user?.firstname}</Text>
      //          </View>
      //          <View style={{ flexDirection: "row" }}>
      //             <Text style={styles.input}>{user?.age}</Text>
      //          </View>
      //          <View style={{ flexDirection: "row" }}>
      //             <Text style={styles.input}>{user?.kindOfTrip}</Text>
      //          </View>
      //          <View style={{ flexDirection: "row" }}>
      //             <Text style={styles.input}>{user?.nationality}</Text>
      //          </View>
      //          <View style={{ flexDirection: "row" }}>
      //             <Text style={styles.input}>{user?.description}</Text>
      //          </View>
      //       </Card>
      //
      //       <Button title="Send message" onPress={onClick} />
      //    </View>
      // </View>
      <View style={styles.container}>
         {user ?
            <Card>
               <Card.Title> {user?.firstname} {user?.lastname} </Card.Title>
               <Card.Image source={hexToBase64(user?.image)}></Card.Image>
               <Card.Divider/>
               <View style={{flexDirection: "row"}}>
                  <Text style={Appstyles.loginText}>{user?.pseudo}</Text>
               </View>
               <View style={{flexDirection: "row"}}>
                  <Text style={Appstyles.loginText}>{user?.age}</Text>
               </View>
               <View style={{flexDirection: "row"}}>
                  <Text style={Appstyles.loginText}>{user?.kindOfTrip}</Text>
               </View>
               <View style={{flexDirection: "row"}}>
                  <Text style={Appstyles.loginText}>{user?.nationality}</Text>
               </View>
               <View style={{flexDirection: "row"}}>
                  <Text style={Appstyles.loginText}>{user?.description}</Text>
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
      justifyContent: 'center',
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

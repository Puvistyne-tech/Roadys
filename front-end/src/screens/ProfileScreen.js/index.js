import React, {useEffect, useMemo} from 'react'
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {
   View,
} from "react-native";
import {
   useQuery
} from "@apollo/client";
import {showMessage} from "react-native-flash-message";

import ProfileCard from '../../components/ProfileCard';
import {GET_CURRENT_USER} from './queries'
import Loader from '../../components/Loader';
import ImageReader from "../../components/ImageReader";
import AppStyles from '../../../assets/styles/main.scss';
import Button from "../../components/Button";

const ProfileScreen = () => {
   const navigation = useNavigation();
   const {data, refetch, error} = useQuery(GET_CURRENT_USER);
   const user = useMemo(() => data?.currentUser, [data])

   useFocusEffect(
      React.useCallback(() => {
         refetch()
      }, [refetch])
   );

   useEffect(() => {
      error && showMessage({
         message: "Error",
         description: error.message,
         type: "danger",
         duration: 1000000
      });
   }, [error]);

   return (
      <>
         {user ?
            <View
               // style={AppStyles.container}
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  height: '100%'
               }}
            >
               <View>
                  <ProfileCard id={user?.id}/>
               </View>
               <View>
                  <Button
                     title="Edit"
                     style={AppStyles.button}
                     onPress={() => navigation.navigate("EDIT_PROFILE_SCREEN", {id: user?.id})}/>
                  <ImageReader id={user?.id}></ImageReader>
               </View>
            </View>
            :
            <Loader/>
         }
      </>
   );
}

export default ProfileScreen;

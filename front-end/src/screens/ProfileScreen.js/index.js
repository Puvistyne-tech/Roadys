import React, { useEffect, useMemo } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  Text,
  View,
  TouchableOpacity
} from "react-native";
import {
  useQuery
} from "@apollo/client";
import FlashMessage, {showMessage} from "react-native-flash-message";

import Appstyles from '../../../assets/styles/main.scss';
import ProfileCard from '../../components/ProfileCard';
import { GET_CURRENT_USER } from './queries'
import Loader from '../../components/Loader';
import { Button } from 'react-native-elements';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const  { data, refetch, error } = useQuery(GET_CURRENT_USER);
  const user = useMemo(() => data?.currentUser, [data])

  useFocusEffect(
    React.useCallback(() => {
      refetch()
    }, [refetch])
  );

  useEffect(()=>{
    error && showMessage({
      message: "Error",
      description: error.message,
      type: "danger",
      duration: 1000000
    });
  },[error]);

  return (
    <View style={Appstyles.container}>
      { user ?
        <>
          <ProfileCard id={user?.id} />
          <Button title="Edit" onPress={() => navigation.navigate("EDIT_PROFIL_SCREEN", { id: user?.id })}/>
        </>
      :
        <Loader/>
      }
    </View>
  );
}

export default ProfileScreen;
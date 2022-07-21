import React, { useMemo } from 'react'
import {
  View
} from "react-native";

import Appstyles from '../../../assets/styles/main.scss';
import ProfileCard from '../../components/ProfileCard';

const UserProfileScreen = ({ route }) => {
  const { id } = useMemo(()=>route?.params, [route]);

  return (
    <View style={Appstyles.container}>
      <ProfileCard id={id}/>
    </View>
  );
}

export default UserProfileScreen;
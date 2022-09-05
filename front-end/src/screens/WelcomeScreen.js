import React, {useCallback} from 'react'
import {useNavigation} from '@react-navigation/native'
import {
   Text,
   View,
   Image,
   TouchableOpacity,
} from 'react-native'
import {StatusBar} from 'expo-status-bar'

import AppStyles from '../../assets/styles/main.scss';
import Button from "../components/Button";

const WelcomeScreen = () => {
   const navigation = useNavigation()

   const navigate = useCallback((nextPage) => () => {
      navigation.navigate(nextPage)
   })

   return (
      <View style={AppStyles.container}>
         <StatusBar style="auto"/>
         <Image style={AppStyles.image} source={require('../../assets/images/logo_color.png')}/>
         <Button title="Sign in" style={AppStyles.button} onPress={navigate('Sign in')}/>
         <Button title="Sign up" style={AppStyles.button} onPress={navigate('Sign up')}/>
         {/*<Button title="Activate User" style={AppStyles.button} onPress={navigate('Activate user')}/>*/}
      </View>
   )
}

export default WelcomeScreen

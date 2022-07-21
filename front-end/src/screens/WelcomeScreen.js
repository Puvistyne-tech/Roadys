import React, {useCallback} from 'react'
import {useNavigation} from '@react-navigation/native'
import {
   Text,
   View,
   Image,
   TouchableOpacity,
} from 'react-native'
import {StatusBar} from 'expo-status-bar'

import {Button} from 'react-native-elements'
import Appstyles from '../../assets/styles/main.scss'

const WelcomeScreen = () => {
   const navigation = useNavigation()

   const navigate = useCallback((nextPage) => () => {
      navigation.navigate(nextPage)
   })

   return (
      <View style={Appstyles.container}>
         <StatusBar style="auto"/>
         <Image style={Appstyles.image} source={require('../../assets/images/logo_color.png')}/>
         <Button title="Sign in" onPress={navigate('Sign in')}/>
         <Button title="Sign up" onPress={navigate('Sign up')}/>
      </View>
   )
}

export default WelcomeScreen

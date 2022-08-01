import React, {useState, useContext, useCallback} from 'react'
import {
   View,
   Image,
   TextInput, Text,
} from 'react-native'
import {showMessage} from 'react-native-flash-message'
import {StatusBar} from 'expo-status-bar'

import {Button} from 'react-native-elements'
import Appstyles from '../../assets/styles/main.scss'
import {AuthContext} from '../providers/AuthProvider'
import {useNavigation} from "@react-navigation/native";

const SignupScreen = () => {
   const navigation = useNavigation()

   const [pseudo, setPseudo] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] = useState(false);

   const {signup} = useContext(AuthContext)

   const authErrorHandling = useCallback(async (query) => {
      try {
         return await query
      } catch (error) {
         showMessage({
            message: 'Error',
            description: error.message,
            type: 'warning',
            duration: 10000,
         })
      }
   }, [])

   const createAccount = useCallback(async () => {

      if (!termsAndConditionsAccepted) {
         showMessage({
            message: 'Error',
            description: 'You must accept the terms and conditions',
            type: 'warning',
            duration: 10000,
         })
         return false
      } else {

         if (password === confirmPassword) {
            await authErrorHandling(signup(pseudo, email, password))
         } else {
            console.log('Error: Password and ConfirmPassword, must be the same')
         }
      }
   }, [pseudo, email, password, confirmPassword])

   // <Input
   //   label="email"
   //   autoCompleteType="email"
   //   keyboardType="email-address"
   //   textContentType="emailAddress"
   //   placeholder="Email"
   //   onChangeText={onChangeField('email')}
   // />
   // <Input
   //   label="password"
   //   secureTextEntry
   //   autoCompleteType="password"
   //   placeholder="Password"
   //   onChangeText={onChangeField('password')}
   // />

   return (
      <View style={Appstyles.container}>
         <StatusBar style="auto"/>
         <Image style={Appstyles.image} source={require('../../assets/images/logo_color.png')}/>
         <View style={Appstyles.inputView}>
            <TextInput
               style={Appstyles.textInput}
               placeholder="Pseudo"
               placeholderTextColor="#003f5c"
               onChangeText={(pseudo) => setPseudo(pseudo)}
            />
         </View>

         <View style={Appstyles.inputView}>
            <TextInput
               style={Appstyles.textInput}
               placeholder="Email"
               placeholderTextColor="#003f5c"
               onChangeText={(email) => setEmail(email)}
            />
         </View>

         <View style={Appstyles.inputView}>
            <TextInput
               style={Appstyles.textInput}
               placeholder="Password"
               placeholderTextColor="#003f5c"
               secureTextEntry
               onChangeText={(password) => setPassword(password)}
            />
         </View>

         <View style={Appstyles.inputView}>
            <TextInput
               style={Appstyles.textInput}
               placeholder="Confirm Password"
               placeholderTextColor="#003f5c"
               secureTextEntry
               onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
            />
         </View>
         <Button title="Create account" onPress={() => {
            createAccount()
         }}/>
         <Text style={Appstyles.text}>
            By creating an account, you agree to our Terms and Conditions.
            <Text
               style={{
                  ...Appstyles.textBold,
                  color: '#45a8f8'
               }}
               onPress={() => {
                  navigation.navigate('TermsAndConditions')
               }
               }
            >
               {'\n'}Here.
            </Text>
         </Text>
      </View>
   )
}

export default SignupScreen

import React, { useState, useContext, useCallback } from 'react'
import {
  View,
  Image,
  TextInput,
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { StatusBar } from 'expo-status-bar'

import { Button } from 'react-native-elements'
import Appstyles from '../../assets/styles/main.scss'
import { AuthContext } from '../providers/AuthProvider'

const SignupScreen = () => {
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { signup } = useContext(AuthContext)

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
    if (password === confirmPassword) {
      await authErrorHandling(signup(pseudo, email, password))
    } else {
      console.log('Error: Password and ConfirmPassword, must be the same')
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
      <StatusBar style="auto" />
      <Image style={Appstyles.image} source={require('../../assets/images/logo_color.png')} />
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
      <Button title="Create account" onPress={() => { createAccount() }} />
    </View>
  )
}

export default SignupScreen

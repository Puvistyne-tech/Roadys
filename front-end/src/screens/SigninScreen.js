import React, { useCallback, useState, useContext } from 'react'
import { showMessage } from 'react-native-flash-message'
import { StatusBar } from 'expo-status-bar'
import { Button } from 'react-native-elements'

import {
  View,
  Image,
  TextInput,
} from 'react-native'

import Appstyles from '../../assets/styles/main.scss'
import { AuthContext } from '../providers/AuthProvider'

const SigninScreen = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const { signin } = useContext(AuthContext)

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

  const connect = useCallback(async () => {
    await authErrorHandling(signin(login, password))
  }, [login, password])

  return (
    <View style={Appstyles.container}>
      <StatusBar style="auto" />
      <Image style={Appstyles.image} source={require('../../assets/images/logo_color.png')} />

      <View style={Appstyles.inputView}>
        <TextInput
          style={Appstyles.textInput}
          placeholder="Email or Pseudo"
          placeholderTextColor="#003f5c"
          onChangeText={(login) => { setLogin(login) }}
        />
      </View>

      <View style={Appstyles.inputView}>
        <TextInput
          style={Appstyles.textInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry
          onChangeText={(password) => { setPassword(password) }}
        />
      </View>
      <Button title="Login" onPress={() => { connect() }} />
    </View>
  )
}

export default SigninScreen

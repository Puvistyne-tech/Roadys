import React, { useState, useContext, useCallback, useEffect } from 'react'
import {
    View,
    Image,
    TextInput,
    Text, Pressable,
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

import AppStyles from '../../assets/styles/main.scss'
import Button from '../components/Button'
import { AuthContext } from '../providers/AuthProvider'
import TermsAndConditions from '../components/TermsAndConditions/TermsAndConditions'

const SignupScreen = () => {
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isAccepted, setIsAccepted] = useState(false)
    const [termsAndConditionsOpen, setTermsAndConditionsOpen] = useState(false)

    const { signup } = useContext(AuthContext)
    const navigation = useNavigation()

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

        console.log(isAccepted)

        if (pseudo === '' || email === '' || password === '' || confirmPassword === '') {
            showMessage({
                message: 'Error',
                description: 'All fields are necessary',
                type: 'warning',
                duration: 10000,
            })
        } else if (password !== confirmPassword) {
            showMessage({
                message: 'Error',
                description: 'Password and ConfirmPassword must be the same',
                type: 'warning',
                duration: 10000,
            })

        } else if (!isAccepted) {
            showMessage({
                message: 'Error',
                description: 'You must accept our Terms and Conditions',
                type: 'warning',
                duration: 10000,
            })
        } else {
            console.log(pseudo, email, password)
            await authErrorHandling(signup(pseudo, email, password))
        }
    }, [pseudo, email, password, confirmPassword, isAccepted])

    return (
      <>
          <TermsAndConditions
            isOpen={termsAndConditionsOpen}
            setIsOpen={setTermsAndConditionsOpen}
          />
          <View style={AppStyles.container}>
              <StatusBar style='auto' />
              <Image style={AppStyles.image} source={require('../../assets/images/logo_color.png')} />
              <View style={AppStyles.inputView}>
                  <TextInput
                    style={AppStyles.textInput}
                    placeholder='Pseudo'
                    placeholderTextColor='#003f5c'
                    onChangeText={(pseudo) => setPseudo(pseudo)}
                  />
              </View>

              <View style={AppStyles.inputView}>
                  <TextInput
                    style={AppStyles.textInput}
                    placeholder='Email'
                    placeholderTextColor='#003f5c'
                    onChangeText={(email) => setEmail(email)}
                  />
              </View>

              <View style={AppStyles.inputView}>
                  <TextInput
                    style={AppStyles.textInput}
                    placeholder='Password'
                    placeholderTextColor='#003f5c'
                    secureTextEntry
                    onChangeText={(password) => setPassword(password)}
                  />
              </View>

              <View style={AppStyles.inputView}>
                  <TextInput
                    style={AppStyles.textInput}
                    placeholder='Confirm Password'
                    placeholderTextColor='#003f5c'
                    secureTextEntry
                    onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                  />
              </View>

              <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    // alignContent:'space-around',
                    alignSelf: 'auto',
                    alignItems: 'center',
                    width: '85%',
                    // flex:2
                    // ...AppStyles.textInput,
                }}
              >


                  <Pressable
                    style={[{
                        height: 18,
                        width: 18,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: '#232370',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }]}
                    onPress={() => {
                        setIsAccepted(!isAccepted)
                        console.log('clicked here')
                    }}
                  >
                      {
                          isAccepted ?
                            <View style={{
                                height: 10,
                                width: 10,
                                borderRadius: 6,
                                backgroundColor: '#8989e5',
                            }} />
                            : null
                      }
                  </Pressable>
                  <Text
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        // alignContent:'space-around',
                        // alignSelf:'space-around',
                        // alignItems:'flex-end',
                        // width:'80%'
                    }}
                  >
                      {'  '}Agree to our{' '}
                      <Text
                        style={{
                            color: '#45a8f8',
                        }}
                        onPress={() => {
                            setTermsAndConditionsOpen(true)
                        }}
                      >
                          Terms and Conditions.
                      </Text>
                  </Text>
              </View>
              <Button title='Create account' style={AppStyles.button} onPress={() => createAccount()} />
              <Button title='Back' style={AppStyles.button} onPress={navigation.goBack} />
          </View>
      </>
    )
}

export default SignupScreen

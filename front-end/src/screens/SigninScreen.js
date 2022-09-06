import React, {useCallback, useState, useContext} from 'react'
import {showMessage} from 'react-native-flash-message'
import {StatusBar} from 'expo-status-bar'
import {useNavigation} from '@react-navigation/native'

import {
    View,
    Image,
    TextInput,
} from 'react-native'

import AppStyles from '../../assets/styles/main.scss';
import Button from "../components/Button";
import {AuthContext} from '../providers/AuthProvider'

const SigninScreen = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const {signin} = useContext(AuthContext)
    const navigation = useNavigation()

    const authErrorHandling = useCallback(async (query) => {
        console.log(process.env.API_HOST)
        try {
            const res= await query
            console.log(res)
            return res;
        } catch (error) {
            console.error(error?.code)
            showMessage({
                message: 'Error',
                description: error.message,
                type: 'warning',
                duration: 10000,
            })
        }
        console.log(query)
    }, [])

    const connect = useCallback(async () => {
        await authErrorHandling(signin(login, password))
    }, [login, password])

    return (
        <View style={AppStyles.container}>
            <StatusBar style="auto"/>
            <Image style={AppStyles.image} source={require('../../assets/images/logo_color.png')}/>

            <View style={AppStyles.inputView}>
                <TextInput
                    style={AppStyles.textInput}
                    placeholder="Email or Pseudo"
                    placeholderTextColor="#003f5c"
                    onChangeText={(login) => {
                        setLogin(login)
                    }}
                />
            </View>

            <View style={AppStyles.inputView}>
                <TextInput
                    style={AppStyles.textInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry
                    onChangeText={(password) => {
                        setPassword(password)
                    }}
                />
            </View>
            <Button title="Login" style={AppStyles.button} onPress={() => {
                connect()
            }}/>
            <Button title="Back" style={AppStyles.button} onPress={navigation.goBack}/>
        </View>
    )
}

export default SigninScreen

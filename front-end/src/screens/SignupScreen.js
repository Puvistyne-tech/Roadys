import React, {useState, useContext, useCallback, useEffect} from 'react'
import {
    View,
    Image,
    TextInput,
    Text,
} from 'react-native'
import {showMessage} from 'react-native-flash-message'
import {StatusBar} from 'expo-status-bar'
import {useNavigation} from '@react-navigation/native'

import AppStyles from '../../assets/styles/main.scss';
import Button from "../components/Button";
import {AuthContext} from '../providers/AuthProvider';
import TermsAndConditions from "../components/TermsAndConditions/TermsAndConditions";

const SignupScreen = () => {
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isAccepted, setIsAccepted] = useState(false);
    const [termsAndConditionsOpen, setTermsAndConditionsOpen] = useState(false);

    const {signup} = useContext(AuthContext)
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

    useEffect(() => {
        if (isAccepted) {
            setTermsAndConditionsOpen(false);
        }
    }, [isAccepted])


    const createAccount = useCallback(async () => {

        console.log(isAccepted)

        if (password === confirmPassword) {
            // if (!isAccepted) {
            //     showMessage({
            //         message: 'Error',
            //         description: 'You must accept the terms and conditions',
            //         type: 'warning',
            //         duration: 10000,
            //     })
            // } else {
                await authErrorHandling(signup(pseudo, email, password))
            // }
        } else {
            console.log('Error: Password and ConfirmPassword, must be the same')
        }
    }, [pseudo, email, password, confirmPassword])

    return (
        <>
            <TermsAndConditions
                isOpen={termsAndConditionsOpen}
                setIsOpen={setTermsAndConditionsOpen}
                isAccepted={isAccepted}
                setIsAccepted={setIsAccepted}
            />
            <View style={AppStyles.container}>
                <StatusBar style="auto"/>
                <Image style={AppStyles.image} source={require('../../assets/images/logo_color.png')}/>
                <View style={AppStyles.inputView}>
                    <TextInput
                        style={AppStyles.textInput}
                        placeholder="Pseudo"
                        placeholderTextColor="#003f5c"
                        onChangeText={(pseudo) => setPseudo(pseudo)}
                    />
                </View>

                <View style={AppStyles.inputView}>
                    <TextInput
                        style={AppStyles.textInput}
                        placeholder="Email"
                        placeholderTextColor="#003f5c"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>

                <View style={AppStyles.inputView}>
                    <TextInput
                        style={AppStyles.textInput}
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>

                <View style={AppStyles.inputView}>
                    <TextInput
                        style={AppStyles.textInput}
                        placeholder="Confirm Password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry
                        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                    />
                </View>
                <View style={[{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                }]}>
                    {
                        // props.selected ?
                            <View style={{
                                height: 12,
                                width: 12,
                                borderRadius: 6,
                                backgroundColor: '#000',
                            }}/>
                            // : null
                    }
                </View>
                <Text style={AppStyles.text}>
                    By creating an account, you agree to our Terms and Conditions.
                    <Text
                        style={{
                            color: '#45a8f8'
                        }}
                        onPress={() => {
                            setTermsAndConditionsOpen(true)
                            // navigation.navigate('TermsAndConditions', {
                            //     title: 'Terms and Conditions',
                            //     isAccepted: isAccepted,
                            //     setIsAccepted: setIsAccepted,
                            // })
                        }}
                    >
                        {'\n'}Here.
                    </Text>
                </Text>
                <Button title="Create account" style={AppStyles.button} onPress={() => createAccount()}/>
                <Button title="Back" style={AppStyles.button} onPress={navigation.goBack}/>
            </View>
        </>
    )
}

export default SignupScreen

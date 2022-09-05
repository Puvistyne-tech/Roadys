import React, {useState, useContext, useCallback, useEffect, useMemo} from 'react'
import {
    View,
    Image,
    TextInput,
    Text, Pressable,
} from 'react-native'
import {showMessage} from 'react-native-flash-message'
import {StatusBar} from 'expo-status-bar'
import {useFocusEffect, useNavigation} from '@react-navigation/native'

import AppStyles from '../../assets/styles/main.scss'
import Button from '../components/Button'
import {AuthContext} from '../providers/AuthProvider'
import TermsAndConditions from '../components/TermsAndConditions/TermsAndConditions'
import {useQuery} from "@apollo/client";
import {GET_USER} from "./queries";

const SignupScreen = () => {
    const [pseudo, setPseudo] = useState('Pseudo')
    const [email, setEmail] = useState('Email')
    const [password, setPassword] = useState('password')
    const [confirmPassword, setConfirmPassword] = useState('confirmPassword')

    const [isAccepted, setIsAccepted] = useState(false)
    const [termsAndConditionsOpen, setTermsAndConditionsOpen] = useState(false)

    const {signup, reactivateDeletedUser} = useContext(AuthContext)
    const navigation = useNavigation()

    const {data, refetch} = useQuery(GET_USER, {
        variables: {
            email: email,
        }
    });
    let tempUser = useMemo(() => data?.user, [data]);

    useEffect(() => {
        tempUser = data?.user
        console.log("tempUser")
        console.log(tempUser)
        console.log("isdeleted " + isDeletedUserFound())
    }, [data, tempUser]);

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

    useFocusEffect(
        React.useCallback(() => {
            refetch().then(r => {
                // console.log(r)
            }).catch(e => {
                // console.log(e)
            })
        }, [refetch, email, pseudo])
    );

    // useEffect(() => {
    //     setPseudo(tempUser?.pseudo)
    //     setEmail(tempUser?.email)
    //
    // }, [tempUser]);


    // useEffect(() => {
    //     refetch().then(r => {
    //         // console.log(r)
    //     })
    //     console.log(pseudo, email, password, confirmPassword)
    // }, [email, password, confirmPassword, pseudo]);

    const isDeletedUserFound = () => {
        if (tempUser == null) {
            return false
        } else return tempUser?.isDeleted;
    }

    const handleOnPress = useCallback(async () => {

        if (pseudo === '' || email === '' || password === '' || confirmPassword === '' || pseudo === 'Pseudo' || email === 'Email' || password === 'password' || confirmPassword === 'confirmPassword') {
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
            if (isDeletedUserFound()) {
                tempUser=null
                await authErrorHandling(reactivateDeletedUser(pseudo, email, password, false))
            } else {
                await authErrorHandling(signup(pseudo, email, password, false))
            }
            // await authErrorHandling(signup(pseudo, email, password))
        }
    }, [pseudo, email, password, confirmPassword, isAccepted])

    return (
        <>
            <TermsAndConditions
                isOpen={termsAndConditionsOpen}
                setIsOpen={setTermsAndConditionsOpen}
            />
            <View style={AppStyles.container}>
                <StatusBar style='auto'/>
                {isDeletedUserFound() && <View
                    style={{
                        backgroundColor: 'red',
                        width: '95%',
                        padding: 10,
                        marginBottom: 20,
                        borderRadius: 5,
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 16,
                        }}
                    >
                        {`❕The account linked to this email has been deleted. Choose new password to recover it ...`}
                    </Text>
                </View>}
                <Image style={AppStyles.image} source={require('../../assets/images/logo_color.png')}/>
                <View style={AppStyles.inputView}>
                    <TextInput
                        style={AppStyles.textInput}
                        placeholder={pseudo}
                        placeholderTextColor='#003f5c'
                        // editable={false}
                        onChangeText={(pseudo) => setPseudo(pseudo)}
                    />
                </View>

                <View style={AppStyles.inputView}>
                    <TextInput
                        style={AppStyles.textInput}
                        placeholder={email}
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
                            // console.log('clicked here')
                        }}
                    >
                        {
                            isAccepted ?
                                <View style={{
                                    height: 10,
                                    width: 10,
                                    borderRadius: 6,
                                    backgroundColor: '#8989e5',
                                }}/>
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
                <Button title={isDeletedUserFound() ? 'Reactivate your account' : 'Create Account'}
                        style={AppStyles.button} onPress={handleOnPress}/>
                <Button title='Back' style={AppStyles.button} onPress={navigation.goBack}/>
            </View>
        </>
    )
}

export default SignupScreen

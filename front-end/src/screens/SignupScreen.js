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

/**
 * It's a function that returns a view that contains a button that calls a function that returns a view that contains a
 * button that calls a function that returns a view that contains a button that calls a function that returns a view that
 * contains a button that calls a function that returns a view that contains a button that calls a function that returns a
 * view that contains a button that calls a function that returns a view that contains a button that calls a function that
 * returns a view that contains a button that calls a function that returns a view that contains a button that calls a
 * function that returns a view that contains a button that calls a function that returns a view that contains a button
 * that calls a function that returns a view that contains a button that calls a function that returns a view that contains
 * a button that calls a function that returns a view that contains a button that calls a function that returns a view that
 * contains a button that calls a function that returns a view that contains a button that calls a function that returns a
 * view
 * @returns The SignupScreen component is being returned.
 */
const SignupScreen = () => {
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isAccepted, setIsAccepted] = useState(false)
    const [termsAndConditionsOpen, setTermsAndConditionsOpen] = useState(false)

    const {signup, reactivateDeletedUser} = useContext(AuthContext)
    const navigation = useNavigation()

    /* It's a hook that allows us to query the database. */
    const {data, refetch} = useQuery(GET_USER, {
        variables: {
            email: email,
        }
    });
    /* It's a hook that allows us to query the database. */
    let tempUser = useMemo(() => data?.user, [data]);

    useEffect(() => {
        tempUser = data?.user
        if (isDeletedUserFound()) {
            setPseudo(tempUser?.pseudo)
        }
    }, [data, tempUser]);

    /* It's a function that returns a view that contains a button that calls a function that returns a view that contains a
     * button that calls a function that returns a view that contains a button that calls a function that returns a view
    that
     * contains a button that calls a function that returns a view that contains a button that calls a function that
    returns a
     * view that contains a button that calls a function that returns a view that contains a button that calls a
    function that
     * returns a view that contains a button that calls a function that returns a view that contains a button that calls
    a
     * function that returns a view that contains a button that calls a function that returns a view that contains a
    button
     * that calls a function that returns a view that contains a button that calls a function that returns a view that
    contains
     * a button that calls a function that returns a view that contains a button that calls a function that returns a
    view that
     * contains a button that calls a function that returns a view that contains a button that calls a function that
    returns a
     * view that contains a button that calls a function that returns a view that contains a button that calls a
    function that */
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

    /**
     * If the tempUser is null, return false, else return the value of the isDeleted property of the tempUser object
     * @returns A boolean value.
     */
    const isDeletedUserFound = () => {
        if (tempUser == null) {
            return false
        } else return tempUser?.isDeleted;
    }

    /* A function that is called when the user presses the signup button. It checks if the user has filled all the fields,
    if the password and confirmPassword are the same, if the user has accepted the terms and conditions and if the user
    is a deleted user. If all the conditions are met, it will call the signup function. */
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
            if (isDeletedUserFound()) {
                tempUser = null
                await authErrorHandling(reactivateDeletedUser(pseudo, email, password, false))
            } else {
                await authErrorHandling(signup(pseudo, email, password, false))
            }
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
                        {`❕The account linked to this email has been deleted. Choose a new password to recover it ...`}
                    </Text>
                </View>}
                <Image style={AppStyles.image} source={require('../../assets/images/logo_color.png')}/>
                <View style={AppStyles.inputView}>
                    <TextInput
                        style={{
                            ...AppStyles.textInput,
                            color:isDeletedUserFound() ? "#696868" : '#003f5c',

                        }}
                        placeholder={"Pseudo"}
                        placeholderTextColor={isDeletedUserFound() ? "#919191" : '#003f5c'}
                        editable={!isDeletedUserFound()}
                        onChangeText={(pseudo) => setPseudo(pseudo)}
                        value={pseudo}
                        onPressIn={() => {
                            isDeletedUserFound() ? showMessage({
                                message: 'Oops !!!',
                                description: 'You cannot change your pseudo/username for a deleted account',
                                type: 'warning',
                                duration: 1000,
                            }) : null
                        }}
                    />
                </View>

                <View style={AppStyles.inputView}>
                    <TextInput
                        style={AppStyles.textInput}
                        placeholder={'Email'}
                        placeholderTextColor='#003f5c'
                        onChangeText={(email) => setEmail(email)}
                        value={email}
                    />
                </View>

                <View style={AppStyles.inputView}>
                    <TextInput
                        style={AppStyles.textInput}
                        placeholder='Password'
                        // value={password}
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

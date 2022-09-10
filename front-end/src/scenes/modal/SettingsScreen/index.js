import * as React from 'react';
import {
    View,
    Text,
    StyleSheet, Alert,
    // Button
} from 'react-native';
import Constants from 'expo-constants';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Button from '../../../components/Button';
import AppStyles from '../../../../assets/styles/main.scss'
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {AuthContext} from "../../../providers/AuthProvider";
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_USER, GET_CURRENT_USER} from "./query";
import {showMessage} from "react-native-flash-message";
import LoadingModal from "../../../components/LoadingModal";

/**
 * It's a function that returns a view with a button that when pressed, opens an alert that asks the user if they want to
 * delete their account. If they press yes, it opens another alert that asks them if they're sure. If they press yes again,
 * it deletes their account
 * @returns The SettingsScreen component is being returned.
 */
const SettingsScreen = () => {
    const navigation = useNavigation();
    const {disconnect} = useContext(AuthContext)
    const [deleteUser, {l}] = useMutation(DELETE_USER);
    const [loading, setLoading] = useState(false);

    const {data, refetch, error} = useQuery(GET_CURRENT_USER);
    let currentUser = useMemo(() => data?.currentUser, [data])

    useFocusEffect(
        React.useCallback(() => {
            refetch().then(r => {
                console.log(r)
            })
        }, [refetch])
    );

    useEffect(() => {
        currentUser = data?.currentUser
    }, [data, currentUser]);


    /* It's a function that deletes the user's account. */
    const handleDeleteUser = useCallback(async () => {
        setLoading(true)
        try {
            await deleteUser({variables: {deleteUserId: currentUser?.id}});
            console.log(loading)
            setTimeout(() => {
                setLoading(false)
                alert('Account deleted successfully')
                disconnect()
            }, 3000)
        } catch (e) {
            showMessage({
                message: "Error",
                description: e.message,
                type: "warning",
                duration: 10000
            });
            setLoading(false)
        }
    })

    /**
     * A function that is called when the user presses the delete account button. It asks the user if they are sure they
     * want to delete their account. If they press yes, it asks them again if they are sure. If they press yes again, it
     * calls the handleDeleteUser function.
     * @returns {Promise<void>}
     *
     * @see handleDeleteUser
     */
    function handleDeleteAccount() {
        Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account?',
            [
                {
                    text: 'No, Cancel',
                    onPress: () => {
                        console.log('Cancel Pressed');

                    }
                },
                {
                    text: 'Yes, Delete',
                    onPress: () => {
                        Alert.alert(
                            'Are you sure',
                            'This action cannot be undone, You will lose all your data',
                            [
                                {
                                    text: 'No, Cancel',
                                    onPress: () => {
                                        console.log('Cancel Pressed');

                                    }
                                },
                                {
                                    text: 'Yes, I am sure',
                                    onPress: () => {
                                        console.log('Delete Pressed');
                                        // navigation.navigate('Profile')
                                        setLoading(true)
                                        handleDeleteUser()

                                    }

                                }
                            ],
                        )
                    }
                }
            ],
            {cancelable: false},
        );
    }

    /**
     * When the user presses the edit profile button, the user is navigated to the Profile screen
     */
    const onEditProfilePress = () => {
        navigation.navigate('Profile')
    }

    /**
     * When the user presses the button, the app navigates to the Feedback screen
     */
    const onSendFeedbackPress = () => {
        navigation.navigate('Feedback')
    }

    return (
        <>
            {loading && <LoadingModal loading={loading}
                                      text={"Deleting your account... \nYou will be redirected to the login screen"}/>}

            <View style={styles.container}>
                <Text style={styles.title}>Settings</Text>
                <Text style={styles.input}>You have the default settings applied.{"\n"}{"\n"}
                    You will be soon able to personalize your settings.{"\n"}{"\n"}
                    You can already edit your profile and disable the localisation feature.{"\n"}{"\n"}
                    You can also send us a feedback to help us to improve the app.
                </Text>
                <Button
                    style={AppStyles.button}
                    title="Edit Profile"
                    onPress={onEditProfilePress}
                />
                <Button
                    title="Send a feedback"
                    style={AppStyles.button}
                    onPress={onSendFeedbackPress}
                />
                <Button
                    style={AppStyles.button}
                    color={"#121212"}
                    title="Delete this account"
                    onPress={handleDeleteAccount}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontStyle: "italic",
        marginBottom: 15,
        marginLeft: 120,
    },
    input: {
        fontSize: 18,
        marginHorizontal: 25,
        marginTop: 5,
        marginBottom: 8,
        paddingVertical: 10,
    },
    button: {
        backgroundColor: '#9f3e3e',
        paddingTop: 20,
        paddingBottom: 20,
        margin: 5
    }
});

export default SettingsScreen;

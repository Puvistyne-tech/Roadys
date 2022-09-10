import React, {useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert} from "react-native";
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/Button';
import styles from './style';
import AppStyles from '../../../../assets/styles/main.scss';
import * as emailjs from "@emailjs/browser";
import LoadingModal from "../../../components/LoadingModal";


/**
 * It takes in a route object and returns a form that sends feedback to the team
 * @returns A function component that returns a scroll view with a keyboard aware scroll view inside.
 */
const FeedbackScreen = ({route}) => {
    const navigation = useNavigation();

    /* A state variable that is used to show a loading modal when the feedback is being sent. */
    const [loading, setLoading] = useState(false);

    /* Using the `useForm` hook to create a form. */
    const {control, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            firstName: '', lastName: '', to_name: 'Feedback Team Roadys', feedback: '',
        }
    });

    /**
     * It takes the data from the form and sends it to the emailjs server to send an email to the team.
     * @param data The data from the form. It contains the first name, last name, feedback, and the email address.
     * @returns {Promise<void>} A promise that resolves when the email is sent. It also resets the form. If there is an error, it shows an alert. If the email is sent successfully, it shows an alert.
     * @async It is an asynchronous function. It uses the `await` keyword. It uses the `emailjs` library. It uses the `Alert` component from `react-native`. It uses the `reset` function from `react-hook-form`.
     * @await It waits for the email to be sent. It waits for the alert to be dismissed. It waits for the form to be reset. It waits for the loading modal to be dismissed. It waits for the navigation to go back.
     * @throws It throws an error if the email is not sent successfully.
     * @see https://react-hook-form.com/api#useForm
     * @see https://www.npmjs.com/package/emailjs
     * @see https://reactnative.dev/docs/alert
     * @see https://react-hook-form.com/api#reset
     * @see https://reactnative.dev/docs/modal
     * @see https://reactnavigation.org/docs/navigation-prop
     *
     */
    const onSubmit = data => {
        setLoading(true)

        const [SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY, PRIVATE_KEY] = [process.env.SERVICE_ID, process.env.FEEDBACK_TEMPLATE_ID, process.env.PUBLIC_KEY, process.env.PRIVATE_KEY];

        emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY)
            .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    setLoading(false)
                    Alert.alert("Success", "Your feedback has been sent to the team. Thank you for your feedback!", [{
                        text: "Go back", onPress: () => {
                            navigation.goBack()
                        },
                    },
                        // {
                        //     text: "Send a new feedback", onPress: () => {
                        //         reset()
                        //     }
                        // }
                    ])
                },

                function (error) {
                    setLoading(false)
                    console.log('FAILED...', error);
                    Alert.alert("Failed", "Your feedback has not been sent. Please try again.", [{
                        text: "Close"
                    }])
                }
            );
    };


    return (<>
            {loading && <LoadingModal loading={loading} text={"Sending feedback ..."}/>}
            <ScrollView style={styles.formContainer}>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.container}
                >
                    <Controller
                        name="firstName"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field: {onChange, onBlur, value}}) => (<View style={styles.inputContainer}>
                            <Text style={styles.label}>First Name</Text>
                            <TextInput
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                            />
                            <Text style={styles.textError}>{errors?.test && "first name is required."}</Text>
                        </View>)}
                    />

                    <Controller
                        name="lastName"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field: {onChange, onBlur, value}}) => (<View style={styles.inputContainer}>
                            <Text style={styles.label}>Last Name</Text>
                            <TextInput
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                            />
                            <Text style={styles.textError}>{errors?.test && "last name is required."}</Text>
                        </View>)}
                    />

                    <Controller
                        name="feedback"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field: {onChange, onBlur, value}}) => (<View style={styles.inputContainer}>
                            <Text style={styles.label}>Feedback</Text>
                            <TextInput
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={[styles.feedback, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                            />
                            <Text style={styles.textError}>{errors?.test && "description is required."}</Text>
                        </View>)}
                    />

                    <Controller
                        name="suggestion"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field: {onChange, onBlur, value}}) => (<View style={styles.inputContainer}>
                            <Text style={styles.label}>Any other suggestion ?</Text>
                            <TextInput
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                            />
                            <Text style={styles.textError}>{errors?.test && "last name is required."}</Text>
                        </View>)}
                    />

                    <Button
                        title="Send Feedback"
                        onPress={handleSubmit(onSubmit)}
                        style={AppStyles.button}
                    />
                </KeyboardAwareScrollView>
            </ScrollView>

        </>
    );
}

export default FeedbackScreen;

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


const FeedbackScreen = ({route}) => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const {control, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            firstName: '', lastName: '', to_name: 'Feedback Team Roadys', feedback: '',
        }
    });

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
                    }, {
                        text: "Send a new feedback", onPress: () => {
                            reset()
                        }
                    }])
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

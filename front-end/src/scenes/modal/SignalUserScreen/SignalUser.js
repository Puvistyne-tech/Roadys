import React, {useEffect, useMemo, useState} from 'react';
import {Alert, ScrollView, Text, TextInput, View} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {Controller, useForm} from "react-hook-form";
import * as emailjs from "@emailjs/browser";
import LoadingModal from "../../../components/LoadingModal";
import styles from "./style";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Button from "../../../components/Button";
import AppStyles from "../../../../assets/styles/main.scss";
import MyPicker from "../../../components/MyPicker/MyPicker";
import {useQuery} from "@apollo/client";

import {showMessage} from "react-native-flash-message";
import {GET_CURRENT_USER, GET_USER} from "./queries";

const SignalUser = (props) => {

    const {data, refetch, error} = useQuery(GET_CURRENT_USER);
    let currentUser = useMemo(() => data?.currentUser, [data])

    useFocusEffect(
        React.useCallback(() => {
            refetch().then(r => {
                // console.log(r)
            })
        }, [refetch])
    );

    useEffect(() => {
        currentUser = data?.currentUser
    }, [data, currentUser]);


    const {
        data: data2,
        refetch: refetch2,
        error: error2
    } = useQuery(GET_USER, {variables: {id: props.route.params.victimId}});

    const victim = useMemo(() => data2?.user, [data2])

    useFocusEffect(
        React.useCallback(() => {
            refetch2().then(r => {
                // console.log(r)
                // // setVictim(r.user)
            })
        }, [refetch2])
    );


    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const {control, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            victimUserName: victim?.firstname + " " + victim?.lastname,
            currentUserName: currentUser?.firstname + " " + currentUser?.lastname,
            to_name: 'Roadys Team',
            motif: '',
            message: '',
        }
    });


    const onSubmit = data => {
        setLoading(true)

        const [SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY, PRIVATE_KEY] = [process.env.SERVICE_ID, process.env.SIGNAL_USER_TEMPLATE_ID, process.env.PUBLIC_KEY, process.env.PRIVATE_KEY];

        emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY)
            .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    setLoading(false)
                    Alert.alert("Success", "Your complain has been sent to the team. Thank you for your concern!", [{
                        text: "Go back", onPress: () => {
                            navigation.goBack()
                        },
                    }, {
                        text: "Signal this user again", onPress: () => {
                            reset()
                        }
                    }])
                },

                function (error) {
                    setLoading(false)
                    console.log('FAILED...', error);
                    Alert.alert("Failed", "Your complain has not been sent. Please try again.", [{
                        text: "Close"
                    }])
                }
            );
    };


    let Motifs = [
        {label: "Abuse", value: "Abuse"},
        {label: "Harassment", value: "Harassment"},
        {label: "Racism", value: "Racism"},
        {label: "Other", value: "Other"},
    ];


    return (
        <>
            {loading && <LoadingModal loading={loading} text={"Sending your complain ..."}/> }
                <ScrollView style={styles.formContainer}>
                    <KeyboardAwareScrollView
                        contentContainerStyle={styles.container}
                    >

                        <Controller
                            name="victimUserName"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field: {onChange, onBlur, value}}) => (<View style={styles.inputContainer}>
                                <Text style={styles.label}>Signal this user</Text>
                                <TextInput
                                    editable={false}
                                    onBlur={onBlur}
                                    value={value}
                                    style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                                />
                            </View>)}
                        />

                        <Controller
                            name="currentUserName"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field: {onChange, onBlur, value}}) => (<View style={styles.inputContainer}>
                                <Text style={styles.label}>Current User</Text>
                                <TextInput
                                    editable={false}
                                    onBlur={onBlur}
                                    value={value}
                                    style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                                />
                            </View>)}
                        />

                        <Controller
                            name="motif"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field: {onChange, onBlur, value}}) => (
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Motif :</Text>
                                    <MyPicker
                                        label={"Motif"}
                                        selectedValue={value}
                                        onValueChange={onChange}
                                        items={Motifs}
                                        onBlur={onBlur}
                                        errors={errors}
                                    />
                                    <Text style={styles.textError}>{errors?.test && "Motif is required."}</Text>
                                </View>
                            )}
                        />

                        <Controller
                            name="message"
                            control={control}
                            rules={{
                                required: false,
                            }}
                            render={({field: {onChange, onBlur, value}}) => (<View style={styles.inputContainer}>
                                <Text style={styles.label}>Why do you warn to Signal this user :</Text>
                                <TextInput
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                                />
                                <Text style={styles.textError}>{errors?.test && "message is required."}</Text>
                            </View>)}
                        />

                        <Button
                            title="Signal this user"
                            onPress={handleSubmit(onSubmit)}
                            style={AppStyles.button}
                        />
                    </KeyboardAwareScrollView>
                </ScrollView>
        </>
    );
}

export default SignalUser;

import React, {useCallback, useEffect, useState, useMemo} from 'react'
import {
    Text,
    View,
    ScrollView,
    TextInput,
    StyleSheet, Keyboard,
} from "react-native";
import {
    useQuery,
    useMutation
} from "@apollo/client";
import {useForm, Controller} from 'react-hook-form';
import Constants from 'expo-constants';
import {Switch} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {showMessage} from "react-native-flash-message";
import {useNavigation, useFocusEffect} from '@react-navigation/native';
// import { Button } from 'react-native-elements';

import AppStyles from '../../../assets/styles/main.scss';
import Loader from '../../components/Loader';
import {GET_USER, UPDATE_USER} from './queries'
import Button from "../../components/Button";
import {Picker} from "@react-native-picker/picker";

const EditProfileScreen = ({route}) => {
    const {id} = useMemo(() => route?.params, [route]);
    const [user, setUser] = useState(null);
    const {data, refetch} = useQuery(GET_USER, {variables: {id}});
    const [updateUser, {loading}] = useMutation(UPDATE_USER);
    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            refetch()
        }, [refetch])
    );

    useEffect(() => {
        const user = data?.user
        if (user) {
            const result = {
                ...user,
                age: user?.age ? `${user.age}` : ""
            }
            setUser(result)
        }
    }, [data]);

    useEffect(() => {
        reset(user);
    }, [user]);

    const {handleSubmit, formState: {errors}, reset, control} = useForm({
        values: useMemo(() => user, [user])
    });

    const onSubmit = useCallback(async formData => {
        const variables = {id, ...formData, age: +formData.age}

        // console.log(variables)

        try {
           await updateUser({variables})
           showMessage({
              message: "Success",
              description: "your data were updated",
              type: "success",
              duration: 10000
           })
           navigation.goBack();
        } catch (err) {
           showMessage({
              message: "Error",
              description: err.message,
              type: "warning",
              duration: 10000
           });
        }
    }, [updateUser]);

    if (!user) {
        return (
            <View style={AppStyles.container}>
                <Loader/>
            </View>
        )
    }

    let TransportType = [
        {
            label: 'Bike',
            value: 'BIKE'
        },
        {
            label: 'Backpack',
            value: 'BACKPACK'
        },
        {
            label: 'Train',
            value: 'TRAIN'
        },
        {
            label: 'Car',
            value: 'CAR'
        },
        {
            label: 'Erasmus',
            value: 'ERASMUS'
        },
        {
            label: 'Nomad',
            value: 'NOMAD'
        },
        {
            label: 'Other',
            value: 'OTHER'
        }
    ]

    return (

        <ScrollView style={styles.formContainer}>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
            >
                {/* isVisibled */}
                <Controller
                    name="isVisibled"
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Appear on the map</Text>
                            <Switch
                                value={value}
                                onValueChange={onChange}
                            />
                        </View>
                    )}
                />

                {/* firstname */}
                <Controller
                    name="firstname"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>First Name</Text>
                            <TextInput
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                            />
                            <Text style={styles.textError}>{errors?.test && "first name is required."}</Text>
                        </View>
                    )}
                />

                {/* lastname */}
                <Controller
                    name="lastname"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Last Name</Text>
                            <TextInput
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                            />
                            <Text style={styles.textError}>{errors?.test && "last name is required."}</Text>
                        </View>
                    )}
                />

                {/* age */}
                <Controller
                    name="age"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Age</Text>
                            <TextInput
                                onBlur={onBlur}
                                type='number'
                                onChangeText={onChange}
                                value={value}
                                keyboardType="number-pad"
                                style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                            />
                            <Text style={styles.textError}>{errors?.test && "age is required."}</Text>
                        </View>
                    )}
                />

                {/* nationality */}
                <Controller
                    name="nationality"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Nationality</Text>
                            <TextInput
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                            />
                            <Text style={styles.textError}>{errors?.test && "nationality is required."}</Text>
                        </View>
                    )}
                />

                {/* kindOfTrip */}


                <Controller
                    name="kindOfTrip"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Kind of trip</Text>
                            <Picker
                                mode="dialog"
                                prompt={'Select your kind of trip'}
                                selectedValue={value}
                                style={styles.inputContainer}
                                numberOfLines={1}
                                onValueChange={onChange}
                                onBlur={() => {
                                    onBlur()
                                    console.log(value)
                                }}
                                onFocus={() => {
                                    console.log('onFocus')
                                    setTimeout(() => {
                                        Keyboard.dismiss()
                                    })
                                }}
                            >
                                {TransportType.map(item => (
                                    <Picker.Item key={item.value} label={item.label} value={item.value}/>
                                ))}
                                <Text style={styles.textError}>{errors?.test && "kind of trip is required."}</Text>
                            </Picker>
                        </View>
                        // <View style={styles.inputContainer}>
                        //    <Text style={styles.label}>Kind of trip</Text>
                        //    <TextInput
                        //       onBlur={onBlur}
                        //       onChangeText={onChange}
                        //       value={value}
                        //       style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                        //    />
                        //    <Text style={styles.textError}>{errors?.test && "kind of trip is required."}</Text>
                        // </View>
                    )}
                />

                {/* description */}
                <Controller
                    name="description"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                            />
                            <Text style={styles.textError}>{errors?.test && "description is required."}</Text>
                        </View>
                    )}
                />
                <Button
                    title="Edit profile"
                    style={AppStyles.button}
                    onPress={handleSubmit(onSubmit)}
                />
            </KeyboardAwareScrollView>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'white',
        // margin:10,
        padding: 20
    },
    formContainer: {
        paddingBottom: 15,
        // flex: 1,
    },
    button: {
        backgroundColor: 'red',
    },
    inputContainer: {
        marginVertical: 8,
    },
    input: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 5,
        paddingVertical: 5,
        paddingLeft: 5,
        fontSize: 16,
        height: 40,
        // color: '#c0cbd3',
    },
    label: {
        paddingVertical: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    textError: {
        color: '#fc6d47',
        fontSize: 14,
    },
});

export default EditProfileScreen;

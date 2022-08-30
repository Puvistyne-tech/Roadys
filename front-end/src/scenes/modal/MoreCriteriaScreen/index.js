import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Alert, Modal, TouchableOpacity,
} from 'react-native';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import Colors from "../../../theme/colors";
import AppStyles from '../../../../assets/styles/main.scss';
import Constants from 'expo-constants';
import {showMessage} from "react-native-flash-message";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import MyPicker from '../../../components/MyPicker/MyPicker';
import MyCountryPicker from '../../../components/MyCountryPicker';
import {useForm, Controller} from 'react-hook-form';
import {bool} from "prop-types";

const MoreCriteriaScreen = (props) => {
    const navigation = useNavigation();
    const {filter, setFilter} = props;

    const {handleSubmit, formState: {errors}, reset, setValue, control} = useForm({
        defaultValues: {
            sex: filter?.sex,
            nationality: filter?.nationality,
            TransportType: filter?.TransportType,
        },
    });

    const CancelPressed = () => {
        showMessage({
            message: "Success",
            description: "All criteria were deleted",
            type: "success",
            duration: 5000,
        })
        reset(props.filter)
        setValue("sex", "ALL")
        setValue("nationality", "ALL")
        setValue("TransportType", "ALL")
        // reset()
        props.setIsOpen(false)
    }

    const SavePressed = useCallback(
        async (formData) => {
            // console.log("########")
            // route.params.setFilter(formData);
            setFilter(formData);
            // // console.log(filter);

            showMessage({
                message: "Success",
                description: "All criteria were deleted",
                type: "success",
                duration: 5000,
            })
            // navigation.goBack();
            props.setIsOpen(false);
        }, [navigation, setFilter]
    );


    const Sex = [
        {
            label: 'All',
            value: 'ALL'
        },
        {
            label: 'Man',
            value: 'MAN'
        },
        {
            label: 'Woman',
            value: 'WOMAN'
        },
        {
            label: 'Other',
            value: 'OTHER'
        }
    ]

    const TransportType = [
        {
            label: 'All',
            value: 'ALL'
        },
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

    // // console.log(control)

    useEffect(() => {
        // console.log("control")
        // console.log(control?._defaultValues)
    }, [control]);

    const resetThisField = (field) => {
        // console.log(field)
        setValue(field, "ALL")
    }

    const MyResetButton = useCallback(({value, fieldName}) => {
        if (control?._defaultValues[fieldName] !== "ALL") {
            return (<></>)
        } else {
            return (value !== "ALL" && <TouchableOpacity
                style={{
                    alignItems: 'right',
                    alignSelf: "flex-start",
                    borderRadius: 12,
                    marginLeft: 5,
                    padding: 5,
                    borderWidth: 1,
                    borderColor: '#ff1313',
                    backgroundColor: "#fde3e3",

                }}
                onPress={() => resetThisField(fieldName)}
            >
                <Text
                    style={styles.clearText}
                >clear x</Text>
            </TouchableOpacity>)
        }
    }, []);


    return (

        <Modal
            animationType={'none'}
            transparent={false}
            onRequestClose={() => null}
            visible={props.isOpen}
            style={AppStyles.container}
        >
            <ScrollView style={styles.formContainer}>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.container}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: Colors.primary,
                        }}
                        onPress={() => props.setIsOpen(false)}
                    >
                        {"❌"} Close Filter
                    </Text>

                    {/* sex */}
                    <Controller
                        name="sex"
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <View style={styles.inputContainer}>
                                <View
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.label,
                                            alignSelf: "flex-start",

                                        }}
                                    >Gender </Text>
                                    <MyResetButton
                                        value={value}
                                        fieldName={"sex"}
                                    />
                                </View>
                                <MyPicker
                                    label={"sex"}
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    items={Sex}
                                    onBlur={onBlur}
                                    errors={errors}
                                />
                            </View>
                        )}
                    />

                    {/* kindOfTrip */}
                    <Controller
                        name="TransportType"
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <View style={styles.inputContainer}>
                                <View
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.label,
                                            alignSelf: "flex-start",

                                        }}
                                    >Kind of trip </Text>
                                    <MyResetButton
                                        value={value}
                                        fieldName={"TransportType"}
                                    />
                                </View>
                                <MyPicker
                                    label={"TransportType"}
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    items={TransportType}
                                    onBlur={onBlur}
                                    errors={errors}
                                />
                                <Text style={styles.textError}>{errors?.test && "kind of trip is required."}</Text>
                            </View>
                        )}
                    />

                    {/* nationality */}
                    <Controller
                        name="nationality"
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <View style={styles.inputContainer}>
                                <View
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.label,
                                            alignSelf: "flex-start",

                                        }}
                                    >Nationality</Text>
                                    <MyResetButton
                                        value={value}
                                        fieldName={"nationality"}
                                    />
                                </View>
                                <MyCountryPicker
                                    style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                                    label={"Nationality"}
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    onBlur={onBlur}
                                    errors={errors}
                                />
                            </View>
                        )}
                    />

                    <Button
                        style={{
                            ...AppStyles.button,
                            marginTop: 30,
                        }}
                        title="Apply my criteria"
                        onPress={handleSubmit(SavePressed)}
                    />
                    <Button
                        style={{
                            ...AppStyles.button,
                            marginTop: 30,
                        }}
                        title="Delete all criteria"
                        onPress={CancelPressed}
                    />
                </KeyboardAwareScrollView>
            </ScrollView>
        </Modal>
    );


}

export default MoreCriteriaScreen;

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
    inputContainer: {
        marginVertical: 8,
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
    clearText: {
        color: '#ff1313',
    }
})




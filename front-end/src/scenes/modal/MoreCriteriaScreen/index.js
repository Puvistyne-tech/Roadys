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
import MyRangeSlider from "../../../components/MyRangeSlider";

/**
 * It's a modal that allows the user to filter the list of travelers
 * @param props - (     visible: boolean,        setVisible: (value: boolean) => void,        onFilter: (data: any) => void    )    visible: boolean - if the modal is visible or not    setVisible: (value: boolean) => void - function to set the visibility of the modal    onFilter: (data: any) => void - function to call when the user clicks on the filter button
 * @returns A modal with a form to filter the users list
 */
const MoreCriteriaScreen = (props) => {
    const navigation = useNavigation();
    const {filter, setFilter} = props;

    /* Using the useForm hook to create a form. */
    const {handleSubmit, formState: {errors}, reset, setValue, control} = useForm({
        defaultValues: {
            sex: filter?.sex,
            nationality: filter?.nationality,
            TransportType: filter?.TransportType,
            age: filter?.age
        },
    });

    /**
     * It resets the filter to the default values, and then closes the modal
     * @returns void
     */
    const CancelPressed = () => {
        showMessage({
            message: "Success",
            description: "All criteria were deleted",
            type: "success",
            duration: 5000,
        })

        setFilter(
            {
                "TransportType": "ALL",
                "nationality": "ALL",
                "sex": "ALL",
                "age": [1, 99]
            }
        )
        reset(props.filter)
        // reset()
        props.setIsOpen(false)
    }

    /* A callback function that is called when the user presses the save button. */
    const SavePressed = useCallback(
        async (formData) => {
            setFilter(formData);
            showMessage({
                message: "Success",
                description: "All criteria were deleted",
                type: "success",
                duration: 5000,
            })
            props.setIsOpen(false);
        }, [navigation, setFilter]
    );


    /* Creating an array of objects. */
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

    /* Creating an array of objects. */
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


    /**
     * It takes a field and a reset value, and sets the value of the field to the reset value
     * @param field - The name of the field you want to reset.
     * @param resetValue - The value you want to reset the field to its default values.
     * @returns void
     * @example resetField('name', 'John Doe')
     * @example resetField('age', 18)
     */
    const resetThisField = (field, resetValue) => {
        // console.log(field)
        setValue(field, resetValue)
    }

    /* A React Hook that is used to reset the value of a field. */
    const MyResetButton = useCallback(({value, fieldName, resetValue}) => {

        if (Array.isArray(resetValue)) {
            if (control?._defaultValues[fieldName][0] !== resetValue[0] && control?._defaultValues[fieldName][1] !== resetValue[1]) {
                return (<></>)
            } else {
                return (
                    value[0] !== resetValue[0] || value[1] !== resetValue[1] ? (
                        <TouchableOpacity onPress={() => resetThisField(fieldName, resetValue)}>
                            <Text style={styles.resetButton}>Reset ⟳ </Text>
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )
                )
            }
        } else {
            if (control?._defaultValues[fieldName] !== resetValue) {
                return (<></>)
            } else {
                return (value !== resetValue && <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => resetThisField(fieldName, resetValue)}
                >
                    <Text
                        style={styles.clearText}
                    >clear ❌</Text>
                </TouchableOpacity>)
            }
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
                                        resetValue={"ALL"}
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
                                        resetValue={"ALL"}
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
                                        resetValue={"ALL"}
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

                    {/*age*/}
                    <Controller
                        name="age"
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
                                    >Age</Text>
                                    <MyResetButton
                                        value={value}
                                        fieldName={"age"}
                                        resetValue={[1, 99]}
                                    />
                                </View>
                                <MyRangeSlider
                                    ageRange={value}
                                    setAgeRange={onChange}
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
    },
    resetButton: {
        alignItems: 'center',
        alignSelf: "flex-start",
        borderRadius: 12,
        marginLeft: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: '#ff1313',
        backgroundColor: "#fde3e3",
    }
})




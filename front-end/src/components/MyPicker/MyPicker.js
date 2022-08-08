import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from "@react-native-picker/picker";
import Constants from "expo-constants";
import {capitalizeFirstLetter} from "../../utils/funcs";

const MyPicker = (props) => {

    const {label, selectedValue, onValueChange, items, onBlur, errors} = props

    const [isPickerOpen, setIsPickerOpen] = useState(false);


    return (
        <>
            {isPickerOpen ?
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            setIsPickerOpen(false)
                        }}
                    >
                        <Text
                            style={{
                                // float: 'right',
                                color: '#ff0000',
                                textAlign: 'right',
                            }}
                        >close X</Text>
                    </TouchableOpacity>
                    <Picker
                        mode="dropdown"
                        selectedValue={selectedValue}
                        onValueChange={onValueChange}
                        numberOfLines={1}
                        onBlur={onBlur}
                        style={{
                            ...styles.inputContainer,
                            borderWidth: 2,
                            borderColor: "#d0d0d0",
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                    >
                        {items.map((item, index) => (
                            <Picker.Item
                                key={item.value}
                                label={item.label}
                                value={item.value}
                            />
                        ))}
                    </Picker>
                </View>
                :
                <TextInput
                    // onBlur={onBlur}
                    // onChangeText={onChange}
                    onPressIn={() => setIsPickerOpen(true)}
                    // onPressOut={() => setIsPickerOpen(false)}
                    value={capitalizeFirstLetter(selectedValue)}
                    style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}
                />
            }
        </>
    )

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


export default MyPicker;

import React, {useEffect, useState} from 'react';
import {PixelRatio, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import CountryPicker, {DARK_THEME, DEFAULT_THEME} from 'react-native-country-picker-modal'
import * as lookup from "country-code-lookup";


const styles = StyleSheet.create({
    container: {
        // paddingVertical: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 5,
        paddingVertical: 5,
        paddingLeft: 5,
        fontSize: 16,
        height: 40,
        color: "#e01811",
    },
    welcome: {
        fontSize: 18,
        textAlign: 'left',
        margin: 0,
    },
    instructions: {
        fontSize: 10,
        textAlign: 'center',
        color: '#888',
        marginBottom: 0,
    },
    data: {
        maxWidth: 250,
        padding: 10,
        marginTop: 7,
        backgroundColor: '#ddd',
        borderColor: '#888',
        borderWidth: 1 / PixelRatio.get(),
        color: '#777',
    },
})


const Option = ({value, onValueChange, title}) => (
    <View>
        <Text style={styles.instructions}>{title}</Text>
        <Switch {...{value, onValueChange}} />
    </View>
)


const MyCountryPicker = (props) => {
    const {label, selectedValue, onValueChange, items, onBlur, errors} = props

    const [countryCode, setCountryCode] = useState(lookup.byCountry(selectedValue)?.internet);
    const [country, setCountry] = useState(null)

    const [withCountryNameButton, setWithCountryNameButton] = useState(
        true,
    )
    const [withFlag, setWithFlag] = useState(true)
    const [withEmoji, setWithEmoji] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(true)
    const [withCallingCode, setWithCallingCode] = useState(false)
    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountry(country)
        onValueChange(country.name)
    }

    useEffect(() => {
        setCountryCode(lookup.byCountry(selectedValue)?.internet)
    }, [selectedValue]);


    const [visible, setVisible] = useState(false);

    const switchVisible = () => setVisible(!visible)


    let withModal = true;
    let withFlagButton = true;
    return (
        <View>
            <ScrollView contentContainerStyle={props.style}>

                <CountryPicker
                    theme={DEFAULT_THEME}
                    {...{
                        country,
                        countryCode,
                        withFilter,
                        // excludeCountries: ['FR'],
                        withFlag,
                        // withCurrencyButton,
                        // withCallingCodeButton,
                        withCountryNameButton,
                        withAlphaFilter,
                        withCallingCode,
                        // withCurrency,
                        withEmoji,
                        withModal,
                        withFlagButton,
                        onSelect,
                        // disableNativeModal,
                        preferredCountries: ['GB'],
                        modalProps: {
                            visible,
                        },
                        onClose: () => {
                            setVisible(false)
                            onBlur()
                        },
                        onOpen: () => {
                            setVisible(true)
                            // setCountryCode()
                        },
                    }
                    }
                />
            </ScrollView>

        </View>
    )
}

export default MyCountryPicker;

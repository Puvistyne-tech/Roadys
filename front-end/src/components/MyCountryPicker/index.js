import React, {useEffect, useState} from 'react';
import {PixelRatio, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import CountryPicker, {DARK_THEME, DEFAULT_THEME} from 'react-native-country-picker-modal'
import Button from "../Button";
import {capitalizeFirstLetter} from "../../utils/funcs";
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
                {/*<Text style={styles.welcome}>Welcome to Country Picker !</Text>*/}
                {/*<Option*/}
                {/*    title='With country name on button'*/}
                {/*    value={withCountryNameButton}*/}
                {/*    onValueChange={setWithCountryNameButton}*/}
                {/*/>*/}
                {/*<Option*/}
                {/*    title='With flag'*/}
                {/*    value={withFlag}*/}
                {/*    onValueChange={setWithFlag}*/}
                {/*/>*/}
                {/*<Option*/}
                {/*    title='With font scaling'*/}
                {/*    value={fontScaling}*/}
                {/*    onValueChange={setFontScaling}*/}
                {/*/>*/}
                {/*<Option*/}
                {/*    title='With emoji'*/}
                {/*    value={withEmoji}*/}
                {/*    onValueChange={setWithEmoji}*/}
                {/*/>*/}
                {/*<Option*/}
                {/*    title='With filter'*/}
                {/*    value={withFilter}*/}
                {/*    onValueChange={setWithFilter}*/}
                {/*/>*/}
                {/*<Option*/}
                {/*    title='With calling code'*/}
                {/*    value={withCallingCode}*/}
                {/*    onValueChange={setWithCallingCode}*/}
                {/*/>*/}
                {/*<Option*/}
                {/*    title='With alpha filter code'*/}
                {/*    value={withAlphaFilter}*/}
                {/*    onValueChange={setWithAlphaFilter}*/}
                {/*/>*/}
                {/*<Option*/}
                {/*    title='Without native modal'*/}
                {/*    value={true}*/}
                {/*    onValueChange={()=>{}}*/}
                {/*/>*/}
                {/*<Option*/}
                {/*    title='With modal'*/}
                {/*    value={withModal}*/}
                {/*    onValueChange={setWithModal}*/}
                {/*/>*/}
                {/*<Option title='With dark theme' value={dark} onValueChange={setDark}/>*/}
                {/*<Option*/}
                {/*    title='With flag button'*/}
                {/*    value={withFlagButton}*/}
                {/*    onValueChange={setWithFlagButton}*/}
                {/*/>*/}
                {/*<TextInput*/}
                {/*    // onBlur={onBlur}*/}
                {/*    // onChangeText={onChange}*/}
                {/*    onPressIn={switchVisible}*/}
                {/*    // onPressOut={() => setIsPickerOpen(false)}*/}
                {/*    value={capitalizeFirstLetter(country?.name)}*/}
                {/*    style={[styles.input, {borderColor: errors?.test ? '#fc6d47' : '#c0cbd3'}]}*/}
                {/*>*/}
                {/*</TextInput>*/}

                <CountryPicker
                    theme={DEFAULT_THEME}
                    {...{
                        // allowFontScaling: fontScaling,
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
                {/*<Text style={styles.instructions}>Press on the flag to open modal</Text>*/}
                {/*<Button*/}
                {/*    title={'Open modal from outside using visible props'}*/}
                {/*    onPress={switchVisible}*/}
                {/*/>*/}
            </ScrollView>
            {/*{country !== null && (*/}
            {/*    <Text style={styles.data}>{JSON.stringify(country, null, 0)}</Text>*/}
            {/*    // <Text style={styles.data}>{country.name}</Text>*/}
            {/*)}*/}
        </View>
    )
}

export default MyCountryPicker;

import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {
    Modal,
    View,
    StyleSheet,
    Alert,
} from 'react-native';
import {Octicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import Button from '../../../components/Button';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Colors from "../../../theme/colors";
import AppStyles from '../../../../assets/styles/main.scss'


const HeaderRight = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const navigation = useNavigation();


    const onSearchPress = () => {
        Alert.alert('Coming soon', 'The search feature is not available yet');
    };

    const onHelpPress = () => {
        // Alert.alert('Coming soon', 'Help is not available yet');
        Alert.prompt(
            'Titles', 'Please enter your email address',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        console.log('Cancel Pressed');

                    }
                },
                {
                    text: 'Send',
                    onPress: (email) => {
                        console.log('Send Pressed', email);
                    }
                },
                {
                    text: 'OK',
                    onPress: (email) => {
                        console.log('Ok Pressed', email);
                    }
                }
            ],
            {
                type: 'email-address',
                cancelable: true,
                placeholder: 'Email Address'
            },
        );
    };


    return (

        <View style={{
            flexDirection: 'row',
            width: 60,
            justifyContent: 'space-between',
            marginRight: 10,
        }}>
            <Octicons name="search" size={24} color={'white'}
                      onPress={onSearchPress}
            />
            <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color={'white'}
                onPress={() => setModalOpen(true)}
            />
            <Modal
                visible={modalOpen}
                transparent={false}
                animationType='slide'
                presentationStyle={"formSheet"}
            >
                <MaterialIcons
                    name="close"
                    size={22}
                    color={'white'}
                    style={styles.modalToggle}
                    onPress={() => setModalOpen(false)}
                />
                <View style={styles.modalContent}>
                    <Button
                        style={AppStyles.button}
                        title="Settings"
                        onPress={() => {
                            setModalOpen(false);
                            navigation.navigate("Settings");
                        }}
                    />
                    <Button
                        style={AppStyles.button}
                        title="Help"
                        onPress={onHelpPress}
                    />

                    <Button
                        style={AppStyles.button}
                        title="Make a feedback"
                        onPress={() => {
                            setModalOpen(false);
                            navigation.navigate("Feedback");
                        }}
                    />
                    <Button
                        style={AppStyles.button}
                        color={"#121212"}
                        title="About Roadys"
                        onPress={() => {
                            setModalOpen(false);
                            navigation.navigate("About Roadys");
                        }}
                    />
                    <Button
                        style={AppStyles.button}
                        color={"#121212"}
                        title="Terms And Conditions"
                        onPress={() => {
                            setModalOpen(false);
                            navigation.navigate("TermsAndConditions");
                        }}
                    />

                </View>
            </Modal>

        </View>
    );
}

export default HeaderRight;

const styles = StyleSheet.create({
    modalToggle: {
        marginTop: 20,
        color: 'white',
        backgroundColor: Colors.light.tint,
        padding: 8,
        borderColor: "#121212",
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalContent: {
        display: 'flex',
        flexWrap: "wrap",
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'stretch',
        // backgroundColor: "#121212",
        height: "80%"

    }

})

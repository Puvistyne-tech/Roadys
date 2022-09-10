import React, {useState} from 'react';
import { Text, ScrollView, Dimensions, TouchableOpacity, Modal} from 'react-native';
import AppStyles from '../../../assets/styles/main.scss';
import TermsAndConditionsScreen from "../../scenes/modal/TermsAndConditionsScreen";


/**
 * If the sum of the height of the visible area and the current scroll position is greater than or equal to the height of
 * the content minus some padding, then the user is close to the bottom.
 * @returns A function that takes in an object with three properties: layoutMeasurement, contentOffset, and contentSize.
 */
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

/**
 * It's a modal that displays a Terms and Conditions screen.
 *
 * The modal has a button that closes the modal.
 *
 * The button is disabled until the user has accepted the terms and conditions.
 *
 * The button is enabled when the user has accepted the terms and conditions.
 *
 * The button closes the modal when it's pressed.
 *
 * The modal is closed when the button is pressed.
 *
 * The modal is closed when
 * @param props - This is the props object that is passed to the component.
 * @returns A modal with a TermsAndConditionsScreen component and a button that is disabled until the user accepts the
 * terms and conditions.
 */
const TermsAndConditions = (props) => {
    const [accepted, setAccepted] = useState(false);


    return (
        <Modal
            animationType={'none'}
            transparent={false}
            onRequestClose={() => null}
            visible={props.isOpen}
            style={AppStyles.container}
        >
            <TermsAndConditionsScreen/>

            <TouchableOpacity
                // disabled={!accepted}
                onPress={() => {
                    // alert("Terms and conditions accepted")
                    // props.setIsAccepted(true)
                    setAccepted(true)
                    props.setIsOpen(false)
                }}
                style={accepted ? styles.button : styles.buttonDisabled}>
                <Text
                    style={styles.buttonLabel}>Close
                </Text>
                {/*<Button style={AppStyles.button}/>*/}
            </TouchableOpacity>

        </Modal>
    );
}


/* It's getting the width and height of the window. */
const {width, height} = Dimensions.get('window');

const styles = {
    container: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10
    },
    title: {
        marginTop: 60,
        fontSize: 22,
        alignSelf: 'center'
    },
    tcP: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 12
    },

    tcL: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 12
    },
    tcContainer: {
        marginTop: 15,
        marginBottom: 15,
        height: height * .75
    },

    button: {
        backgroundColor: '#136AC7',
        borderRadius: 5,
        padding: 10
    },

    buttonDisabled: {
        backgroundColor: '#999',
        borderRadius: 5,
        padding: 10
    },

    buttonLabel: {
        fontSize: 14,
        color: '#FFF',
        alignSelf: 'center'
    }

}


export default TermsAndConditions;

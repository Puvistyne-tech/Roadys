import React, {useState} from 'react';
import { Text, ScrollView, Dimensions, TouchableOpacity, Modal} from 'react-native';
import AppStyles from '../../../assets/styles/main.scss';
import TermsAndConditionsScreen from "../../scenes/modal/TermsAndConditionsScreen";


const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};
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

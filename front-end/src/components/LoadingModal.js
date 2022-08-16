import React from 'react';

import {View, StyleSheet, ActivityIndicator, Modal, Text} from "react-native";

const LoadingModal = ({loading, text}) => {

    return (
        <Modal
            animationType={'fade'}
            // presentationStyle={'formSheet'}
            transparent={true}
            onRequestClose={() =>
                console.log('Modal has been closed.')
            }
            onDismiss={() =>
                console.log('Modal has been dismissed.')
            }
            visible={loading}
        >
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
            >
                <View style={styles.model}>
                    <Text style={styles.text}>
                        {text || "Loading"}
                    </Text>
                    <ActivityIndicator size="large" color={"#7e7b7b"}/>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    model: {
        borderRadius: 10,
        backgroundColor: '#dedede',
        padding: 25,
        opacity: .8,

    },
    text: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        fontSize: 20,
        fontWeight: '200'
    }
});

export default LoadingModal;

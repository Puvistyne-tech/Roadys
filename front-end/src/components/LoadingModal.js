import React from 'react';

import {View, StyleSheet, ActivityIndicator, Modal, Text} from "react-native";

const LoadingModal = ({loading}) => {

   return (

      <Modal
         animationType={'slide'}
         transparent={true}
         onRequestClose={() => null}
         visible={loading}
      >
         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.model}>
               <Text style={styles.text}>Loading</Text>
               <ActivityIndicator size="large" color={"#7e7b7b"}/>
            </View>
         </View>
      </Modal>

   );

}

const styles = StyleSheet.create({
   model: {
      borderRadius: 10,
      backgroundColor: 'white',
      padding: 25
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

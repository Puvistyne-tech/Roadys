import React, {useState} from 'react';
import {Modal, View, StyleSheet, Alert} from 'react-native';
import {Octicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import Colors from "../../../theme/colors";
import Constants from "expo-constants";


const style = StyleSheet.create({
   modalToggle: {
      marginTop: 30,
      color: 'white',
      backgroundColor: Colors.light.tint,
      padding: 10,
      borderRadius: 10,
      alignSelf: 'center',
   },
})

function HeaderRight() {
   const [modalOpen, setModalOpen] = useState(false);
   const navigation = useNavigation();

   const onSearchPress = () => {
      Alert.alert('Coming soon', 'The search feature is not available yet');
   };

   const onHelpPress = () => {
      Alert.alert('Coming soon', 'Help is not available yet');
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
         <MaterialCommunityIcons name="dots-vertical" size={24} color={'white'} onPress={() => setModalOpen(true)}/>
         <Modal
            visible={modalOpen}
            transparent={false}
            animationType='slide'
            presentationStyle={"formSheet"}
         >

            <View style={style.modalContent}>
               <MaterialIcons
                  name="close"
                  size={22}
                  color={'white'}
                  style={style.modalToggle}
                  onPress={() => setModalOpen(false)}/>
               <Button
                  style={styles.button}
                  title="Settings"
                  onPress={() => {
                     setModalOpen(false);
                     navigation.navigate("Settings");
                  }}
               />
               <Button
                  style={styles.button}
                  title="Help"
                  onPress={onHelpPress}
               />

               <Button
                  style={styles.button}
                  title="Make a feedback"
                  onPress={() => {
                     setModalOpen(false);
                     navigation.navigate("Feedback");
                  }}
               />
               <Button
                  style={styles.button}
                  title="About Roadys"
                  onPress={() => {
                     setModalOpen(false);
                     navigation.navigate("About Roadys");
                  }}
               />
            </View>
         </Modal>

      </View>
   );
}

export default HeaderRight;


const styles = StyleSheet.create({

   button: {
      backgroundColor: '#c5c3c3',
      paddingTop: 20,
      paddingBottom: 20,
      margin: 5
   }
});

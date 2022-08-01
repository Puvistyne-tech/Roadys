import * as React from 'react';
import {
   View,
   Text,
   StyleSheet,
   // Button
} from 'react-native';
import Constants from 'expo-constants';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/Button';
import AppStyles from '../../../../assets/styles/main.scss'

const SettingsScreen = () => {
   const navigation = useNavigation();

   const onEditProfilePress = () => {
      navigation.navigate('Profile')
   }

   const onSendFeedbackPress = () => {
      navigation.navigate('Feedback')
   }

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Settings</Text>
         <Text style={styles.input}>You have the default settings applied.{"\n"}{"\n"}
            You will be soon able to personalize your settings.{"\n"}{"\n"}
            You can already edit your profile and disable the localisation feature.{"\n"}{"\n"}
            You can also send us a feedback to help us to improve the app.
         </Text>
         <Button
            style={AppStyles.button}
            title="Edit Profile"
            onPress={onEditProfilePress}
         />
         <Button
            title="Send a feedback"
            style={AppStyles.button}
            onPress={onSendFeedbackPress}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: 'white',
   },
   title: {
      fontSize: 30,
      fontWeight: 'bold',
      fontStyle: "italic",
      marginBottom: 15,
      marginLeft: 120,
   },
   input: {
      fontSize: 18,
      marginHorizontal: 25,
      marginTop: 5,
      marginBottom: 8,
      paddingVertical: 10,
   },
   button: {
      backgroundColor: '#9f3e3e',
      paddingTop: 20,
      paddingBottom: 20,
      margin: 5
   }
});

export default SettingsScreen;

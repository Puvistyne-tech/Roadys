import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: 'white',
    },
    formContainer: {
      padding: 8,
      flex: 1,
    },
    inputContainer: {
      marginVertical: 8,
    },
    input: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 5,
      paddingVertical: 5,
      paddingLeft: 5,
      fontSize: 16,
      height: 40,
    },
    feedback: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 5,
      paddingVertical: 5,
      paddingLeft: 5,
      fontSize: 16,
      height: 120,
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
    button: {
      marginTop: 10,
      marginBottom: 30,
      marginRight: 50,
      marginLeft: 50,
      paddingVertical: 15,
      borderRadius: 30,
    },
  });
  
export default styles
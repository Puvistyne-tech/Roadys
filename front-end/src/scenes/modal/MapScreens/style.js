import { StyleSheet, Dimensions } from 'react-native';
import Colors from "../../../theme/colors";

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
   },
   userMarker: {
      width: 50,
      height: 50,
   },
   markerCardContainer: {
      alignItems: 'center',
   },
   markerCardTextContainer: {
      backgroundColor: 'white',
      borderRadius: 20,
      //    height: 115,
      height: 180,
      //    width: 100,
      width: 130,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
         width: 5,
         height: 5,
      },
      shadowOpacity: 0.75,
      shadowRadius: 5,
      elevation: 9,
   },
   title: {
      fontWeight: 'bold',
   },
   avatar: {
      width: 120,
      height: 80,
      borderRadius: 20,
      marginTop: 5,
      marginBottom: 5,
   },
   currentUserMaker: {
      width: 62,
      height: 62,
   },
   icon: {
      marginRight: 5,
   },
   button: {
      backgroundColor: Colors.light.tint,
      width: 120,
      height: 30,
      marginTop: 5,
      marginBottom: 0,
      marginRight: 0,
      marginLeft: 0,
      paddingVertical: 0,
      paddingHorizontal: 0,
      borderRadius: 30,
      justifyContent: 'center',
   },
   text: {
      textAlign: 'center',
      fontSize: 8,
   },
});

export default styles;

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      width: "100%",
      justifyContent: 'space-between',
      padding: 16,
   },
   leftContainer: {
      flexDirection: 'row',
   },
   midContainer: {
      justifyContent: 'space-between',
      marginTop: 12,
   },
   title: {
      fontSize: 20,
      fontWeight: 'bold',
   },
   icon: {
      marginRight: 20,
   }
});

export default styles;

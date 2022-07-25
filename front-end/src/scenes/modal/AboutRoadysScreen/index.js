import React from 'react';
import { Image, View, Linking, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Constants from 'expo-constants';
import Button from '../../../components/Button';

const AboutRoadysScreen = () => {

  const onMoreInfosPress = () => {

    return Alert.alert(
      "Not too fast !",
      "You will leave the app to go to our website",
      [{  text:"Yes",
          onPress: () => {
            Linking.openURL('https://roadys.fr');
          },
        },
        { text: "No" },
      ]   
    )};

    return (
      <View style={styles.container}>
            <Text style={styles.title}>Meet Roadys</Text>
            <Image source={{ uri: "https://www.roadys.fr/wp-content/uploads/2022/03/WhatsApp-Image-2021-07-26-at-09.57.27.jpeg" }} style={styles.image} />
            <Text style={styles.input}>Our mission is to promote alternative ways of traveling to mass tourism, such as bike, bikepacking or train.{"\n"}{"\n"}

                  With Roadys, you can meet travelers, share the road, and make unforgettable memories !{"\n"}{"\n"}

                  Because you’ve never been alone !
            </Text>
            <Button title="More infos on our website" onPress={onMoreInfosPress} style={styles.button} />
      </View>
    );
  }
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: 'white',
    },
    button: {
      marginTop: 5,
      marginBottom: 30,
      marginRight: 50,
      marginLeft: 50,
      paddingVertical: 10,
      borderRadius: 30,
    },
    input: {
      fontSize: 18,
      marginHorizontal: 25,
      marginTop: 5,
      marginBottom: 8,
      paddingVertical: 10,
    },    
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      fontStyle: "italic",
      marginBottom: 15,
      marginLeft: 90,
    },
    image: {
      width: "90%",
      height: "40%",
      marginLeft: 18,
      paddingTop: Constants.statusBarHeight,
      backgroundColor: 'white',
      borderRadius: 30,
      marginBottom: 5,
},
})

export default AboutRoadysScreen;
  
import React from 'react'
import {
   StyleSheet, Text, View, ActivityIndicator,
} from 'react-native'
import {Card} from "react-native-elements";


const MarkerCard = ({elem}) => {

   console.log(elem.photo)

   return (
      <>
         <View
            style={styles.card}
         >
            <Card.Image
               style={styles.cardImage}
               source={{uri: elem.photo}}
               PlaceholderContent={<ActivityIndicator/>}
            />
            <View
               style={styles.cardSeparator}
            />
            <View
               style={styles.cardRightSide}
            >
               <Card.Title>{elem.pseudo}</Card.Title>
               <Text
                  style={styles.cardText}
               >{elem.age}</Text>
               <Text>{elem.nationality}</Text>
            </View>
         </View>
      </>
   )
}

const styles = StyleSheet.create({
   cardText: {
      alignContent: "center",
      textAlign: "center"
   },
   cardSeparator: {
      justifyContent: "center",
      height: 100,
      width: 'auto',
      margin: 5,
      padding: 5,
      // backgroundColor:"#dede53"

   },
   cardImage: {
      borderWidth: 1,
      height: 80,
      width: 1,
      maxWidth: 1,
      margin: 10,
      borderColor: "#bbbbbb"
   },
   cardRightSide: {
      flexDirection: "column",
      // borderWidth: 4,
      borderColor: "#32b968",
      borderRadius: 30,
      height: 60,
      width: 60
   },
   card: {
      display: 'flex',
      flexDirection: "row",
      justifyContent: 'flex-start',
      alignItems: "center",

      backgroundColor: "#ffffff",
      height: 100,
      padding: 10,
      borderRadius: 10,
      borderColor: "#7dce9a",
      borderWidth: 2,
      shadowColor: "#606060",
      shadowOpacity: 0.8,
      // shadowOffset: {
      //    width: 0,
      //    height: 2,
      // },
      // shadowRadius: 4,
      // elevation: 5,
   }
})

export default MarkerCard

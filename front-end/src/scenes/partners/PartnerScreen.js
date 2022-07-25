import React from 'react';
import {ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {MaterialCommunityIcons, Fontisto, FontAwesome, MaterialIcons, Ionicons, Entypo} from '@expo/vector-icons';
import styles from './style';


const PartnerScreen = () => {
   const color = '#2986cc';
   const size = 40;
   const navigation = useNavigation();

   const onClickMuseum = () => {
      navigation.navigate('MUSEUMS')
   }
   const onClickBike = () => {
      navigation.navigate('BIKE_REPAIR')
   }

   return (
      <ScrollView>
         <TouchableWithoutFeedback onPress={onClickMuseum}>
            <View style={styles.container}>
               <View style={styles.leftContainer}>
                  <FontAwesome name="hotel" color={color} size={size} style={styles.icon}/>
                  <View style={styles.midContainer}>
                     <Text style={styles.title}>Hostels and housing</Text>
                  </View>
               </View>
            </View>
         </TouchableWithoutFeedback>

         <TouchableWithoutFeedback onPress={onClickMuseum}>
            <View style={styles.container}>
               <View style={styles.leftContainer}>
                  <Fontisto name="world-o" color={color} size={size} style={styles.icon}/>
                  <View style={styles.midContainer}>
                     <Text style={styles.title}>Travel stores</Text>
                  </View>
               </View>
            </View>
         </TouchableWithoutFeedback>

         <TouchableWithoutFeedback onPress={onClickMuseum}>
            <View style={styles.container}>
               <View style={styles.leftContainer}>
                  <Ionicons name="restaurant" color={color} size={size} style={styles.icon}/>
                  <View style={styles.midContainer}>
                     <Text style={styles.title}>Restaurants</Text>
                  </View>
               </View>
            </View>
         </TouchableWithoutFeedback>

         <TouchableWithoutFeedback onPress={onClickMuseum}>
            <View style={styles.container}>
               <View style={styles.leftContainer}>
                  <Entypo name="drink" color={color} size={size} style={styles.icon}/>
                  <View style={styles.midContainer}>
                     <Text style={styles.title}>Drinks</Text>
                  </View>
               </View>
            </View>
         </TouchableWithoutFeedback>

         <TouchableWithoutFeedback onPress={onClickBike}>
            <View style={styles.container}>
               <View style={styles.leftContainer}>
                  <MaterialCommunityIcons name="bike" color={color} size={size} style={styles.icon}/>
                  <View style={styles.midContainer}>
                     <Text style={styles.title}>Bike repair</Text>
                  </View>
               </View>
            </View>
         </TouchableWithoutFeedback>

         <TouchableWithoutFeedback onPress={onClickMuseum}>
            <View style={styles.container}>
               <View style={styles.leftContainer}>
                  <MaterialIcons name="nightlife" color={color} size={size} style={styles.icon}/>
                  <View style={styles.midContainer}>
                     <Text style={styles.title}>Clubs</Text>
                  </View>
               </View>
            </View>
         </TouchableWithoutFeedback>

         <TouchableWithoutFeedback onPress={onClickMuseum}>
            <View style={styles.container}>
               <View style={styles.leftContainer}>
                  <MaterialIcons name="museum" color={color} size={size} style={styles.icon}/>
                  <View style={styles.midContainer}>
                     <Text style={styles.title}>Museums and culture</Text>
                  </View>
               </View>
            </View>
         </TouchableWithoutFeedback>

         <TouchableWithoutFeedback onPress={onClickMuseum}>
            <View style={styles.container}>
               <View style={styles.leftContainer}>
                  <Entypo name="address" color={color} size={size} style={styles.icon}/>
                  <View style={styles.midContainer}>
                     <Text style={styles.title}>Popular places</Text>
                  </View>
               </View>
            </View>
         </TouchableWithoutFeedback>

         <TouchableWithoutFeedback onPress={onClickMuseum}>
            <View style={styles.container}>
               <View style={styles.leftContainer}>
                  <Entypo name="compass" color={color} size={size} style={styles.icon}/>
                  <View style={styles.midContainer}>
                     <Text style={styles.title}>Other partners</Text>
                  </View>
               </View>
            </View>
         </TouchableWithoutFeedback>

      </ScrollView>
   );
}

export default PartnerScreen
;

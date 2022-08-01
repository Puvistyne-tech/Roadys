import * as React from 'react';
import MapView, { Callout, Marker, Circle } from 'react-native-maps';
import { Text, View, Image } from 'react-native';
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import { useEffect, useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-elements';
import StickManImg from '../../../../assets/images/man.png';
import { Button } from 'react-native-elements';


export default function BikeScreen() {
   const color = '#2986cc';
   const size = 40 ;

   const [defaultLocation] = useState({
      latitude: 48.86,
      longitude: 2.34,
      latitudeDelta: 0.45,
      longitudeDelta: 0.45,
   })

   const [location, setLocation] = useState({ coords: defaultLocation })
   const [isPressed, setIsPressed] = useState(false);

   const { theme } = useTheme();

   const MarkerCard = useCallback(({elem})=>{
      return (
         <View style={styles.markerCardContainer}>
            <View style={styles.markerCardTextContainer}>
               <Text style={styles.title}>{elem.firstname}</Text>
               <Text>{elem.age}</Text>
               <Text>{elem.nationality}</Text>
            </View>
            <Image style={styles.marker} source={StickManImg}/>
         </View>
      );
   }, []);


   return (
      <View style={styles.container}>
         <MapView style={styles.map} initialRegion={defaultLocation}>
            <Circle center={{latitude: 49, longitude: 2.32}} radius={8} strokeWidth={0} strokeColor={'rgba(143,0,255,0.26)'} fillColor={'rgbargba(143,0,255,0.26)'}/>

            <Marker
               coordinate={{latitude: 48.81, longitude: 2.338}}
               title={"Decathlon"}
               description={"Bike repair"}
            >
               <MaterialCommunityIcons name="bike" color={'blue'} size={size} style={styles.icon} />
            </Marker>

            <Marker
               coordinate={{latitude: 48.85, longitude: 2.28}}
               title={"Bike Master"}
               description={"Bike repair"}
            >
               <MaterialCommunityIcons name="bike" color={'blue'} size={size} style={styles.icon} />
            </Marker>

            <Marker
               coordinate={{latitude: 48.7, longitude: 2.33}}
               title={"Byciclou"}
               description={"Bike Repair"}
            >
               <MaterialCommunityIcons name="bike" color={'blue'} size={size} style={styles.icon} />
            </Marker>

            <Marker
               coordinate={{latitude: 48.78, longitude: 2.45}}
               title={"Vélo Repare"}
               description={"Bike Repair"}
            >
               <MaterialCommunityIcons name="bike" color={'blue'} size={size} style={styles.icon} />
            </Marker>

            <Marker
               coordinate={{latitude: 48.98, longitude: 2.15}}
               title={"Atelier VTT"}
               description={"Bike Repair"}
            >
               <MaterialCommunityIcons name="bike" color={'blue'} size={size} style={styles.icon} />
            </Marker>

         </MapView>
      </View>
   )
}

Map.propTypes = {
   navigation: PropTypes.shape({
      navigate: PropTypes.func,
   }),
}

Map.defaultProps = {
   navigation: { navigate: () => null },
}

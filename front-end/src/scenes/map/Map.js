import React, {
   useEffect, useState, useMemo, useCallback,
} from 'react'
import PropTypes from 'prop-types'
import {
   View, Text, Image, ActivityIndicator,
} from 'react-native'
import MapView, {Marker, Circle} from 'react-native-maps'
import * as Location from 'expo-location'
import {
   useQuery, useMutation,
} from '@apollo/client'
import {useNavigation} from '@react-navigation/native'
import {useTheme, Button, Card} from 'react-native-elements'

import Appstyles from '../../../assets/styles/main.scss'
import StickManImg from '../../../assets/images/man.png'
import CurrentUserStickMan from '../../../assets/images/current-stick-man.png'
import Loader from '../../components/Loader'


import {GET_USERS, UPDATE_LOCATION} from './queries'
import styles from './style'
import ProfileCard from "../../components/ProfileCard";
// import MarkerCard from "./card/MakerCard";

//TODO ma propre card avec MODEL
// import MarkerCard from './card/MakerCard'

const Map = () => {
   const [defaultLocation] = useState({
      latitude: 48.86,
      longitude: 2.34,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
   })

   const [location, setLocation] = useState({coords: defaultLocation})
   const [loading, setLoading] = useState(true)
   const [errorMsg, setErrorMsg] = useState()
   const [isPressed, setIsPressed] = useState(false)
   const [idUserPressed, setIdUserPressed] = useState()
   const {theme} = useTheme()

   const {data, refetch} = useQuery(GET_USERS, {variables: {excludeCurrentUser: true}})
   const [mutateUpdateLocation, {
      data: updateLocationData,
      loading: updateLocationLoading,
      error: updateLocationError,
   }] = useMutation(UPDATE_LOCATION)

   const onLocationChange = useCallback((newLocation) => {
      const {longitude, latitude} = newLocation.coords
      refetch()
      setLocation(newLocation)
      mutateUpdateLocation({variables: {longitude, latitude}})
   }, [refetch])

   useEffect(() => {
      (async () => {
         setLoading(true)
         const {status} = await Location.requestForegroundPermissionsAsync()
         if (status !== 'granted') {
            setLoading(false)
            setErrorMsg('Permission to access location was denied')
            return
         }
         setLoading(false)
         await Location.watchPositionAsync({accuracy: 3, distanceInterval: 1, timeInterval: 1000}, onLocationChange)
      })()
   }, [refetch])

   // const MarkerCard = useCallback(({ elem }) => {
   //
   //       const navigation = useNavigation()
   //       return (
   //          // <View>
   //          //    <Image style={styles.marker} source={StickManImg} />
   //          <View style={styles.markerCardContainer}>
   //             <View style={styles.markerCardTextContainer}>
   //                <Text style={styles.title}>{elem.pseudo}</Text>
   //                <Text>{elem.age}</Text>
   //                <Text>{elem.nationality}</Text>
   //                <Button style={styles.button}
   //                        title='Profile'
   //                        onPress={() => {
   //                           console.log('taped')
   //                           navigation.navigate('USER_PROFILE_SCREEN', { id: idUserPressed })
   //                        }}
   //                />
   //             </View>
   //          </View>
   //          // </View>
   //       )
   //    }, [],
   // )

   const MarkerCard = useCallback(({elem}) => {

      // <ProfileCard id={elem?.id}/>
      // console.log(elem.photo)

      return (

         <>
            <View
               style={{
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
                  shadowColor:"#606060",
                  shadowOpacity:0.8
               }}
            >
               <Card.Image
                  style={{
                     flexDirection: "column",
                     // borderWidth: 4,
                     borderColor: "#32b968",
                     borderRadius: 30,
                     height: 60,
                     width: 60

                  }}
                  source={{uri: elem?.photo}}
                  PlaceholderContent={<ActivityIndicator/>}
               />
               <View
                  style={{
                     borderWidth: 1,
                     height:80,
                     width:1,
                     maxWidth:1,
                     margin:10,
                     borderColor: "#bbbbbb"
                  }}
               />
               <View
                  style={{
                     justifyContent: "center",
                     height: 100,
                     width:'auto',
                     margin:5,
                     padding:5,
                     // backgroundColor:"#dede53"
                  }}
               >
                  <Card.Title>{elem.pseudo}</Card.Title>
                  <Text
                     style={{
                        alignContent:"center",
                        textAlign:"center"
                     }}
                  >{elem.age}</Text>
                  <Text>{elem.nationality}</Text>
               </View>
            </View>
         </>
      )
   }, [])

   const MarkerActions = useCallback(() => {
      const navigation = useNavigation()
      return (
         <View>
            <Button title='Voir le profil'
                    onPress={() => navigation.navigate('USER_PROFILE_SCREEN', {id: idUserPressed})}/>
         </View>
      )
   }, [idUserPressed])

   const CustomMarker = useCallback(({elem}) => (


      <Marker
         coordinate={{latitude: elem.latitude, longitude: elem.longitude}}
         onPress={() => {
            setIsPressed(!isPressed)
            setIdUserPressed(elem.id)
         }}

      >
         <View
            style={{
               display: 'flex',
               alignItems: "center"
            }}
         >

            {/*{isPressed && idUserPressed === elem.id && <MarkerCard elem={elem} idUserPressed={idUserPressed} />*/}
            {isPressed && idUserPressed === elem.id && <MarkerCard elem={elem}/>
               // :
               // <></>
               // <Image style={Appstyles.marker} source={StickManImg} />
            }
            <Image style={Appstyles.userMarker} source={StickManImg}/>
         </View>
      </Marker>

   ), [isPressed, idUserPressed])

   const ListUsers = useMemo(() => data?.users?.map((elem, index) => {
      if (!elem.isVisibled) {
         return (
            <CustomMarker
               key={index}
               elem={elem}
            />)
      } else return <></>
   }), [data, CustomMarker])

   const userMarker = useMemo(
      () => ({
         coordinate: {
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
         },
         title: 'Moi',
      }),
      [location],
   )
   if (errorMsg) {
      return (
         <View style={Appstyles.container}>
            <Text style={Appstyles.paragraph}>{errorMsg}</Text>
         </View>
      )
   }
   if (loading) {
      return (
         <Loader/>
      )
   }

   return (
      <View style={Appstyles.container}>
         <View style={theme.ActionsContainer}>
            {isPressed && <MarkerActions/>}
         </View>
         <MapView
            style={Appstyles.map}
            initialRegion={defaultLocation}
            // onPress={() => {
            //    console.log('taped hereeee')
            //    setIsPressed(false)
            // }}
         >
            <Circle
               center={userMarker.coordinate}
               radius={10}
               strokeWidth={0}
               strokeColor='rgba(143,0,255,0.26)'
               fillColor='rgbargba(143,0,255,0.26)'
            />

            <Marker
               coordinate={userMarker.coordinate}
            >
               <Image style={Appstyles.currentUserMaker} source={CurrentUserStickMan}/>
            </Marker>
            {ListUsers}
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
   navigation: {navigate: () => null},
}

export default Map

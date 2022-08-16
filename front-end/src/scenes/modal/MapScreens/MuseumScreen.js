import * as React from 'react';
import MapView, {Callout, Marker, Circle} from 'react-native-maps';
import {Text, View, Image, TextInput} from 'react-native';
import styles from './style';
import {FontAwesome, MaterialIcons} from '@expo/vector-icons';


import {useEffect, useState, useMemo, useCallback} from 'react'
import PropTypes from 'prop-types'
import * as Location from 'expo-location'
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-elements';
import StickManImg from '../../../../assets/images/man.png';
import {Button} from 'react-native-elements';
import MySearchBar from "../../../components/MySearchBar";


export default function MuseumScreen() {
    const size = 40;

    const [defaultLocation] = useState({
        latitude: 48.86,
        longitude: 2.34,
        latitudeDelta: 0.45,
        longitudeDelta: 0.45,
    })

    const [location, setLocation] = useState({coords: defaultLocation})
    const [isPressed, setIsPressed] = useState(false);

    const {theme} = useTheme();

    const MarkerCard = useCallback(({elem}) => {
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
                <Circle center={{latitude: 49, longitude: 2.32}} radius={8} strokeWidth={0}
                        strokeColor={'rgba(143,0,255,0.26)'} fillColor={'rgbargba(143,0,255,0.26)'}/>

                <Marker
                    coordinate={{latitude: 48.7, longitude: 2.323}}
                    title={"Monet Museum"}
                    description={"Classic painting"}
                >
                    <MaterialIcons name="museum" color={'blue'} size={size} style={styles.icon}/>
                </Marker>

                <Marker
                    coordinate={{latitude: 48.93, longitude: 2.205}}
                    title={"Rodin Museum"}
                    description={"sculpture Museum"}
                >
                    <MaterialIcons name="museum" color={'blue'} size={size} style={styles.icon}/>
                </Marker>

                <Marker
                    coordinate={{latitude: 48.9, longitude: 2.32}}
                    title={"Parfum Museum"}
                    description={"Parfum exposition"}
                >
                    <MaterialIcons name="museum" color={'blue'} size={size} style={styles.icon}/>
                </Marker>

                <Marker
                    coordinate={{latitude: 48.85, longitude: 2.5}}
                    title={"Jacquemart-Andre Museum"}
                    description={"Paintings and sculptures"}
                >
                    <MaterialIcons name="museum" color={'blue'} size={size} style={styles.icon}/>
                </Marker>

                <Marker
                    coordinate={{latitude: 48.85, longitude: 2.3}}
                    title={"Louvre"}
                    description={"Classic art"}
                >
                    <MaterialIcons name="museum" color={'blue'} size={size} style={styles.icon}/>
                </Marker>

            </MapView>
            <MySearchBar
                isPressed={isPressed}
                setIsPressed={setIsPressed}
                // onChangeText={handleSearch}
            />
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

import React, {
    useEffect, useState, useMemo, useCallback,
} from 'react'
import PropTypes from 'prop-types'
import {
    View, Text, Image, ActivityIndicator, TextInput,
} from 'react-native'
import MapView, {Marker, Circle} from 'react-native-maps'
import * as Location from 'expo-location'
import {
    useQuery, useMutation,
} from '@apollo/client'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import {useTheme, Card} from 'react-native-elements'

import AppStyles from '../../../assets/styles/main.scss'
import StickManImg from '../../../assets/images/man.png'
import CurrentUserStickMan from '../../../assets/images/current-stick-man.png'
import Loader from '../../components/Loader'

import {GET_CURRENT_USER, GET_USERS, UPDATE_LOCATION} from './queries'
import Button from "../../components/Button";
import MoreCriteriaScreen from "../modal/MoreCriteriaScreen";



const Map = () => {
    const [defaultLocation, setDefaultLocation] = useState({
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

    const [listUsers, setListUsers] = useState(<></>);


    const {data, refetch} = useQuery(GET_USERS, {variables: {excludeCurrentUser: true}})
    const [mutateUpdateLocation, {
        data: updateLocationData,
        loading: updateLocationLoading,
        error: updateLocationError,
    }] = useMutation(UPDATE_LOCATION)

    const {data:userData, refetch:refetch2, error} = useQuery(GET_CURRENT_USER);
    let currentUser = useMemo(() => userData?.currentUser, [userData])

    useFocusEffect(
        React.useCallback(() => {
            refetch2().then(r => {
                // console.log(r)
            })
        }, [refetch2])
    );

    useEffect(() => {
        currentUser = userData?.currentUser
    }, [userData, currentUser]);

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


    const MarkerCard = useCallback(({elem}) => {

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
                        shadowColor: "#606060",
                        shadowOpacity: 0.8
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
                            height: 80,
                            width: 1,
                            maxWidth: 1,
                            margin: 10,
                            borderColor: "#bbbbbb"
                        }}
                    />
                    <View
                        style={{
                            justifyContent: "center",
                            height: 100,
                            width: 'auto',
                            margin: 5,
                            padding: 5,
                            // backgroundColor:"#dede53"
                        }}
                    >
                        <Card.Title>{elem.pseudo}</Card.Title>
                        <Text
                            style={{
                                alignContent: "center",
                                textAlign: "center"
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
                <Button
                    title='Visit Profile'
                    style={{
                        ...AppStyles.button,
                        // float: 'right',
                        // alignSelf: 'right',
                        // alignItems: 'right',
                        // justifyContent: 'right'
                        marginRight: -50
                    }}
                    onPress={() => navigation.navigate('USER_PROFILE_SCREEN', {id: idUserPressed})}/>
            </View>
        )
    }, [idUserPressed])

    const [filter, setFilter] = useState(
        {
            TransportType: "ALL",
            "nationality": "ALL",
            "sex": "ALL",
            age: [1, 99]
        }
    )


    const [isOpen, setIsOpen] = useState(false);

    const MoreCriteriaButton = useCallback(() => {
        const navigation = useNavigation()
        return (
            <View style={{
                flexDirection: 'row',
                width: '40%',
                marginLeft: 10,
            }}>
                <Button
                    title='Add Criteria'
                    style={{
                        ...AppStyles.button,
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                    }}
                    onPress={() => {
                        setIsOpen(true)
                    }}
                />
            </View>
        )
    }, [])

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
                    // <Image style={AppStyles.marker} source={StickManImg} />
                }
                <Image style={AppStyles.userMarker} source={StickManImg}/>
            </View>
        </Marker>

    ), [isPressed, idUserPressed])

    // let ListUserss = useMemo(() => data?.users?.map((elem, index) => {
    //     if (!elem.isVisibled) {
    //         return (
    //             <CustomMarker
    //                 key={index}
    //                 elem={elem}
    //             />)
    //     } else return <></>
    // }), [data, CustomMarker])

    const setUsersToCustomMarker = (userData) => {

        let r = userData?.map((elem, index) => {
            if (!elem.isVisibled) {
                return (
                    <CustomMarker
                        key={index}
                        elem={elem}
                    />)
            } else return <></>
        })

        setListUsers(r)
    }


    const filterUsers = () => {
        const res = data?.users
            .filter((elem) => {
                if (filter.TransportType === "ALL") {
                    return true
                } else return filter.TransportType === elem.kindOfTrip;
            })
            .filter((elem) => {
                if (filter.nationality === "ALL") {
                    return true
                } else return filter.nationality === elem.nationality;
            })
            .filter((elem) => {
                if (filter.sex === "ALL") {
                    return true
                } else return filter.sex === elem.sex;
            })
            .filter((elem) => {
                if (filter.age?.min === 1 && filter?.age?.max === 99) return true;
                else return elem.age >= filter?.age[0] && elem.age <= filter?.age[1];
            })


        setUsersToCustomMarker(res)
    }

    useEffect(() => {
        if (isFilterApplied()) {
            filterUsers()
            // filterByName(searchInput)
        } else {
            setUsersToCustomMarker(data?.users)
        }
        return () => {
            setListUsers(null)
        };
    }, [data, CustomMarker, filter, isOpen]);

    const isFilterApplied = () => {
        return filter.TransportType !== "ALL" ||
            filter.nationality !== "ALL" ||
            filter.sex !== "ALL" ||
            (filter.age[0] !== [1] && filter.age[1] !== 99)
    }

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
            <View style={AppStyles.container}>
                <Text style={AppStyles.paragraph}>{errorMsg}</Text>
            </View>
        )
    }
    if (loading) {
        return (
            <Loader/>
        )
    }


    return (
        <View style={AppStyles.container}>
            <MoreCriteriaScreen
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                filter={filter}
                setFilter={setFilter}
            />
            <View style={theme.ActionsContainer}>
                {isPressed && <MarkerActions/>}
            </View>
            {
                currentUser &&

                <MapView
                    style={AppStyles.map}
                    initialRegion={{
                        ...currentUser,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsScale={true}
                    zoomControlEnabled={false}
                    scrollDuringRotateOrZoomEnabled={false}
                    zoomTapEnabled={true}
                    zoomEnabled={true}
                    rotateEnabled={false}
                    maxZoomLevel={18}
                    minZoomLevel={0}
                    showsMyLocationButton={true}
                    showsCompass={true}
                    showsBuildings={true}
                    showsTraffic={true}
                    showsIndoors={true}
                    showsIndoorLevelPicker={true}
                    showsUserLocation={false}
                    showsPointsOfInterest={true}
                >
                    <MoreCriteriaButton/>
                    <Circle
                        center={userMarker.coordinate}
                        radius={500}
                        strokeWidth={0}
                        strokeColor='rgba(143,0,255,0.26)'
                        fillColor='rgbargba(143,0,255,0.26)'
                    />

                    <Marker
                        coordinate={userMarker.coordinate}
                    >
                        <Image style={AppStyles.currentUserMaker} source={CurrentUserStickMan}/>
                    </Marker>
                    {listUsers}
                </MapView>
            }

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

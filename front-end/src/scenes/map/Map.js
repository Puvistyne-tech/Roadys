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
import {useNavigation} from '@react-navigation/native'
import {useTheme, Card} from 'react-native-elements'

import AppStyles from '../../../assets/styles/main.scss'
import StickManImg from '../../../assets/images/man.png'
import CurrentUserStickMan from '../../../assets/images/current-stick-man.png'
import Loader from '../../components/Loader'

import Ionicons from '@expo/vector-icons/Ionicons';


import {GET_USERS, UPDATE_LOCATION} from './queries'
import styles from './style'
import ProfileCard from "../../components/ProfileCard";
import Button from "../../components/Button";
import {FontAwesome} from "@expo/vector-icons";
import FontIcon from "react-native-vector-icons/FontAwesome5";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions";
import MoreCriteriaScreen from "../modal/MoreCriteriaScreen";
// import MarkerCard from "./card/MakerCard";


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

    const [listUsers, setListUsers] = useState(<></>);


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

    // console.log("----------filter.age")
    // console.log(filter)
    // useEffect(() => {
    //     console.log("-------------------------From Map S")
    //     // setFilter(filter)
    //     console.log("filter")
    //     console.log(filter)
    //     console.log("-------------------------From Map Z")
    // }, [filter]);

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
        // console.log("userData")
        // console.log(userData)
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
        // console.log(listUsers)
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


        // console.log(res)

        // if (name === '') {
        //     setUsersToCustomMarker(data?.users)
        // } else {
        //     let res = data?.users?.filter((elem, index) => {
        //         return elem.pseudo.toLowerCase().includes(name.toLowerCase(), 0)
        //     })
        setUsersToCustomMarker(res)
        // }
    }

    useEffect(() => {
        if (isFilterApplied()) {
            console.log("filterApplied")
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

    // function handleSearch(input) {
    //     setSearchInput(input)
    //     filterByName(input)
    // }

    // const filterByName = (name) => {
    //     if (name === '') {
    //         setUsersToCustomMarker(data?.users)
    //     } else {
    //         let res = data?.users?.filter((elem, index) => {
    //             return elem.pseudo.toLowerCase().includes(name.toLowerCase(), 0)
    //         })
    //         setUsersToCustomMarker(res)
    //     }
    // }

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
            <MapView
                style={AppStyles.map}
                initialRegion={defaultLocation}
                showsScale={true}
                zoomControlEnabled={true}
                scrollDuringRotateOrZoomEnabled={false}
                zoomTapEnabled={false}
                zoomEnabled={true}
                rotateEnabled={false}
                maxZoomLevel={14}
                minZoomLevel={0}
                showsMyLocationButton={true}
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
            {/*<View*/}
            {/*    style={{*/}
            {/*        position: 'absolute',*/}
            {/*        top: 10,*/}
            {/*        width: '100%',*/}

            {/*    }}*/}
            {/*>*/}

            {/*    <View*/}
            {/*        style={{*/}
            {/*            borderRadius: 10,*/}
            {/*            margin: 10,*/}
            {/*            color: '#000',*/}
            {/*            borderColor: '#666',*/}
            {/*            backgroundColor: '#FFF',*/}
            {/*            borderWidth: 1,*/}
            {/*            // height: 45,*/}
            {/*            paddingHorizontal: 10,*/}
            {/*            padding: 8,*/}
            {/*            fontSize: 18,*/}
            {/*            display: "flex",*/}
            {/*            justifyContent: "space-between",*/}
            {/*            flexDirection: "row",*/}
            {/*            alignContent: "center"*/}
            {/*        }}*/}
            {/*        // placeholder={'Search'}*/}
            {/*        // placeholderTextColor={'#666'}*/}
            {/*    >*/}
            {/*        <FontAwesome name="search" size={32} color="grey"/>*/}
            {/*        <TextInput*/}
            {/*            style={{*/}
            {/*                flexGrow: 1*/}
            {/*            }}*/}
            {/*            onChangeText={handleSearch}*/}
            {/*            placeholder={'Search here'}*/}
            {/*            value={searchInput}*/}
            {/*        >*/}
            {/*        </TextInput>*/}
            {/*        {searchInput !== '' &&*/}
            {/*            <FontAwesome name="close" size={16} color="red"*/}
            {/*                         onPress={() => {*/}
            {/*                             setSearchInput('')*/}
            {/*                             setIsPressed(false)*/}
            {/*                         }}*/}
            {/*                         style={{*/}
            {/*                             alignSelf: "center",*/}
            {/*                             marginRight: 10*/}
            {/*                         }}*/}
            {/*            />*/}
            {/*        }*/}
            {/*        <FontAwesome name="filter" size={32} color="grey"*/}
            {/*                     onPress={() => {*/}
            {/*                         console.log("iefi")*/}
            {/*                     }}*/}
            {/*        />*/}
            {/*    </View>*/}
            {/*</View>*/}
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

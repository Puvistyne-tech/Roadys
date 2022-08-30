import React, {useEffect, useMemo} from 'react'
import {
    Text,
    View,
    StyleSheet
} from "react-native";
import {Card} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';


import {
    useQuery
} from "@apollo/client";
import {showMessage} from "react-native-flash-message";

import AppStyles from '../../../assets/styles/main.scss';
import {GET_USER} from './queries'
import Loader from '../../components/Loader';
import {capitalizeFirstLetter} from "../../utils/funcs";

const ProfileCard = ({id}) => {
    const {data, refetch, error} = useQuery(GET_USER, {variables: {id: id}});
    const user = useMemo(() => data?.user, [data])

    useEffect(() => {
        error && showMessage({
            message: "Error",
            description: error.message,
            type: "danger",
            duration: 1000000
        });
    }, [error]);

    useFocusEffect(
        React.useCallback(() => {
            refetch()
        }, [refetch])
    );


    return (

        <View
            style={styles.container}
        >
            {user ?
                <Card
                    containerStyle={{
                        borderRadius: 10,
                        shadowColor: "#969595",
                        shadowOffset: {
                            width: 10,
                            height: 10,
                        },
                        shadowOpacity: 0.75,
                        elevation: 10,
                        shadowRadius: 20,
                        // padding:20,
                        // flex:1,
                        height: 'auto'
                    }}
                >
                    <View
                        style={{
                            height: '55%',
                        }}
                    >

                        <Card.Image
                            source={{uri: user?.photo}}
                            PlaceholderContent={<Text>No Photo</Text>}
                            style={{
                                // alignContent: "center",
                                // maxWidth: '100%',
                                // maxHeight: 100,
                                // flexGrow:2,
                                height: '95%',
                                width: 'auto',
                                borderRadius: 8,
                                marginBottom: 10
                            }}
                        />
                    </View>
                    {/*<Card.Divider/>*/}
                    <View
                        style={{
                            padding: 20,
                            display: "block",
                            borderBlockColor: "#cccccc",
                            borderRadius: 4,
                            borderWidth: 1,
                            borderColor: '#cecece',
                            shadowColor: '#121211',
                            height:'auto'
                        }}
                    >
                        <Card.Title  style={{fontSize: 16}}> {user?.firstname} {user?.lastname} </Card.Title>

                        <Card.Divider/>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.textItem}>{user?.pseudo}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.textItem}>{user?.age}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.textItem}>{capitalizeFirstLetter(user?.sex)}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.textItem}>{capitalizeFirstLetter(user?.kindOfTrip)}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.textItem}>{user?.nationality}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.textItem}>{user?.description}</Text>
                        </View>
                    </View>
                </Card>
                :
                <Loader/>
            }
        </View>
    );
}

export default ProfileCard;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // display:'flex',
        // flexDirection:'column',
        // justifyContent: 'space-between',
        // padding: 15,
        // backgroundColor: '#23677a',
        width: '95%',
        alignSelf: 'center',
        // height: 'auto'
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20
    },
})

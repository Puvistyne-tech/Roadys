import React, {useEffect, useMemo} from 'react'
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {
    View,
} from "react-native";
import {
    useQuery
} from "@apollo/client";
import {showMessage} from "react-native-flash-message";

import ProfileCard from '../../components/ProfileCard';
import {GET_CURRENT_USER} from './queries'
import Loader from '../../components/Loader';
import ImageReader from "../../components/ImageReader";
import AppStyles from '../../../assets/styles/main.scss';
import Button from "../../components/Button";

/**
 * It returns a view that contains a ProfileCard, a button to edit the profile, and an ImageReader
 * @returns A view with a profile card and a button to edit the profile.
 */
const ProfileScreen = () => {
    const navigation = useNavigation();
    const {data, refetch, error} = useQuery(GET_CURRENT_USER);
    const user = useMemo(() => data?.currentUser, [data])

    useFocusEffect(
        React.useCallback(() => {
            refetch()
        }, [refetch])
    );

    useEffect(() => {
        error && showMessage({
            message: "Error",
            description: error.message,
            type: "danger",
            duration: 1000000
        });
    }, [error]);

    return (
        <>
            {user ?
                <View
                    // style={AppStyles.container}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        height: '100%',
                        // backgroundColor: '#8c3838'
                    }}
                >
                    <View
                        style={{
                            //    height: '60%',
                            flex: 1,
                        }}
                    >
                        <ProfileCard id={user?.id}/>
                    </View>
                    <View
                        style={{
                            // height: '30%',
                            flexDirection: 'row',
                            alignSelf: 'center',
                            width: "85%",

                        }}
                    >
                        <Button
                            title="Edit"
                            style={{
                                ...AppStyles.button,
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: 20,
                            }}
                            onPress={() => navigation.navigate("EDIT_PROFILE_SCREEN", {id: user?.id})}/>
                        <ImageReader id={user?.id}></ImageReader>
                    </View>
                </View>
                :
                <Loader/>
            }
        </>
    );
}

export default ProfileScreen;

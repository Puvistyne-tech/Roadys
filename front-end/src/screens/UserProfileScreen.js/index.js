import React, {useMemo} from 'react'
import {
    View
} from "react-native";

import Appstyles from '../../../assets/styles/main.scss';
import ProfileCard from '../../components/ProfileCard';
import Button from "../../components/Button";
import AppStyles from '../../../assets/styles/main.scss';

const UserProfileScreen = ({route}) => {
    const {id} = useMemo(() => route?.params, [route]);

    return (
        <View
            // style={Appstyles.container}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                height: '100%',
                backgroundColor: '#8c3838'
            }}
        >
            <View
                style={{
                    height: '50%',
                }}
            >
                <ProfileCard id={id}/>
            </View>

            <View>

                <Button
                    title="Send message"
                    style={AppStyles.button}
                    //  onPress={() => navigation.navigate("EDIT_PROFILE_SCREEN", {id: user?.id})}
                />
            </View>
        </View>
    );
}

export default UserProfileScreen;

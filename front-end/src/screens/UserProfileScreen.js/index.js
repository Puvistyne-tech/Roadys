import React, {useMemo} from 'react'
import {
    View
} from "react-native";

import ProfileCard from '../../components/ProfileCard';
import Button from "../../components/Button";
import AppStyles from '../../../assets/styles/main.scss';
import {useNavigation} from "@react-navigation/native";

/**
 * It renders a profile card and two buttons
 * @returns A view with a profile card and two buttons.
 */
const UserProfileScreen = ({route}) => {
    const navigation = useNavigation();

    const {id} = useMemo(() => route?.params, [route]);

    return (
        <View
            // style={Appstyles.container}
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
                    //height: '50%',
                    flex: 1,
                }}
            >
                <ProfileCard id={id}/>
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
                    title="Send message"
                    style={{
                        ...AppStyles.button,
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 20,
                    }}
                    //  onPress={() => navigation.navigate("EDIT_PROFILE_SCREEN", {id: user?.id})}
                />
                <Button
                    title="Signal this user"
                    style={{
                        ...AppStyles.button,
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={() => navigation.navigate("SignalUser",
                        {
                            victimId: id,
                        }
                    )}
                />
            </View>
        </View>
    );
}

export default UserProfileScreen;

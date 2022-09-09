import React from 'react'
import AppStyles from '../../../assets/styles/main.scss';
import {
    View,
    TextInput,
} from 'react-native'
import {StyleSheet} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const BottomTabBar = () => {

    const navigation = useNavigation();



    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <View>
                    <MaterialCommunityIcons
                        name="wechat"
                        color={AppStyles.tabIconInactive}
                        size={22}
                        onPress={() => navigation.navigate('Chat')}
                    />
                </View>
                <View>
                    <FontIcon
                        name="map-marked-alt"
                        color={AppStyles.tabIconInactive}
                        size={22}
                        solid
                        onPress={() => navigation.navigate('Map')}
                    />
                </View>
                <View>
                    <FontIcon
                        name="user"
                        color={AppStyles.tabIconInactive}
                        size={22}
                        solid
                        onPress={() => navigation.navigate('Profile')}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#c0cbd3',
        borderWidth: 1,
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        alignContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,
    },


});

export default BottomTabBar;

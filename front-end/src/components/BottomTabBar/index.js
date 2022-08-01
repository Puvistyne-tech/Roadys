import React from 'react'
import AppStyles from '../../../assets/styles/main.scss';
import {
    View,
    TextInput,
  } from 'react-native'
import { StyleSheet } from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {ChatNavigator, MapNavigator, ProfileNavigator} from '../../routes/navigation/stacks/Stacks';

const BottomTabBar = () => {

    const navigation = useNavigation();

    const styles= StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            borderColor:'#c0cbd3',
            borderWidth: 1,
        },
        mainContainer: {
            flexDirection: 'row',
            backgroundColor: 'white',
            padding: 15,
            width: '100%',
          //  flex: 1,
        },
        textInput: {
            flex: 1,
            width: '100%',
        },
        icon: {
            flexDirection: 'row',
            flex: 1,
            display:"flex",
            justifyContent:"space-evenly",
            alignItems: "center",
        },
    
    });     

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                    <TextInput
                        style={styles.textInput}
                    />
                    <View style={{alignItems:"left", marginRight: 150, marginLeft: 10,}} >
                        <MaterialCommunityIcons
                                    name="wechat"
                                    color={AppStyles.tabIconInactive}
                                    size={20}                                    
                                    onPress={() => navigation.navigate('Chat')}
                                />
                    </View>
                    <View style={{alignItems:"center", marginRight: 150}} >
                        <FontIcon
                                    name="map-marked-alt"
                                    color={AppStyles.tabIconInactive}
                                    size={20}
                                    solid
                                    onPress={() => navigation.navigate('Map')}
                                />
                    </View>
                    <View style={{alignItems:"right", marginRight: 100}} >
                        <FontIcon
                                    name="user"
                                    color={AppStyles.tabIconInactive}
                                    size={20}
                                    solid
                                    onPress={() => navigation.navigate('Profile')}
                                />
                    </View>
            </View>
        </View>
        )
    }

    export default BottomTabBar;

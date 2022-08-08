import React, {useContext} from 'react'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer'
import {Icon} from 'react-native-elements';

import DrawerMenu from './DrawerMenu'
import {AuthContext} from '../../../providers/AuthProvider'
import TabNavigator from '../tabs'
import {MaterialCommunityIcons, FontAwesome, Ionicons} from '@expo/vector-icons';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {Alert, Text, Linking} from "react-native";
import AppStyles from '../../../../assets/styles/main.scss';


const Drawer = createDrawerNavigator()

const DrawerMenuContainer = (props) => {
    const {state, ...rest} = props
    const newState = {...state}
    const {disconnect} = useContext(AuthContext)

    const onDisconnectClick = () => {
        return Alert.alert(
            "Not too fast!",
            "Do you really want to disconnect",
            [{
                text: "Yes",
                onPress: () => {
                    disconnect()
                },
            },
                {text: "No"},
            ]
        )
    };


    const navigation = useNavigation();
    const color = '#2986cc';


    newState.routes = newState.routes.filter((item) => item.name !== 'DRAWER_HOME')

    return (
        <DrawerContentScrollView {...props}>
            <DrawerMenu {...props}/>
            <DrawerItemList state={newState} {...rest} />

            <DrawerItem
                // label="Chats"
                label={
                    ({color}) => <Text style={{color, textAlign: 'center'}}>Chats</Text>
                }
                icon={
                    ({focused, size}) =>
                        <MaterialCommunityIcons name="wechat"
                                                color={focused ? AppStyles.tabIconActive : AppStyles.tabIconInactive}
                                                size={size}
                        />
                }
                onPress={() => navigation.navigate('Chat')}
            />
            <DrawerItem
                //   label="Map"
                label={
                    ({color}) => <Text style={{color, textAlign: 'center'}}>Map</Text>
                }
                icon={
                    ({focused, size}) =>
                        <FontIcon name="map-marked-alt"
                                  color={focused ? AppStyles.tabIconActive : AppStyles.tabIconInactive}
                                  size={size}
                        />
                }
                onPress={() => navigation.navigate('Map')}
            />
            <DrawerItem
                //  label="Profile"
                label={
                    ({color}) => <Text style={{color, textAlign: 'center'}}>Profile</Text>
                }
                icon={
                    ({focused, size}) =>
                        <FontIcon name="user" color={focused ? AppStyles.tabIconActive : AppStyles.tabIconInactive}
                                  size={size}
                        />
                }
                onPress={() => navigation.navigate('Profile')}

            />
            <DrawerItem
                //   label="Partners"
                label={
                    ({color}) => <Text style={{color, textAlign: 'center'}}>Partners</Text>
                }
                icon={
                    ({focused, size}) =>
                        <FontAwesome name="handshake-o"
                                     color={focused ? AppStyles.tabIconActive : AppStyles.tabIconInactive}
                                     size={size}
                        />
                }
                onPress={() => navigation.navigate('PartnerNavigator')}
            />
            <DrawerItem
                //label="Settings"
                label={
                    ({color}) => <Text style={{color, textAlign: 'center'}}>Settings</Text>
                }
                icon={
                    ({focused, size}) =>
                        <Ionicons name="settings" color={focused ? AppStyles.tabIconActive : AppStyles.tabIconInactive}
                                  size={size}
                        />
                }
                onPress={() => navigation.navigate('Settings')}
            />

            <DrawerItem
                label={
                    ({color}) => <Text style={{color, textAlign: 'center'}}>Terms and Conditions</Text>
                }
                icon={
                    ({focused, size}) =>
                        <Ionicons name="book" color={focused ? AppStyles.tabIconActive : AppStyles.tabIconInactive}
                                  size={size}
                        />
                }
                onPress={() => navigation.navigate('TermsAndConditions')}
            />

            <DrawerItem
                //label="Disconnect"
                label={
                    ({color}) => <Text style={{color, textAlign: 'center'}}>Disconnect</Text>
                }
                icon={
                    ({focused, size}) =>
                        <Icon
                            color={focused ? AppStyles.tabIconActive : AppStyles.tabIconInactive} size={size}
                            name="power"
                        />
                }
                onPress={onDisconnectClick}
            />
        </DrawerContentScrollView>
    )
}

const DrawerNavigator = () => (
    <Drawer.Navigator drawerContent={props => <DrawerMenuContainer {...props} />}>
        <Drawer.Screen name="DRAWER_HOME" component={TabNavigator}
                       options={{tabBarButton: () => null, tabBarVisible: false,}}/>
    </Drawer.Navigator>
)

export default DrawerNavigator

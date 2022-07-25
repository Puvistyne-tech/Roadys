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
import { useNavigation } from '@react-navigation/native';


const Drawer = createDrawerNavigator()

const DrawerMenuContainer = (props) => {
   const {state, ...rest} = props
   const newState = {...state}
   const {disconnect} = useContext(AuthContext)

   const navigation = useNavigation();
   const color = '#2986cc';


   newState.routes = newState.routes.filter((item) => item.name !== 'DRAWER_HOME')

   return (
      <DrawerContentScrollView {...props}>
         <DrawerMenu {...props} />
         <DrawerItemList state={newState} {...rest} />

         <DrawerItem
            label="Chats"
            icon={({__,color,size}) => <MaterialCommunityIcons name="wechat" color={color} size={size}/>}
            onPress={() => navigation.navigate('Chats')}
         />
         <DrawerItem
            label="Map"
            icon={({__,color,size}) => <FontIcon name="map-marked-alt" color={color} size={size}/>}
            onPress={() => navigation.navigate('Map')}
         />
         <DrawerItem
            label="Profile"
            icon={({__,color,size}) => <FontIcon name="user" color={color} size={size}/>}
            onPress={() => navigation.navigate('Profile')}
         />
         <DrawerItem
            label="Partners"
            icon={({__,color,size}) => <FontAwesome name="handshake-o" color={color} size={size}/>}
            onPress={() => navigation.navigate('PartnerNavigator')}
         />
         <DrawerItem
            label="Settings"
            icon={({__,color,size}) => <Ionicons name="settings" color={color} size={size}/>}
            onPress={() => navigation.navigate('Settings')}
         />

         <DrawerItem
            label="Disconnect"
            icon={({focused, color, size}) => <Icon color={color} size={size} name="power"/>}
            onPress={() => disconnect()}
         />
      </DrawerContentScrollView>
   )
}

const DrawerNavigator = () => (
   <Drawer.Navigator drawerContent={props => <DrawerMenuContainer {...props} />}>
      <Drawer.Screen name="DRAWER_HOME" component={TabNavigator} options={{}}/>
   </Drawer.Navigator>
)

export default DrawerNavigator

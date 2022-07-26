import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Home from '../../../scenes/home'
import Map from '../../../scenes/map'
import ProfileScreen from '../../../screens/ProfileScreen.js'
import UserProfileScreen from '../../../screens/UserProfileScreen.js/index.js'
import EditProfileScreen from '../../../screens/EditProfileScreen.js'
import HeaderLeft from './HeaderLeft'
import HeaderTitle from './HeaderTitle'
import HeaderRight from "./HeaderRight";
import Appstyles from '../../../../assets/styles/main.scss';

import PartnerScreen from '../../../scenes/partners/PartnerScreen'
import DrawerNavigator from "../drawer";
import MuseumScreen from "../../../scenes/modal/MapScreens/MuseumScreen";
import BikeScreen from "../../../scenes/modal/MapScreens/BikeScreen";

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator()

const navigationProps = {
   headerTintColor: 'white',
   headerStyle: {backgroundColor: Appstyles.mainColor},
   headerTitleStyle: {fontSize: 18},
}

// ------------------------------------
// Navigators
// ------------------------------------

export const HomeNavigator = () => (
   <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={navigationProps}
   >
      <Stack.Screen
         name="HOME_SCREEN"
         component={Home}
         options={({navigation}) => ({
            title: 'Home',
            headerLeft: () => <HeaderLeft navigation={navigation}/>,
            headerTitle: () => <HeaderTitle/>,
            headerRight: () => <HeaderRight/>
         })}
      />
   </Stack.Navigator>
)

export const MapNavigator = () => (
   <Stack.Navigator
      initialRouteName="map"
      headerMode="screen"
      screenOptions={{...navigationProps, headerShown: false}}
   >
      <Stack.Screen
         name="MAP"
         component={Map}
         options={() => ({
            title: 'Map',
         })}
      />
      <Stack.Screen
         name="USER_PROFILE_SCREEN"
         component={UserProfileScreen}
         options={() => ({
            title: 'Profile',
            headerShown: true,
         })}
      />
   </Stack.Navigator>
)

export const ProfileNavigator = () => (
   <Stack.Navigator
      initialRouteName="Profile"
      headerMode="screen"
      screenOptions={{...navigationProps, headerShown: false}}
   >
      <Stack.Screen
         name="PROFILE_SCREEN"
         component={ProfileScreen}
         options={({navigation}) => ({
            title: 'Profile',
            headerShown: true,
            // })}
            // // name="HOME_SCREEN"
            // // component={Home}
            // // options={({navigation}) => ({
            // //    title: 'Home',
            headerLeft: () => <HeaderLeft navigation={navigation}/>,
            headerTitle: () => <HeaderTitle/>,
            headerRight: () => <HeaderRight/>
         })}
      />
      <Stack.Screen
         name="EDIT_PROFILE_SCREEN"
         component={EditProfileScreen}
         options={{
            title: 'Edit Profile',
            headerShown: true,
         }}
      />
   </Stack.Navigator>
)


export const PartnerNavigator = () => (
   <Stack.Navigator
      initialRouteName="PartnerScreen"
      headerMode="screen"
      screenOptions={{
         ...navigationProps,
         headerShown: true
      }}
   >
      <Stack.Screen
         name="PARTNERS"
         component={PartnerScreen}
         options={({navigation}) => ({
            title: 'Partners',
            headerShown:true,
            headerLeft: () => <HeaderLeft navigation={navigation}/>,
            // headerTitle: () => <HeaderTitle/>,
            headerRight: () => <HeaderRight/>,
         })}
      />
      <Stack.Screen
         name="MUSEUMS"
         component={MuseumScreen}
         // component={CustomMapMuseum}
         options={({navigation}) => ({
            title: 'Museum',
            headerShown:true,
            // headerLeft: () => <HeaderLeft navigation={navigation}/>,
            // headerTitle: () => <HeaderTitle/>,
            headerRight: () => <HeaderRight/>,
         })}
      />
      <Stack.Screen
         name="BIKE_REPAIR"
         component={BikeScreen}
         // component={CustomMapBike}
         options={({navigation}) => ({
            title: "Bike Repair",
            headerShown:true,
            // headerLeft: () => <HeaderLeft navigation={navigation}/>,
            // headerTitle: () => <HeaderTitle/>,
            headerRight: () => <HeaderRight/>,
         })}
      />

   </Stack.Navigator>
)

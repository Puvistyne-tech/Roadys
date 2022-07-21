import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from 'theme'
import Home from 'scenes/home'
import Map from 'scenes/map'
import ProfileScreen from '../../../screens/ProfileScreen.js'
import UserProfileScreen from '../../../screens/UserProfileScreen.js/index.js'
import EditProfileScreen from '../../../screens/EditProfileScreen.js'
import HeaderLeft from './HeaderLeft'
import HeaderTitle from './HeaderTitle'
import Appstyles from '../../../../assets/styles/main.scss';

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator()

const navigationProps = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: Appstyles.mainColor },
  headerTitleStyle: { fontSize: 18 },
}

// ------------------------------------
// Navigators
// ------------------------------------

export const HomeNavigator = () => (
  <Stack.Navigator
    initialRouteName="HOME_SCREEN"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="HOME_SCREEN"
      component={Home}
      options={({ navigation }) => ({
        title: 'Home',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
  </Stack.Navigator>
)

export const MapNavigator = () => (
  <Stack.Navigator
    initialRouteName="Map"
    headerMode="screen"
    screenOptions={{...navigationProps, headerShown: false} }
  >
    <Stack.Screen
      name="Map"
      component={Map}
      options={() => ({
        title: 'Map',
      })}
    />
    <Stack.Screen
      name="USER_PROFIL_SCREEN"
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
    screenOptions={{...navigationProps, headerShown: false} }
  >
    <Stack.Screen
      name="PROFIL_SCREEN"
      component={ProfileScreen}
      options={() => ({
        title: 'Profile',
      })}
    />
    <Stack.Screen
      name="EDIT_PROFIL_SCREEN"
      component={EditProfileScreen}
      options={{
        title: 'Edit Profile',
        headerShown: true,
      }}
    />
  </Stack.Navigator>
)

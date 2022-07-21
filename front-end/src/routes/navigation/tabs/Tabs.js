import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Appstyles from '../../../../assets/styles/main.scss';
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from 'theme'

// stack navigators
import { HomeNavigator, MapNavigator, ProfileNavigator } from '../stacks'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return <Tab.Navigator
    screenOptions={({ route }) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused }) => {
        switch (route.name) {
          case 'Home':
            return (
              <FontIcon
                name="home"
                color={focused ? Appstyles.tabIconActive : Appstyles.tabIconInactive}
                size={20}
                solid
              />
            )
          case 'Map':
            return (
              <FontIcon
                name="map-marked-alt"
                color={focused ? Appstyles.tabIconActive : Appstyles.tabIconInactive}
                size={20}
                solid
              />
            )
          case 'Profile':
            return (
              <FontIcon
                name="user"
                color={focused ? Appstyles.tabIconActive : Appstyles.tabIconInactive}
                size={20}
                solid
              />
            )
          default:
            return <View />
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: Appstyles.tabIconActive,
      inactiveTintColor: Appstyles.tabIconInactive,
      style: {
        // backgroundColor: 'white',
        // borderTopColor: 'gray',
        // borderTopWidth: 1,
        // paddingBottom: 5,
        // paddingTop: 5,
      },
    }}
    initialRouteName="Home"
    swipeEnabled={false}
  >
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="Map" component={MapNavigator} />
    <Tab.Screen name="Profile" component={ProfileNavigator} />
  </Tab.Navigator>
}

export default TabNavigator

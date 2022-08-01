import React from 'react'
import {View} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import AppStyles from '../../../../assets/styles/main.scss';
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import {colors} from 'theme'

// stack navigators
import {ChatNavigator, MapNavigator, ProfileNavigator} from '../stacks'
import headerTitle from "../stacks/HeaderTitle";
import {HeaderTitle} from "@react-navigation/stack";
import HeaderRight from "../stacks/HeaderRight";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
   return <Tab.Navigator
      screenOptions={({route}) => ({
         tabBarIcon: ({focused}) => {
            switch (route.name) {
               case 'Chat':
                  return (
                     <MaterialCommunityIcons
                        name="wechat"
                        color={focused ? AppStyles.tabIconActive : AppStyles.tabIconInactive}
                        size={20}
                        solid
                     />
                  )
               case 'Map':
                  return (
                     <FontIcon
                        name="map-marked-alt"
                        color={focused ? AppStyles.tabIconActive : AppStyles.tabIconInactive}
                        size={20}
                        solid
                     />
                  )
               case 'Profile':
                  return (
                     <FontIcon
                        name="user"
                        color={focused ? AppStyles.tabIconActive : AppStyles.tabIconInactive}
                        size={20}
                        solid
                     />
                  )
               default:
                  return <View/>
            }
         },
      })}
      tabBarOptions={{
         activeTintColor: AppStyles.tabIconActive,
         inactiveTintColor: AppStyles.tabIconInactive,
         style: {
            // backgroundColor: 'white',
            // borderTopColor: 'gray',
            // borderTopWidth: 1,
            // paddingBottom: 5,
            // paddingTop: 5,
         },
      }}
      initialRouteName="Chat"
      swipeEnabled={true}
   >
      <Tab.Screen name="Chat" component={ChatNavigator}/>
      <Tab.Screen name="Map" component={MapNavigator}/>
      <Tab.Screen
         name="Profile"
         component={ProfileNavigator}
      />
   </Tab.Navigator>
}

export default TabNavigator

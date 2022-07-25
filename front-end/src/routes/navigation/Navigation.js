import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './drawer'
import PartnerScreen from "../../scenes/partners/PartnerScreen";
import TabNavigator from "./tabs";

export default () => (
  <NavigationContainer>
    <DrawerNavigator />
  </NavigationContainer>
)

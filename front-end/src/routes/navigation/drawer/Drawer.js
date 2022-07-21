import React, { useContext } from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'
import { Icon } from 'react-native-elements';

import DrawerMenu from './DrawerMenu'
import { AuthContext } from '../../../providers/AuthProvider'
import TabNavigator from '../tabs'

const Drawer = createDrawerNavigator()

const DrawerMenuContainer = (props) => {
  const { state, ...rest } = props
  const newState = { ...state }
  const { deconnection } = useContext(AuthContext)

  newState.routes = newState.routes.filter((item) => item.name !== 'DRAWER_HOME')

  return (
    <DrawerContentScrollView {...props}>
      <DrawerMenu {...props} />
      <DrawerItemList state={newState} {...rest} />
     
      <DrawerItem
        label="Deconnection"
        icon={({ focused, color, size }) => <Icon color={color} size={size} name="power" />}
        onPress={() => deconnection()}
      />
    </DrawerContentScrollView>
  )
}

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={props => <DrawerMenuContainer {...props} />}>
    <Drawer.Screen name="DRAWER_HOME" component={TabNavigator} options={{}} />
  </Drawer.Navigator>
)

export default DrawerNavigator

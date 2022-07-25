import React, {useState, useEffect, useContext, useMemo} from 'react'
import {View} from 'react-native'
import {Provider} from 'react-redux'
import store from 'utils/store'
import {imageAssets} from 'theme/images'
import {fontAssets} from 'theme/fonts'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'utils/ignore'

import WelcomeScreen from './screens/WelcomeScreen'
import SigninScreen from './screens/SigninScreen'
import SignupScreen from './screens/SignupScreen'

import {AuthProvider, AuthContext} from './providers/AuthProvider'
import {CustomApolloProvider} from './providers/CustomApolloProvider'
import Drawer from './routes/navigation/drawer/Drawer.js'

import FlashMessage from "react-native-flash-message";
import {ThemeProvider} from 'react-native-elements';
import theme from '../assets/styles/theme'
import PartnerScreen from "./scenes/partners/PartnerScreen";
import {PartnerNavigator} from "./routes/navigation/stacks";
import FeedbackScreen from "./scenes/modal/FeedbackScreen";
import AboutRoadysScreen from "./scenes/modal/AboutRoadysScreen";
import SettingsScreen from "./scenes/modal/SettingsScreen";
import {HeaderTitle} from "@react-navigation/stack";
import HeaderRight from "./routes/navigation/stacks/HeaderRight";

const MyAppNavigation = () => {
   const Stack = createNativeStackNavigator();
   const {token} = useContext(AuthContext);

   const isAuthenticated = useMemo(
      () => {
         console.log("token", token);
         return token === null
      }, [token]
   )
   console.log("token", token)

   return <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
         {isAuthenticated ?
            (
               <>
                  <Stack.Screen name="Welcome screen" component={WelcomeScreen}/>
                  <Stack.Screen name="Sign in" component={SigninScreen}/>
                  <Stack.Screen name="Sign up" component={SignupScreen}/>
               </>
            ) :
            (
               <>
                  <Stack.Screen
                     name="Root"
                     component={Drawer}
                     options={{headerShown: false}}
                  />
                  <Stack.Screen
                     name='PartnerNavigator'
                     component={PartnerNavigator}
                     option={{headerShown: false}}
                  />
                  <Stack.Screen
                     name="Feedback"
                     component={FeedbackScreen}
                     options={({navigation}) => ({
                        title: 'Feedback',
                        headerTitle: () => <HeaderTitle/>,
                        headerRight: () => <HeaderRight/>,
                     })}
                  />
                  <Stack.Screen
                     name="About Roadys"
                     component={AboutRoadysScreen}
                     options={({navigation}) => ({
                        title: 'About Roadys',
                        headerTitle: () => <HeaderTitle/>,
                        headerRight: () => <HeaderRight/>,
                     })}
                  />
                  <Stack.Screen
                     name="Settings"
                     component={SettingsScreen}
                     options={({navigation}) => ({
                        title: 'Settings',
                        headerTitle: () => <HeaderTitle/>,
                        headerRight: () => <HeaderRight/>,
                     })}
                  />
               </>
            )
         }
      </Stack.Navigator>
   </NavigationContainer>
}

const App = () => {
   // state
   const [didLoad, setDidLoad] = useState(false)

   // handler
   const handleLoadAssets = async () => {
      // assets preloading
      await Promise.all([...imageAssets, ...fontAssets])
      setDidLoad(true)
   }

   // lifecycle
   useEffect(() => {
      handleLoadAssets()
   }, [])

   // rendering
   if (!didLoad) return <View/>
   return (
      <ThemeProvider theme={theme}>
         <Provider store={store}>
            <CustomApolloProvider>
               <AuthProvider>
                  <MyAppNavigation/>
               </AuthProvider>
            </CustomApolloProvider>
            <FlashMessage/>
         </Provider>
      </ThemeProvider>
   )
}

export default App

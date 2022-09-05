import React, {useState, useEffect, useContext, useMemo} from 'react'
import {View} from 'react-native'
import {Provider} from 'react-redux'
import store from 'utils/store'
import {imageAssets} from 'theme/images'
import {fontAssets} from 'theme/fonts'
import {NavigationContainer, useFocusEffect, useNavigation} from '@react-navigation/native';
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
import TermsAndConditionsScreen from "./scenes/modal/TermsAndConditionsScreen";
import SignalUser from "./scenes/modal/SignalUserScreen/SignalUser";


const MyAppNavigation = () => {
    const Stack = createNativeStackNavigator();
    const {token} = useContext(AuthContext);
    // const {data, refetch} = useQuery(GET_CURRENT_USER);
    // let currentUser = useMemo(() => data?.currentUser, [data])

    // useFocusEffect(
    //     React.useCallback(() => {
    //         refetch().then(r => {
    //             console.log(r)
    //         })
    //     }, [refetch])
    // );

    // useEffect(() => {
    //     currentUser = data?.currentUser
    //     console.log(currentUser)
    // }, [data, currentUser]);
    //
    const isAuthenticated = useMemo(
        () => {
            console.log("token", token);
            // navigation.navigate('Activate user')
            return token !== null;
            // return token !== null;
        }, [token]
    )

    // let isDeleted = false;
    // // isDeleted = useMemo(
    // //     () => {
    // //         return currentUser && currentUser.isDeleted === true;
    // //     }, [currentUser, token]
    // // )
    // console.log("token", token)

    // if (isDeleted) {
    //     return (
    //         <NavigationContainer>
    //             <Stack.Navigator headerMode="none">
    //                 <Stack.Screen name="Activate your account" component={ActivateUserScreen}/>
    //             </Stack.Navigator>
    //         </NavigationContainer>
    //     )
    // } else
    // {
        return <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {isAuthenticated ?
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
                                option={{headerShown: true}}
                            />
                            <Stack.Screen
                                name="Feedback"
                                component={FeedbackScreen}
                                options={({navigation}) => ({
                                    title: 'Feedback',
                                    headerShown: true,
                                    headerTitle: () => <HeaderTitle/>,
                                    headerRight: () => <HeaderRight/>,
                                })}
                            />
                            <Stack.Screen
                                name="SignalUser"
                                component={SignalUser}
                                options={({navigation}) => ({
                                    title: 'SignalUser',
                                    headerShown: true,
                                    headerTitle: () => <HeaderTitle/>,
                                    headerRight: () => <HeaderRight/>,
                                })}
                            />
                            <Stack.Screen
                                name="About Roadys"
                                component={AboutRoadysScreen}
                                options={({navigation}) => ({
                                    headerShown: true,
                                    title: 'About Roadys',
                                    headerTitle: () => <HeaderTitle/>,
                                    headerRight: () => <HeaderRight/>,
                                })}
                            />
                            <Stack.Screen
                                name="TermsAndConditions"
                                component={TermsAndConditionsScreen}
                                options={({navigation}) => ({
                                    title: 'Terms And Conditions',
                                    headerShown: true,
                                    headerTitle: () => <HeaderTitle/>,
                                    headerRight: () => <HeaderRight/>,
                                })}
                            />
                            <Stack.Screen
                                name="Settings"
                                component={SettingsScreen}
                                options={({navigation}) => ({
                                    headerShown: true,
                                    title: 'Settings',
                                    headerTitle: () => <HeaderTitle/>,
                                    headerRight: () => <HeaderRight/>,
                                })}
                            />
                        </>
                    )
                    :
                    (
                        <>
                            <Stack.Screen name="Welcome screen" component={WelcomeScreen}/>
                            <Stack.Screen name="Sign in" component={SigninScreen}/>
                            <Stack.Screen name="Sign up" component={SignupScreen}/>
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>

    // }
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

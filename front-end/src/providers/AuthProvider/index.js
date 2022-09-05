import React, {useEffect, useMemo, useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery, useMutation} from '@apollo/client';

import {SIGNIN, SIGNUP, CURRENT_USER, REACTIVATE_USER} from './query';

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null)
    // const { data: currentUserData, loading: currentUserLoading, error: currentUserError, refetch: refetchCurrentUser } = useQuery(CURRENT_USER)
    const [mutateSignIn, {data: signinData, loading: signinLoading, error: signinError}] = useMutation(SIGNIN);
    const [mutateSignUp, {data: signupData, loading: signupLoading, error: signupError}] = useMutation(SIGNUP);
    const [mutateReActivateUser, {
        data: reactivateData,
        loading: reactivateDataLoading,
        error: reactivateDataError
    }] = useMutation(REACTIVATE_USER);

    useEffect(async () => {
        setToken(await AsyncStorage.getItem('token'))
    }, [])

    const onTokenChange = useCallback(async (newToken) => {
        setToken(newToken)

        if (newToken) {
            await AsyncStorage.setItem(
                'token', newToken
            ).catch((err) => console.log(err));
        }
    }, [])

    useEffect(() => {
        const newToken = signinData?.signin?.jwt || null
        onTokenChange(newToken)
    }, [signinData, onTokenChange])

    useEffect(() => {
        const newToken = signupData?.signup?.jwt || null
        onTokenChange(newToken)
    }, [signupData, onTokenChange])

    useEffect(() => {
        console.log(reactivateData)
        const newToken = reactivateData?.reactivateDeletedUser?.jwt || null
        onTokenChange(newToken)
    }, [reactivateData, onTokenChange])

    const value = useMemo(() => ({
        signin: (login, password) => {
            return mutateSignIn({variables: {login, password}});
        },
        signup: (pseudo, email, password) => {
            return mutateSignUp({variables: {pseudo, email, password}});
        },
        reactivateDeletedUser: (pseudo, email, password) => {
            console.log('reactivateDeletedUser')
            const r= mutateReActivateUser({variables: {pseudo, email, password}})
            console.log(r)
            return r
            //     .then((res) => {
            //     console.log(res)
            //     return res
            // });

        },
        disconnect: () => {
            setToken(null)
            AsyncStorage.removeItem('token');
        },
        token: token
    }), [token])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import AsyncStorage from '@react-native-async-storage/async-storage'

const httpLink = createHttpLink({
  // uri: 'http://192.168.1.89:8000',
  // uri: 'http://172.20.10.2:8000',
  uri: 'http://192.168.1.15:8000',
})

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token')
  return {
    headers: {
      ...headers,
      Authorization: token || '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export const CustomApolloProvider = ({ children }) => (
  <ApolloProvider
      client={client}>
    {children}
  </ApolloProvider>
)

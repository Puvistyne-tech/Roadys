import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { authenticate } from '../slices/app.slice'
import Main from './navigation'

/**
 * > The function is a React Hook that renders the Main component if the user is logged in, otherwise it renders a loading
 * screen
 * @returns {JSX.Element}
 * @constructor
 * @category Components - React Hooks
 * @subcategory App
 * @namespace App
 */
const Routes = () => {
  const { checked, loggedIn } = useSelector((state) => state.app)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authenticate(this.state,{ loggedIn: true, checked: true }))
  }, [])

  // TODO: switch router by loggedIn state
  console.log('[##] loggedIn', loggedIn)

  // rendering
  if (!checked) return <Text>Loading...</Text>
  return <Main />
}

export default Routes

import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar,
} from 'react-native'
import Button from 'components/Button'
import { colors } from '../../theme'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
})

const Chat = ({ navigation }) => (
  <View style={styles.root}>
    <StatusBar barStyle="light-content" />
    <Text style={styles.title}>Chat</Text>
    {/* <Button
      title="Go to Details"
      color="white"
      backgroundColor={colors.lightPurple}
      onPress={() => {
        navigation.navigate('Details', { from: 'Chat' })
      }}
    /> */}
  </View>
)

Chat.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Chat.defaultProps = {
  navigation: { navigate: () => null },
}

export default Chat

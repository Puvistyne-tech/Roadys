import * as React from 'react'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native'

export default React.forwardRef(
  (props, ref) => {
    const { label, labelStyle, error, ...inputProps } = props

    return (
      <View style={styles.container}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <TextInput
          autoCapitalize="none"
          ref={ref}
          style={[
            styles.inputContainer,
            { borderColor: error ? '#fc6d47' : '#c0cbd3' },
          ]}
          {...inputProps}
        />
        <Text style={styles.textError}>{error && error.message}</Text>
      </View>
    )
  }
)
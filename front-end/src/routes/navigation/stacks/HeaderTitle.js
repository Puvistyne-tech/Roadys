import React from 'react'
import {StyleSheet, Image, Pressable} from 'react-native'
import {images} from '../../../theme'
import {useNavigation} from "@react-navigation/native";

const styles = StyleSheet.create({
   logo: {
      width: 32,
      height: 32,
   },
})

const HeaderTitle = () => {
   const navigation = useNavigation()
   return (
      <Pressable
         onPress={() => {
            navigation.navigate('Chat')
         }}
      >
         <Image
            source={images.logo_sm}
            style={styles.logo}
         />
      </Pressable>
   )
}

HeaderTitle.propTypes = {}
HeaderTitle.defaultProps = {}

export default HeaderTitle

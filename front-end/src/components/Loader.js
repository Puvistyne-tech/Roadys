import React from 'react'
import { Image, View } from "react-native";

import LoaderImg from '../../assets/images/loader.gif'
import Appstyles from '../../assets/styles/main.scss';

/**
 * It returns a View component with a nested Image component
 * @returns A view with an image inside of it.
 */
const Loader = () => {
  return (
    <View style={Appstyles.loaderContainer}>
      <Image style={Appstyles.loaderImg} source={LoaderImg} />
    </View>
  )
}

export default Loader
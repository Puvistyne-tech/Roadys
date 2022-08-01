import { Asset } from 'expo-asset'

// png/jpeg
export const images = {
  logo_sm: require('../../assets/images/logo_color.png'),
}

// image preloading
export const imageAssets = Object.keys(images).map((key) => Asset.fromModule(images[key]).downloadAsync())

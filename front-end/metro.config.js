// eslint-disable-next-line import/no-extraneous-dependencies
const { getDefaultConfig } = require('@expo/metro-config')

module.exports = (async () => {
  const {
    resolver: { sourceExts },
  } = await getDefaultConfig(__dirname)
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-sass-transformer'),
    },
    resolver: {
      sourceExts: [...sourceExts, 'scss', 'sass', 'cjs'],
    },
  }
})()

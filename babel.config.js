module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      root: ["."],
      extensions: [
        '.Js',
        '.jsx',
        '.json',
        '.ts',
        '.tsx'
      ],
      alias: {
        '@components': './src/components',
        '@utils': './src/utils',
        '@images': './src/assets/images',
        '@screens': './src/screens',
        '@hooks': './src/hooks',
        '@contexts': './src/contexts',
        '@store': './src/store',
        '@types': './src/types',
        '@configs': './src/configs',
        '@services': './src/services',

      }
    }], 'react-native-reanimated/plugin'
  ]
};

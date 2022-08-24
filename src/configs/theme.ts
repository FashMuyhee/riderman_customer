import { extendTheme } from 'native-base';

const theme = extendTheme({
  colors: {
    bg: '#FAFAFA',
    main: '#178e4e',
    grey: {
      100: '#F7F7F7',
      200: '#777777',
      300: '#B9B9B9',
      400: '#263238',
      500: '#EEEEEE'
    },
    accent: '#b6dac7',
    lightAccent: '#e8f4ed'

  },
  config: {
    initialColorMode: 'light',
  },
  components: {
    Text: {
      baseStyle: {
        color: 'darkText',
      },
    },
    Toast: {
      baseStyle: {
        // backgroundColor: '#000e21',
        minHeight: 50,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 350,
        color: 'red.600',
      },
    },
  },
  fontConfig: {
    WorkSans: {
      100: {
        normal: 'WorkSans-ExtraLight',
        italic: 'WorkSans-ExtraLightItalic',
      },
      200: {
        normal: 'WorkSans-ExtraLight',
        italic: 'WorkSans-ExtraLightItalic',
      },
      300: {
        normal: 'WorkSans-Light',
        italic: 'WorkSans-LightItalic',
      },
      400: {
        normal: 'WorkSans-Regular',
        italic: 'WorkSans-Italic',
      },
      500: {
        normal: 'WorkSans-Regular',
        italic: 'WorkSans-Italic',
      },
      600: {
        normal: 'WorkSans-SemiBold',
        italic: 'WorkSans-SemiBoldItalic',
      },
      700: {
        normal: 'WorkSans-Bold',
        italic: 'WorkSans-BoldItalic',
      },
      800: {
        normal: 'WorkSans-ExtraBold',
        italic: 'WorkSans-ExtraBoldItalic',
      },
      900: {
        normal: 'WorkSans-Black',
        italic: 'WorkSans-BlackItalic',
      },
    },
  },
  fonts: {
    heading: 'WorkSans',
    body: 'WorkSans',
    mono: 'WorkSans',
  },
});

type CustomThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType { }
}

export default theme
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
    Montserrat: {
      100: {
        normal: 'Montserrat-ExtraLight',
        italic: 'Montserrat-ExtraLightItalic',
      },
      200: {
        normal: 'Montserrat-ExtraLight',
        italic: 'Montserrat-ExtraLightItalic',
      },
      300: {
        normal: 'Montserrat-Light',
        italic: 'Montserrat-LightItalic',
      },
      400: {
        normal: 'Montserrat-Regular',
        italic: 'Montserrat-Italic',
      },
      500: {
        normal: 'Montserrat-Regular',
        italic: 'Montserrat-Italic',
      },
      600: {
        normal: 'Montserrat-SemiBold',
        italic: 'Montserrat-SemiBoldItalic',
      },
      700: {
        normal: 'Montserrat-Bold',
        italic: 'Montserrat-BoldItalic',
      },
      800: {
        normal: 'Montserrat-ExtraBold',
        italic: 'Montserrat-ExtraBoldItalic',
      },
      900: {
        normal: 'Montserrat-Black',
        italic: 'Montserrat-BlackItalic',
      },
    },
  },
  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat',
    mono: 'Montserrat',
  },
});

type CustomThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType { }
}

export default theme
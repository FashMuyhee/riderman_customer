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
    poppins: {
      100: {
        normal: 'Poppins-ExtraLight',
        italic: 'Poppins-ExtraLightItalic',
      },
      200: {
        normal: 'Poppins-ExtraLight',
        italic: 'Poppins-ExtraLightItalic',
      },
      300: {
        normal: 'Poppins-Light',
        italic: 'Poppins-LightItalic',
      },
      400: {
        normal: 'Poppins-Regular',
        italic: 'Poppins-Italic',
      },
      500: {
        normal: 'Poppins-Regular',
        italic: 'Poppins-Italic',
      },
      600: {
        normal: 'Poppins-SemiBold',
        italic: 'Poppins-SemiBoldItalic',
      },
      700: {
        normal: 'Poppins-Bold',
        italic: 'Poppins-BoldItalic',
      },
      800: {
        normal: 'Poppins-ExtraBold',
        italic: 'Poppins-ExtraBoldItalic',
      },
      900: {
        normal: 'Poppins-Black',
        italic: 'Poppins-BlackItalic',
      },
    },
  },
  fonts: {
    heading: 'poppins',
    body: 'poppins',
    mono: 'poppins',
  },
});

type CustomThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType { }
}

export default theme
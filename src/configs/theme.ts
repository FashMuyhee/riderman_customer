import { extendTheme } from 'native-base';

const theme = extendTheme({
  colors: {
    bg: '#FAFAFA',
    main: '#178F4F',
    grey: {
      100: '#F7F7F7'
    }
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
        normal: 'font-extralight',
        italic: 'font-extralightitalic',
      },
      200: {
        normal: 'font-extralight',
        italic: 'font-extralightitalic',
      },
      300: {
        normal: 'font-light',
        italic: 'font-lightitalic',
      },
      400: {
        normal: 'font-regular',
        italic: 'font-italic',
      },
      500: {
        normal: 'font-regular',
        italic: 'font-italic',
      },
      600: {
        normal: 'font-semibold',
        italic: 'font-semibolditalic',
      },
      700: {
        normal: 'font-bold',
        italic: 'font-bolditalic',
      },
      800: {
        normal: 'font-extrabold',
        italic: 'font-extrabolditalic',
      },
      900: {
        normal: 'font-black',
        italic: 'font-blackitalic',
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
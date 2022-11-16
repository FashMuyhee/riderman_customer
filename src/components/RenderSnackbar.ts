import { FONT } from "@utils/constant";
import Snackbar, { SnackBarOptions } from "react-native-snackbar";

interface RenderSnackbar extends Omit<SnackBarOptions, 'duration'> {
  duration?: 'INFINITE' | 'LONG' | 'SHORT'
}
/**
 * render snackbar with customization
 * @param  {RenderSnackbar} params
 */
const RenderSnackbar = (params: RenderSnackbar) => {
  const dismissTime = () => {
    switch (params.duration) {
      case 'INFINITE':
        return Snackbar.LENGTH_INDEFINITE;
      case 'LONG':
        return Snackbar.LENGTH_LONG;
      case 'SHORT':
        return Snackbar.LENGTH_SHORT;
      default:
        return Snackbar.LENGTH_LONG;
    }
  }
  return Snackbar.show({
    ...params, fontFamily: FONT.REGULAR, textColor: 'white', duration: dismissTime()
  })
}

export default RenderSnackbar
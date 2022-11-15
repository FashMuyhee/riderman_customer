import { FONT } from "@utils/constant";
import Snackbar, { SnackBarOptions } from "react-native-snackbar";

/**
 * render snackbar with customization
 * @param  {SnackBarOptions} params
 */
const RenderSnackbar = (params: SnackBarOptions) => {
  return Snackbar.show({
    ...params, fontFamily: FONT.REGULAR, textColor: 'white'
  })
}

export default RenderSnackbar
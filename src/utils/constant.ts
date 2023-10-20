import { StatusBar } from "react-native";

export const INPUT_HEIGHT = '35px';
export const FONT = {
  LIGHT: 'WorkSans-Light',
  REGULAR: 'WorkSans-Regular',
  SEMI_BOLD: 'WorkSans-SemiBold',
  BOLD: 'WorkSans-Bold',
}
// @ts-ignore
export const STATUSBAR_HEIGHT = StatusBar.currentHeight + 2
export const RATINGS_WORDS = ['Meh', 'OK', 'Good', 'Very Good', 'Amazing']

/**
 * ACTION SHEET OPENING ANIMATION CONFIG
 */
export const ACTION_SHEET_ANIMATION = {
  bounciness: 5,
  overshootClamping: false,
};

export const ACTION_SHEET_STYLES = {borderTopRightRadius: 30, borderTopLeftRadius: 30, backgroundColor: 'white', paddingTop: 40}
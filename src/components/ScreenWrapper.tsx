import React from 'react';
import {StatusBar, StatusBarStyle} from 'react-native';
import {Box, useTheme} from 'native-base';

interface ScreenWrapperProps {
  barStyle?: StatusBarStyle;
  translucentBar?: boolean;
  barColor?: string;
  bgColor?: string;
  pad?: boolean;
  noBgImage?: boolean;
}

const ScreenWrapper: React.FunctionComponent<ScreenWrapperProps> = ({
  barStyle = 'light-content',
  barColor,
  bgColor,
  translucentBar,
  children,
  pad = false,
}) => {
  const {colors} = useTheme();
  return (
    <Box
      bg={bgColor ? bgColor : 'bg'}
      h="100%"
      px={pad ? 10 : 0}
      pt={pad ? 10 : 0}>
      <StatusBar
        backgroundColor={
          translucentBar ? 'transparent' : barColor ? barColor : colors.main
        }
        barStyle={barStyle}
        translucent={translucentBar}
      />
      {children}
    </Box>
  );
};

export default ScreenWrapper;

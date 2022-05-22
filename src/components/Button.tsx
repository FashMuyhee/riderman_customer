import React from 'react';
import {Button as NbButton, IButtonProps} from 'native-base';
import {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native';

interface ButtonProps extends IButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  rightIcon?: React.ReactElement;
  leftIcon?: React.ReactElement;
  isBottom?: boolean;
  noShadow?: boolean;
  extraProps?: IButtonProps;
  variant?: 'filled' | 'outlined';
}

const Button: React.FunctionComponent<ButtonProps> = ({
  title,
  onPress,
  rightIcon,
  leftIcon,
  disabled,
  isLoading,
  isBottom,
  noShadow,
  h = '50px',
  fontSize = 12,
  textTransform,
  variant = 'filled',
  bg = 'main',
  color = 'white',
  ...extraProps
}) => {
  const bottomStyle: StyleProp<ViewStyle> = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
  };

  const btnBg = () => {
    if (disabled) {
      return 'justGrey';
    }
    if (variant === 'outlined') {
      return 'offWhite';
    }
    return bg;
  };

  const btnTextColor = () => {
    if (variant == 'outlined') {
      return 'main';
    }
    return color;
  };

  const shadow = () => {
    if (noShadow || variant == 'outlined') return '0';
    return '2';
  };

  return (
    <NbButton
      {...extraProps}
      h={h}
      bgColor={btnBg()}
      rounded={'lg'}
      // my="4"
      borderColor="#D1D6DF"
      borderWidth={variant === 'outlined' ? 1 : 0}
      shadow={shadow()}
      _text={{
        fontSize,
        fontWeight: '600',
        color: btnTextColor(),
        textTransform,
      }}
      endIcon={rightIcon}
      startIcon={leftIcon}
      disabled={disabled}
      isLoading={isLoading}
      style={isBottom ? bottomStyle : undefined}
      _pressed={{
        bg: btnBg(),
      }}
      onPress={onPress}>
      {title}
    </NbButton>
  );
};

export default Button;

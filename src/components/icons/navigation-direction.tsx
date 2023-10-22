import React from 'react';
import {Svg, Path} from 'react-native-svg';

const NavigationDirectionIcon = () => {
  return (
    <Svg width={20} height={20} fill="#178e4e" viewBox="0 0 256 256">
      <Path
        d="M226.35 121l-76.55 23.5a8 8 0 00-5.3 5.3L121 226.35a8 8 0 01-15.21.27l-65.28-176a8 8 0 0110.12-10.16l176 65.28a8 8 0 01-.28 15.26z"
        opacity={0.2}
      />
      <Path d="M229.33 98.21L53.41 33l-.16-.05a16 16 0 00-20.35 20.3 1 1 0 00.05.16l65.26 175.92A15.77 15.77 0 00113.28 240h.3a15.77 15.77 0 0015-11.29l23.56-76.56 76.56-23.56a16 16 0 00.62-30.38zM224 113.3l-76.56 23.56a16 16 0 00-10.58 10.58L113.3 224l-.06-.17L48 48l175.82 65.22.16.06z" />
    </Svg>
  );
};

export default NavigationDirectionIcon;

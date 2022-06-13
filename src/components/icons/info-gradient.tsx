import React from 'react';
import {Svg, Path, Defs, LinearGradient, Stop} from 'react-native-svg';

const InfoGradient = () => {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <Path d="M16 29.5C23.4558 29.5 29.5 23.4558 29.5 16C29.5 8.54416 23.4558 2.5 16 2.5C8.54416 2.5 2.5 8.54416 2.5 16C2.5 23.4558 8.54416 29.5 16 29.5Z" fill="url(#paint0_linear_503_280)" />
      <Path d="M6.5 16C6.5 9.2 11.5 3.6 18 2.7C17.3 2.6 16.7 2.5 16 2.5C8.5 2.5 2.5 8.5 2.5 16C2.5 23.5 8.5 29.5 16 29.5C16.7 29.5 17.3 29.4 18 29.3C11.5 28.4 6.5 22.8 6.5 16Z" fill="#106136" />
      <Path
        d="M16.5 23C15.7 23 15 22.5333 15 22V13.3333C15 12.8 15.7 12.3333 16.5 12.3333C17.3 12.3333 18 12.8 18 13.3333V22C18 22.5333 17.3 23 16.5 23ZM16.5 11C15.7 11 15 10.5333 15 10C15 9.46667 15.7 9 16.5 9C17.3 9 18 9.46667 18 10C18 10.5333 17.3 11 16.5 11Z"
        fill="white"
      />
      <Defs>
        <LinearGradient id="paint0_linear_503_280" x1="16" y1="2.5" x2="16" y2="29.5" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#178F4F" />
          <Stop offset="1" stopColor="#106136" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default InfoGradient;

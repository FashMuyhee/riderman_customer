import React from 'react';
import {Svg, Path, LinearGradient, Stop,Defs} from 'react-native-svg';

const UserIcon = () => {
  return (
    <Svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <Path
        d="M3.4375 2.75C3.4375 2.20299 3.6548 1.67839 4.04159 1.29159C4.42839 0.904798 4.95299 0.6875 5.5 0.6875C6.04701 0.6875 6.57161 0.904798 6.95841 1.29159C7.3452 1.67839 7.5625 2.20299 7.5625 2.75V4.125C7.5625 4.67201 7.3452 5.19661 6.95841 5.58341C6.57161 5.9702 6.04701 6.1875 5.5 6.1875C4.95299 6.1875 4.42839 5.9702 4.04159 5.58341C3.6548 5.19661 3.4375 4.67201 3.4375 4.125V2.75ZM0.6875 8.9375C1.03125 7.90625 3.4375 6.875 4.8125 6.875H6.1875C7.5625 6.875 9.96875 7.90625 10.3125 8.9375V9.625H0.6875V8.9375Z"
        fill="url(#paint0_linear_677_1118)"
      />
      <Defs>
        <LinearGradient id="paint0_linear_677_1118" x1="5.5" y1="0.6875" x2="5.5" y2="9.625" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#178F4F" />
          <Stop offset="1" stopColor="#106136" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default UserIcon;

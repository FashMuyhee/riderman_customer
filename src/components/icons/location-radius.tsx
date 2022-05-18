import React from 'react';
import {Svg, Circle} from 'react-native-svg';

const LocationRadiusIcon = () => {
  return (
    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <Circle opacity="0.2" cx="8.5" cy="8.5" r="8.5" fill="#178F4F" />
      <Circle
        cx="8.76562"
        cy="8.23438"
        r="3.23438"
        fill="#178F4F"
        stroke="white"
        strokeWidth="1.5"
      />
    </Svg>
  );
};

export default LocationRadiusIcon;

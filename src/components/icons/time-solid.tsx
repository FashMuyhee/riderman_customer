import React from 'react';
import {Svg, Path, Defs, LinearGradient,Stop} from 'react-native-svg';

const TimeSolid = () => {
  return (
    <Svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.49984 10.0833C8.03112 10.0833 10.0832 8.03124 10.0832 5.49996C10.0832 2.96865 8.03112 0.916626 5.49984 0.916626C2.96853 0.916626 0.916504 2.96865 0.916504 5.49996C0.916504 8.03124 2.96853 10.0833 5.49984 10.0833ZM5.95817 3.20829C5.95817 2.95516 5.75297 2.74996 5.49984 2.74996C5.2467 2.74996 5.0415 2.95516 5.0415 3.20829V5.31012C5.0415 5.55322 5.13807 5.78637 5.31 5.95829L6.55075 7.19905C6.72973 7.37803 7.01995 7.37803 7.19892 7.19905C7.3779 7.02007 7.3779 6.72985 7.19892 6.55087L5.95817 5.31012V3.20829Z"
        fill="url(#paint0_linear_423_513)"
      />
      <Defs>
        <LinearGradient id="paint0_linear_423_513" x1="5.49984" y1="0.916626" x2="5.49984" y2="10.0833" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#178F4F" />
          <Stop offset="1" stopColor="#106136" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default TimeSolid;

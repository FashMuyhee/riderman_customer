import React from 'react';
import {Svg, Path, Defs, LinearGradient, Stop} from 'react-native-svg';

const ArrowGradient = () => {
  return (
    <Svg width={45} height={17} viewBox="0 0 45 17" fill="none">
      <Path d="M24.7851 13.0984L30.939 6.92751L24.7513 0.722885L24.7851 13.0984Z" fill="url(#paint0_linear_129_10)" />
      <Path d="M26.9988 8.6484L12.386 8.65454L12.3882 4.43059L27.0011 4.42446L26.9988 8.6484Z" fill="url(#paint1_linear_129_10)" />
      <Path d="M1.03442 4.43585L1.03254 8.55481" stroke="url(#paint2_linear_129_10)" />
      <Path d="M5.15967 4.43598L5.15765 8.55481" stroke="url(#paint3_linear_129_10)" />
      <Path d="M9.28467 4.43598L9.28265 8.55481" stroke="url(#paint4_linear_129_10)" />
      <Defs>
        <LinearGradient id="paint0_linear_129_10" x1="27.8452" y1="13.0984" x2="27.8452" y2="0.722885" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#178F4F" />
          <Stop offset="1" stopColor="#106136" />
        </LinearGradient>
        <LinearGradient id="paint1_linear_129_10" x1="19.6924" y1="8.65147" x2="19.6906" y2="4.42753" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#178F4F" />
          <Stop offset="1" stopColor="#106136" />
        </LinearGradient>
        <LinearGradient id="paint2_linear_129_10" x1="1.03348" y1="8.55481" x2="1.03348" y2="4.43585" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#178F4F" />
          <Stop offset="1" stopColor="#106136" />
        </LinearGradient>
        <LinearGradient id="paint3_linear_129_10" x1="5.15866" y1="8.55481" x2="5.15866" y2="4.43598" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#178F4F" />
          <Stop offset="1" stopColor="#106136" />
        </LinearGradient>
        <LinearGradient id="paint4_linear_129_10" x1="9.28366" y1="8.55481" x2="9.28366" y2="4.43598" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#178F4F" />
          <Stop offset="1" stopColor="#106136" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default ArrowGradient;

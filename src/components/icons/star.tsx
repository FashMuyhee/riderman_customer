import React from 'react';
import {Svg, Path, Defs, LinearGradient, Stop} from 'react-native-svg';

const StarIcon = () => {
  return (
    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <Path
        d="M9.78532 11.2169C9.38546 11.5017 6.81977 9.69626 6.3284 9.6923C5.83702 9.68835 3.24246 11.4522 2.84726 11.161C2.45206 10.8698 3.38116 7.87877 3.23309 7.41155C3.08501 6.94433 0.600911 5.02884 0.756525 4.56406C0.912139 4.09929 4.05204 4.05611 4.4519 3.77131C4.85176 3.4865 5.91106 0.538775 6.40244 0.542729C6.89381 0.546683 7.90528 3.51107 8.30048 3.80227C8.69568 4.09348 11.8345 4.18717 11.9825 4.65439C12.1306 5.12161 9.61583 6.99688 9.46021 7.46166C9.3046 7.92643 10.1852 10.9321 9.78532 11.2169Z"
        fill="url(#paint0_linear_758_6055)"
      />
      <Defs>
        <LinearGradient id="paint0_linear_758_6055" x1="0.749513" y1="5.89503" x2="11.9888" y2="5.89503" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FCD635" />
          <Stop offset="1" stopColor="#F7A928" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default StarIcon;

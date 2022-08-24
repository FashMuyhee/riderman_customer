import React from 'react';
import {Svg, Path, LinearGradient, Stop, Defs} from 'react-native-svg';

const CreditCardIcon = ({selected}: {selected: boolean}) => {
  return (
    <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
      <Path
        d="M16.8719 6.53601H5.01589C4.36989 6.53601 3.83789 7.06801 3.83789 7.71401V9.00601C3.83789 9.12001 3.93289 9.21501 4.04689 9.21501H17.8409C17.9549 9.21501 18.0499 9.12001 18.0499 9.00601V7.71401C18.0499 7.04901 17.5179 6.53601 16.8719 6.53601ZM17.8409 10.393H4.04689C3.93289 10.393 3.83789 10.488 3.83789 10.602V14.649C3.83789 15.295 4.36989 15.827 5.01589 15.827H16.8719C17.5179 15.827 18.0499 15.295 18.0499 14.649V10.602C18.0499 10.488 17.9549 10.393 17.8409 10.393ZM7.69489 13.737C7.69489 13.794 7.63789 13.851 7.58089 13.851H5.79489C5.73789 13.851 5.68089 13.794 5.68089 13.737V11.951C5.68089 11.894 5.73789 11.837 5.79489 11.837H7.58089C7.63789 11.837 7.69489 11.894 7.69489 11.951V13.737Z"
        fill="url(#paint0_linear_130_784)"
      />
      <Path
        d="M2.12795 12.2551H2.83095C2.90695 12.2551 2.96395 12.1981 2.96395 12.1221V7.37205C2.96395 6.40305 3.74295 5.62405 4.71195 5.62405H15.029C15.105 5.62405 15.162 5.56705 15.162 5.49105V4.33205C15.162 3.68605 14.63 3.15405 13.984 3.15405H2.69795C1.72895 3.15405 0.949951 3.93305 0.949951 4.90205V11.0581C0.949951 11.7231 1.48195 12.2551 2.12795 12.2551Z"
        fill="url(#paint1_linear_130_784)"
      />
      <Defs>
        <LinearGradient id="paint0_linear_130_784" x1="10.9439" y1="6.53601" x2="10.9439" y2="15.827" gradientUnits="userSpaceOnUse">
          <Stop stopColor={!selected ? '#178F4F' : 'white'} />
          <Stop offset="1" stopColor={!selected ? '#106136' : 'white'} />
        </LinearGradient>
        <LinearGradient id="paint1_linear_130_784" x1="8.05595" y1="3.15405" x2="8.05595" y2="12.2551" gradientUnits="userSpaceOnUse">
          <Stop stopColor={!selected ? '#178F4F' : 'white'} />
          <Stop offset="1" stopColor={!selected ? '#106136' : 'white'} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default CreditCardIcon;

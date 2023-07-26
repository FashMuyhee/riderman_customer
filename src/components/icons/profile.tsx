import React from 'react';
import {Path, Svg} from 'react-native-svg';

type Props = {
  active?: boolean;
};
const ProfileIcon = ({active}: Props) => {
  return (
    <Svg width={21} height={21} viewBox="0 0 18 25" fill="none">
      <Path
        d="M8.994 11.405a2.12 2.12 0 00-.388 0 5.185 5.185 0 01-5.008-5.197A5.204 5.204 0 018.806 1a5.211 5.211 0 015.208 5.208c-.012 2.815-2.229 5.103-5.02 5.197zM3.129 15.733c-2.839 1.9-2.839 4.997 0 6.886 3.226 2.158 8.516 2.158 11.742 0 2.839-1.9 2.839-4.997 0-6.886-3.214-2.147-8.504-2.147-11.742 0z"
        stroke={active ? '#27AE60' : '#292D32'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ProfileIcon;

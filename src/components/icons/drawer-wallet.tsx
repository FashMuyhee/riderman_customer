import {useTheme} from 'native-base';
import React from 'react';
import {Svg, Path} from 'react-native-svg';

const DrawerWalletIcon = ({isFocused}: {isFocused: boolean}) => {
  const {colors} = useTheme();
  const color = isFocused ? colors.main : '#263238';

  return (
    <Svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <Path
        d="M4.44617 16.9349C3.81383 16.9349 3.35417 16.4155 3.35417 15.7773V10.8207C3.35417 10.7434 3.32344 10.6692 3.26874 10.6145C3.21404 10.5598 3.13985 10.5291 3.0625 10.5291C2.98514 10.5291 2.91096 10.5598 2.85626 10.6145C2.80156 10.6692 2.77083 10.7434 2.77083 10.8207V15.7773C2.77083 16.7372 3.49212 17.5183 4.44617 17.5183C4.52352 17.5183 4.59771 17.4875 4.65241 17.4328C4.7071 17.3781 4.73783 17.304 4.73783 17.2266C4.73783 17.1492 4.7071 17.0751 4.65241 17.0204C4.59771 16.9657 4.52352 16.9349 4.44617 16.9349ZM5.8695 16.9457H5.57783C5.50048 16.9457 5.42629 16.9765 5.37159 17.0311C5.31689 17.0858 5.28617 17.16 5.28617 17.2374C5.28617 17.3147 5.31689 17.3889 5.37159 17.4436C5.42629 17.4983 5.50048 17.5291 5.57783 17.5291H5.8695C5.94685 17.5291 6.02104 17.4983 6.07574 17.4436C6.13044 17.3889 6.16117 17.3147 6.16117 17.2374C6.16117 17.16 6.13044 17.0858 6.07574 17.0311C6.02104 16.9765 5.94685 16.9457 5.8695 16.9457Z"
        fill={color}
      />
      <Path
        d="M18.249 9.94587H17.0628V7.27916C17.0628 6.17666 16.0463 5.27949 14.9313 5.27949H14.0852C13.8588 3.11912 12.0266 1.4292 9.80729 1.4292C7.58771 1.4292 5.75575 3.11912 5.52913 5.27949H2.64133C1.52629 5.27949 0.729168 6.17666 0.729168 7.27916V17.5274C0.729168 18.6542 1.52658 19.5709 2.64133 19.5709H14.9313C16.046 19.5709 17.0625 18.6542 17.0628 17.5274V15.1959H18.249C18.7852 15.1958 19.2994 14.9827 19.6786 14.6036C20.0577 14.2244 20.2708 13.7102 20.2708 13.174H20.2711V11.9674C20.271 11.4312 20.0579 10.917 19.6787 10.5379C19.2994 10.1588 18.7852 9.94587 18.249 9.94587ZM9.80729 2.59587C11.3823 2.59587 12.686 3.76457 12.9063 5.27949H6.70804C6.92796 3.76457 8.23171 2.59587 9.80729 2.59587ZM15.8961 17.5274C15.8961 18.0026 15.395 18.4042 14.9313 18.4042H2.64133C2.17788 18.4042 1.89583 18.0026 1.89583 17.5274V7.27887C1.89583 6.81191 2.16183 6.44587 2.64133 6.44587H14.9313C15.4111 6.44587 15.8961 6.81162 15.8961 7.27887V9.94587H14.126C13.5898 9.94587 13.0756 10.1588 12.6965 10.5379C12.3173 10.917 12.1042 11.4312 12.1042 11.9674V13.174C12.1042 13.7102 12.3173 14.2244 12.6964 14.6036C13.0756 14.9827 13.5898 15.1958 14.126 15.1959H15.8961V17.5274ZM19.1045 13.174C19.1044 13.4009 19.0142 13.6184 18.8538 13.7787C18.6934 13.9391 18.4758 14.0292 18.249 14.0292H14.126C13.8992 14.0292 13.6817 13.9391 13.5213 13.7787C13.3609 13.6184 13.2708 13.4008 13.2708 13.174V11.9674C13.2708 11.7406 13.3609 11.5231 13.5213 11.3627C13.6817 11.2023 13.8992 11.1122 14.126 11.1122H18.2493C18.4761 11.1122 18.6936 11.2023 18.854 11.3627C19.0144 11.5231 19.1045 11.7406 19.1045 11.9674H19.1047V13.174H19.1045Z"
        fill={color}
      />
      <Path
        d="M14.7414 13.1078C15.0502 13.1078 15.3005 12.8574 15.3005 12.5486C15.3005 12.2398 15.0502 11.9895 14.7414 11.9895C14.4326 11.9895 14.1823 12.2398 14.1823 12.5486C14.1823 12.8574 14.4326 13.1078 14.7414 13.1078Z"
        fill={color}
      />
    </Svg>
  );
};

export default DrawerWalletIcon;
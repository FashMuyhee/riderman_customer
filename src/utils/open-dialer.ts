import {Linking} from 'react-native';

/**
 *  open device dialer to perform a call
 * @param tel string
 */
const openDialer = (tel: string) => {
  Linking.openURL(`tel:${tel}`);
};

export default openDialer;

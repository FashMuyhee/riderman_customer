import React, {useMemo} from 'react';
import {HStack, Text, View, Image} from 'native-base';
import {BottomSheetWrapperSnappy} from '@components/BottomSheetWrapper';
import BottomSheet from '@gorhom/bottom-sheet';
import {hp} from '@utils/responsive';
import MapView, {Marker} from 'react-native-maps';
import mapStyle from '@utils/map-style';
import {StyleSheet} from 'react-native';
import useGetLocation from '@hooks/useGetLocation';
import {Center} from 'native-base';
import {Spinner} from 'native-base';

type Props = {
  riderId: string;
  onClose: () => void;
};

const RiderDeliveryMap = React.forwardRef<BottomSheet, Props>(({onClose, riderId}, ref) => {
  const snapPoints = useMemo(() => ['100%'], []);
  const mapRef = React.useRef<MapView>(null);
  const {location, loading, getLocation} = useGetLocation();
  const cords = location?.coords;

  React.useEffect(() => {
    if (cords && mapRef.current) {
      mapRef.current.animateToRegion({
        // @ts-ignore
        latitude: parseFloat(cords?.latitude),
        // @ts-ignore
        longitude: parseFloat(cords?.longitude),
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034,
      });
    }
  }, []);

  return (
    <BottomSheetWrapperSnappy noIndicator showBackdrop index={-1} ref={ref} snapPoints={snapPoints}>
      <View px="20px" w="full">
        {loading ? (
          <Center flex="1" bg="yellow.700">
            <Spinner size="lg" color="main" />
          </Center>
        ) : (
          <MapView
            ref={mapRef}
            initialRegion={{
              latitude: cords?.latitude as number,
              longitude: cords?.longitude as number,
              latitudeDelta: 0.0043,
              longitudeDelta: 0.0034,
            }}
            provider="google"
            style={StyleSheet.absoluteFill}
            minZoomLevel={1}
            userInterfaceStyle="light"
            customMapStyle={mapStyle}
            rotateEnabled={false}
            showsTraffic
            loadingEnabled={loading}
            loadingIndicatorColor="#44bb61">
            <Marker
              coordinate={{
                latitude: cords?.latitude as number,
                longitude: cords?.longitude as number,
              }}>
              {/* <Image source={userPin} resizeMode="center" alt="user_location" w="80px" h="80px" /> */}
              <View width="50px" h="50px" bg="green.100" />
            </Marker>
          </MapView>
        )}
      </View>
    </BottomSheetWrapperSnappy>
  );
});

export default RiderDeliveryMap;

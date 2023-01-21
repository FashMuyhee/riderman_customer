import React, {useRef, useEffect, useState} from 'react';
import {IconButton, Image, useTheme, View, Spinner, Center} from 'native-base';
import {hp} from '@utils/responsive';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet} from 'react-native';
import useGetLocation from '@hooks/useGetLocation';
import LocationIcon from '@components/icons/location';
import mapStyle from '@utils/map-style';
import bikeIllus from '@images/icons/bike.png';
import userPin from '@images/icons/user-location.png';
import deliveryService from '@services/Delivery';
import {IRider} from '@models/delivery';

export type IMapSectionProps = {};

const MapSection: React.FC<IMapSectionProps> = ({}) => {
  const {location, loading, getLocation} = useGetLocation();
  const cords = location?.coords;
  const {colors} = useTheme();
  const mapRef = useRef<MapView>(null);
  const [riders, setRiders] = useState<IRider[]>([]);

  const getOnlineRiders = async (lat: number, lng: number) => {
    try {
      const res = await deliveryService.getOnlineRiders(lat, lng);
      if (res.success) {
        setRiders(res.data);
      }
    } catch (error) {}
  };
  const goCurrentLocation = async () => {
    await getLocation();
    if (cords && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: cords?.latitude,
        longitude: cords?.longitude,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034,
      });
    }
  };

  useEffect(() => {
    if (cords && mapRef.current) {
      mapRef.current.animateToRegion({
        // @ts-ignore
        latitude: parseFloat(cords?.latitude),
        // @ts-ignore
        longitude: parseFloat(cords?.longitude),
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034,
      });
      getOnlineRiders(cords.latitude, cords.longitude);
    }
  }, []);

  return (
    <View h={hp(80)} w="full">
      {loading ? (
        <Center flex="1" bg="coolGray.200">
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
          loadingIndicatorColor={colors.main}>
          {riders.map((rider, index) => (
            <Marker key={rider.riderId} coordinate={{latitude: parseFloat(rider.location.lat), longitude: parseFloat(rider.location.long)}}>
              <Image source={bikeIllus} resizeMode="center" alt="bike" w="30px" h="30px" />
            </Marker>
          ))}

          <Marker
            coordinate={{
              latitude: cords?.latitude as number,
              longitude: cords?.longitude as number,
            }}>
            <Image source={userPin} resizeMode="center" alt="user_location" w="80px" h="80px" />
          </Marker>
        </MapView>
      )}
      <IconButton
        icon={<LocationIcon />}
        onPress={goCurrentLocation}
        bg="white"
        size={10}
        position="absolute"
        bottom={hp(10)}
        right="30px"
        rounded="full"
        shadow="1"
        _pressed={{background: 'white'}}
      />
    </View>
  );
};

export default MapSection;

import React, {useRef, useEffect} from 'react';
import {IconButton, useTheme, View} from 'native-base';
import {hp} from '@utils/responsive';
import MapView from 'react-native-maps';
import {StyleSheet} from 'react-native';
import useGetLocation from '@hooks/useGetLocation';
import LocationIcon from '@components/icons/location';
import mapStyle from '@utils/map-style';

export type IMapSectionProps = {};

const MapSection: React.FC<IMapSectionProps> = ({}) => {
  const {location, loading, getLocation} = useGetLocation();
  const cords = location?.coords;
  const {colors} = useTheme();
  const mapRef = useRef<MapView>(null);

  /* const regionFrom = (lat: number, lon: number, accuracy: number) => {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;

    const latitudeDelta = accuracy / oneDegreeOfLatitudeInMeters;
    const longitudeDelta =
      accuracy /
      (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

    return {
      latitudeDelta,
      longitudeDelta,
    };
  }; */

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
    }
  }, [location]);

  return (
    <View h={hp(80)} w="full">
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: 6.7275658,
          longitude: 3.3086788,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
        style={StyleSheet.absoluteFill}
        userInterfaceStyle="light"
        customMapStyle={mapStyle}
        // showsUserLocation
        rotateEnabled={false}
        showsTraffic
        loadingEnabled={loading}
        loadingIndicatorColor={colors.main}
      />
      <IconButton
        icon={<LocationIcon />}
        onPress={getLocation}
        bg="white"
        size={10}
        position="absolute"
        bottom={hp(7)}
        right="30px"
        rounded={'full'}
        shadow="1"
        _pressed={{background: 'white'}}
      />
    </View>
  );
};

export default MapSection;

import React, {useRef, useEffect} from 'react';
import {IconButton, useTheme, View} from 'native-base';
import {hp} from '@utils/responsive';
import MapView from 'react-native-maps';
import {StyleSheet} from 'react-native';
import useGetLocation from '@hooks/useGetLocation';
import LocationIcon from '@components/icons/location';

export type IMapSectionProps = {};

const MapSection: React.FC<IMapSectionProps> = ({}) => {
  const {location, loading, getLocation} = useGetLocation();
  const cords = location?.coords;
  const {colors} = useTheme();
  const mapRef = useRef<MapView>(null);

  const regionFrom = (lat: number, lon: number, accuracy: number) => {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;

    const latitudeDelta = accuracy / oneDegreeOfLatitudeInMeters;
    const longitudeDelta =
      accuracy /
      (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

    return {
      latitudeDelta,
      longitudeDelta,
    };
  };

  useEffect(() => {
    if (cords && mapRef.current) {
      // mapRef.current.animateCamera({
      //   center: {
      //     // @ts-ignore
      //     latitude: parseFloat(cords?.latitude),
      //     // @ts-ignore
      //     longitude: parseFloat(cords?.longitude),
      //   },
      //   zoom: 16,
      //   // @ts-ignore
      //   altitude: cords.altitude,
      //   // @ts-ignore
      //   heading: cords.heading,
      //   pitch: 1000,
      // });
      const {latitudeDelta, longitudeDelta} = regionFrom(
        cords?.latitude,
        cords?.longitude,
        cords.accuracy,
      );
      mapRef.current.animateToRegion({
        // @ts-ignore
        latitude: parseFloat(cords?.latitude),
        // @ts-ignore
        longitude: parseFloat(cords?.longitude),
       /*  latitudeDelta,
        longitudeDelta, */
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034
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
        mapType="standard"
        userInterfaceStyle="light"
        // showsUserLocation
        // userLocationAnnotationTitle="James"
        // followsUserLocation
        // userLocationCalloutEnabled
        // showsMyLocationButton
        rotateEnabled={false}
        showsTraffic
        tintColor="white"
        loadingEnabled={loading}
        loadingIndicatorColor={colors.main}
        // initialCamera={{
        //   center: {latitude: 6.7275658, longitude: 3.3086788},
        //   altitude: 15000,
        //   heading: 0,
        //   zoom: 15,
        //   pitch: 1,
        // }}
        // camera={{
        //   center: {
        //     // @ts-ignore
        //     latitude: parseFloat(cords?.latitude),
        //     // @ts-ignore
        //     longitude: parseFloat(cords?.longitude),
        //   },
        //   // @ts-ignore
        //   heading: parseInt(cords.heading),
        //   // @ts-ignore
        //   altitude: cords?.altitude,
        //   pitch: 0,
        //   zoom: 15,
        // }}
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

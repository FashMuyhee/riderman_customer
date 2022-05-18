import React, {useRef, useEffect} from 'react';
import {IconButton, Image, useTheme, View} from 'native-base';
import {hp} from '@utils/responsive';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet} from 'react-native';
import useGetLocation from '@hooks/useGetLocation';
import LocationIcon from '@components/icons/location';
import mapStyle from '@utils/map-style';
import {bikes} from '@utils/sample-data';
import bikeIllus from '@images/icons/bike.png';
import userPin from '@images/icons/user-location.png';

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
        minZoomLevel={18}
        userInterfaceStyle="light"
        customMapStyle={mapStyle}
        rotateEnabled={false}
        showsTraffic
        loadingEnabled={loading}
        loadingIndicatorColor={colors.main}>
        {bikes.map((bike, index) => (
          <Marker key={index} coordinate={{...bike}}>
            <Image
              source={bikeIllus}
              borderWidth={1}
              resizeMode="center"
              alt="bike"
              w="30px"
              h="30px"
              style={{
                transform: [
                  {
                    rotate: `${bike.heading}deg`,
                  },
                ],
              }}
            />
          </Marker>
        ))}

        <Marker
          coordinate={{
            // @ts-ignore
            latitude: parseFloat(cords?.latitude),
            // @ts-ignore
            longitude: parseFloat(cords?.longitude),
          }}>
          <Image
            source={userPin}
            borderWidth={1}
            resizeMode="center"
            alt="user_location"
            w="80px"
            h="80px"
          />
        </Marker>
      </MapView>
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

import React, {useRef, useEffect, useState} from 'react';
import {IconButton, Image, useTheme, View} from 'native-base';
import {hp} from '@utils/responsive';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet} from 'react-native';
import useGetLocation from '@hooks/useGetLocation';
import mapStyle from '@utils/map-style';
import {bikes} from '@utils/sample-data';
import bikeIllus from '@images/icons/bike.png';
// @ts-ignore
import {G_MAP_KEY} from '@env';
import MapViewDirections from 'react-native-maps-directions';

export type IMapSectionProps = {
  height?: number;
};

const MapSection: React.FC<IMapSectionProps> = ({height = hp(40)}) => {
  const {location, loading, getLocation} = useGetLocation();
  const {colors} = useTheme();
  const mapRef = useRef<MapView>(null);
  const [coordinates] = useState([
    {
      latitude: 6.545654504207982,
      longitude: 3.3955299324844184,
    },
    {
      latitude: 6.544355082389553,
      longitude: 3.395295243282711,
    },
  ]);

  return (
    <View h={height} w="full">
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}
        provider="google"
        style={StyleSheet.absoluteFill}
        minZoomLevel={18}
        customMapStyle={mapStyle}
        rotateEnabled={false}
        loadingEnabled={loading}
        loadingIndicatorColor={colors.main}>
        <MapViewDirections origin={coordinates[0]} destination={coordinates[1]} apikey={G_MAP_KEY} strokeWidth={4} strokeColor={colors.main} />
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
      </MapView>
    </View>
  );
};

export default MapSection;

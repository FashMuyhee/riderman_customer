import React, {useRef} from 'react';
import {useTheme, View} from 'native-base';
import {hp} from '@utils/responsive';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet} from 'react-native';
import mapStyle from '@utils/map-style';
// @ts-ignore
import {G_MAP_KEY} from '@env';
import MapViewDirections from 'react-native-maps-directions';

type Coordinate = {
  latitude: number;
  longitude: number;
};
export type IMapSectionProps = {
  height?: number;
  coordinates?: Coordinate[];
};

const MapSection: React.FC<IMapSectionProps> = ({
  height = hp(40),
  coordinates,
}) => {
  const {colors} = useTheme();
  const mapRef = useRef<MapView>(null);

  const cords = React.useMemo(() => {
    if (coordinates) return coordinates as Coordinate[];
    return [];
  }, [coordinates]);

  return (
    <View h={height} w="full">
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: cords[0]?.latitude,
          longitude: cords[0]?.longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}
        provider="google"
        style={StyleSheet.absoluteFill}
        minZoomLevel={5}
        customMapStyle={mapStyle}
        rotateEnabled={false}
        loadingEnabled
        loadingIndicatorColor={colors.main}>
        <MapViewDirections
          origin={cords[0]}
          destination={cords[1]}
          apikey={G_MAP_KEY}
          strokeWidth={4}
          strokeColor={colors.main}
        />
        <Marker coordinate={cords[0]} />
        <Marker coordinate={cords[1]} />
      </MapView>
    </View>
  );
};

export default MapSection;

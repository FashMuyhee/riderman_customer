import React, {useMemo} from 'react';
import {View} from 'native-base';
import MapView, {Marker} from 'react-native-maps';
import mapStyle from '@utils/map-style';
import {StyleSheet} from 'react-native';
import useGetLocation from '@hooks/useGetLocation';
import {Center} from 'native-base';
import {Spinner} from 'native-base';
import {SheetNavigationHeader} from '@components';
import {RouteScreenProps} from 'react-native-actions-sheet';
import pusherEventService from '@services/Pusher';
import {PusherEvent} from '@pusher/pusher-websocket-react-native';

export const RiderLocationSheet = ({router, params}: RouteScreenProps) => {
  const {deliveryId} = params;
  const mapRef = React.useRef<MapView>(null);
  const {location, loading, getLocation} = useGetLocation();
  const cords = location?.coords;

  const pusher = pusherEventService.pusher;

  // React.useEffect(() => {
  //   if (cords && mapRef.current) {
  //     mapRef.current.animateToRegion({
  //       // @ts-ignore
  //       latitude: parseFloat(cords?.latitude),
  //       // @ts-ignore
  //       longitude: parseFloat(cords?.longitude),
  //       latitudeDelta: 0.0043,
  //       longitudeDelta: 0.0034,
  //     });
  //   }
  // }, []);

  const onEventChange = async () => {
    await pusher.connect();

    await pusher.subscribe({
      channelName: `deliveries.${deliveryId}`,
      onEvent: ({eventName, data}: PusherEvent) => {
        console.log('🚀 ~ file: RiderLocation.tsx:41 ~ onEventChange ~ eventName, data:', eventName, data);
        if (eventName === 'CurrentRiderLocation') {
          console.log(data);
        }
      },
    });
  };

  React.useEffect(() => {
    onEventChange();
    return () => {
      pusher.unsubscribe({
        channelName: `deliveries.${deliveryId}`,
      });
      pusher.disconnect();
    };
  }, []);

  return (
    <View h="full" w="full" overflow="hidden">
      <SheetNavigationHeader onClose={() => router.goBack()} title="Rider's Location" />

      {loading ? (
        <Center flex="1">
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
          style={{flex: 1, marginTop: '-5%'}}
          minZoomLevel={1}
          userInterfaceStyle="light"
          customMapStyle={mapStyle}
          rotateEnabled={false}
          showsTraffic
          loadingEnabled={loading}
          showsUserLocation
          loadingIndicatorColor="#01b986">
          <Marker
            style={{width: 60, height: 60}}
            coordinate={{
              latitude: cords?.latitude as number,
              longitude: cords?.longitude as number,
            }}>
            <Center bg="#01b98650" size="50px" borderRadius="50px">
              <View bg="#01b986" size="10px" rounded="full" />
            </Center>
          </Marker>
        </MapView>
      )}
    </View>
  );
};

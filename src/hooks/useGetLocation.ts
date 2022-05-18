import React, { useState, useEffect, useRef } from 'react'
import { Alert, Linking, PermissionsAndroid, Platform, ToastAndroid } from 'react-native';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';

const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert('Location permission denied');
  }

  if (status === 'disabled') {
    Alert.alert(
      `Turn on Location Services to allow riderman to determine your location.`,
      '',
      [
        { text: 'Go to Settings', onPress: openSetting },
        { text: "Don't Use Location", onPress: () => { } },
      ],
    );
  }

  return false;
};

const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show(
      'Location permission denied by user.',
      ToastAndroid.LONG,
    );
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};


const useGetLocation = () => {
  const [location, setLocation] = useState<GeoPosition | null>({
    coords: {
      latitude: 6.7275658,
      longitude: 3.3086788,
    }
  });
  const [isLading, setIsLoading] = useState(true)

  const watchId = useRef(null);

  const getLocationUpdates = async () => {

    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      setIsLoading(false)
      return;
    }

    /*   if (Platform.OS === 'android' && foregroundService) {
        await startForegroundService();
      }
   */

    // @ts-ignore
    watchId.current = Geolocation.watchPosition(
      (position) => {
        setLocation(position);
        setIsLoading(false)
      },
      (error) => {
        setLocation(null);
        setIsLoading(false)
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
        forceRequestLocation: true,
        // forceLocationManager: useLocationManager,
        // showLocationDialog: locationDialog,
        // useSignificantChanges: significantChanges,
      },
    );
  };

  const removeLocationUpdates = () => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        // forceRequestLocation: forceLocation,
        // forceLocationManager: useLocationManager,
        // showLocationDialog: locationDialog,
      },
    );
  };

  useEffect(() => {
    getLocationUpdates()
    return () => {
      removeLocationUpdates()
    }
  }, [])

  return { location, loading: isLading, getLocation }

}

export default useGetLocation
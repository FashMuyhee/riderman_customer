import { useState, useEffect, useRef } from 'react'
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

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    ToastAndroid.show(
      'Location permission denied',
      ToastAndroid.LONG,
    );
  }
  if (status === 'never_ask_again') {
    ToastAndroid.show(
      'Location permission revoked',
      ToastAndroid.LONG,
    );
  }

  return false;
};


const useGetLocation = () => {
  const watchId = useRef(null);
  const [location, setLocation] = useState<GeoPosition | null>(null);
  const [isLoading, setIsLoading] = useState(true)



  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();
    if (hasPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
        },
        (error) => {
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
        },
      );
    }
  };

  const getLocationUpdates = async () => {

    const hasPermission = await hasLocationPermission();
    if (!hasPermission) return false

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
          ios: 'bestForNavigation',
        },
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
        forceRequestLocation: true,
      },
    );
  };

  const removeLocationUpdates = () => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }

  useEffect(() => {
    getLocationUpdates()
    return () => {
      removeLocationUpdates()
    }
  }, [])

  return { location, loading: isLoading, getLocation }

}

export default useGetLocation
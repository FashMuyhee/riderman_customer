import {Alert, Image} from 'react-native';
import React, {useState} from 'react';
import GalleryAddIcon from '@components/icons/gallery-add';
import {HStack, Pressable, Text, View} from 'native-base';
import useAuth from '@contexts/useAuth';
import authService from '@services/Auth';
import {RenderSnackbar} from '@components';
import {IUser} from '@models/auth';
import ImageCropPicker, {
  Image as CameraResponse,
} from 'react-native-image-crop-picker';

const ProfileImage = () => {
  const {updateUser, user} = useAuth();
  const [image, setImage] = useState<CameraResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handlePickFile = async () => {
    Alert.alert('Change Profile Image', 'Select one of the Options', [
      {
        text: 'From Gallery',
        onPress: handleOpenGallery,
      },
      {
        text: 'Use Camera',
        onPress: handleOpenCamera,
        style: 'default',
      },
      {text: 'Close', style: 'cancel'},
    ]);
  };

  const handleOpenCamera = async () => {
    try {
      const res = await ImageCropPicker.openCamera({
        cropping: true,
        width: 300,
        height: 400,
        includeBase64: true,
      });
      setImage(res);
    } catch (error) {
      // TODO HANDLE CANCELLED
    }
  };

  const handleOpenGallery = async () => {
    try {
      const res = await ImageCropPicker.openPicker({
        cropping: true,
        width: 300,
        height: 400,
        includeBase64: true,
      });
      setImage(res);
    } catch (error) {
      // TODO HANDLE CANCELLED
    }
  };

  const renderImage = (image: string) => {
    return (
      <Image
        source={{uri: image}}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 50,
          resizeMode: 'cover',
        }}
      />
    );
  };

  const IMAGE_SELECTED = !!image?.path;
  const IMAGE_PRESENT = !!image?.path || !!user?.image;

  const handleSave = async () => {
    const imageBase64 = `data:${image?.mime};base64,${image?.data}` as string;

    try {
      RenderSnackbar({text: 'Uploading Image....', duration: 'LONG'});

      const res = await authService.updateImage(imageBase64);
      if (res?.statusCode === 200) {
        RenderSnackbar({text: res.message, duration: 'LONG'});
        updateUser({...user, image: res?.data?.image});
        setImage(null);
      } else {
        RenderSnackbar({
          text: 'Something went wrong,Please Try Again',
          duration: 'LONG',
        });
      }
      setSubmitting(false);
    } catch (error) {
      RenderSnackbar({
        text: 'Something went wrong,Please Try Again',
        duration: 'LONG',
      });
      setSubmitting(false);
    }
  };
  return (
    <>
      <HStack space="3" alignItems="center" mt="15px">
        <Pressable
          onPress={handlePickFile}
          borderColor="accent"
          borderStyle="dashed"
          height="100px"
          w="100px"
          borderWidth={IMAGE_PRESENT ? 0 : 1}
          rounded="full"
          alignItems="center">
          {renderImage(
            IMAGE_SELECTED ? (image?.path as string) : (user?.image as string),
          )}
          <View
            position="absolute"
            alignItems="center"
            alignSelf="center"
            top="38px"
            bottom="38px">
            <GalleryAddIcon />
          </View>
        </Pressable>
        <Text
          color="main"
          onPress={() => {
            if (IMAGE_SELECTED) {
              handleSave();
            } else {
              handlePickFile();
            }
          }}>
          {IMAGE_SELECTED ? 'Upload Selected Image' : 'Tap to Change'}
        </Text>
      </HStack>
    </>
  );
};

export default ProfileImage;

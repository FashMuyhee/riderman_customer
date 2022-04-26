import React from 'react';
import {View, Image, HStack, Text, Pressable, Divider} from 'native-base';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import avatar from '@images/avatar.png';
import EditIcon from '@components/icons/edit';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <View style={{flex: 1, marginTop: '5%'}}>
      <DrawerContentScrollView {...props} style={{paddingHorizontal: 30}}>
        <View mt="4" mb="20px">
          <HStack alignItems="center" space="3">
            <Image
              source={avatar}
              rounded="full"
              style={{
                width: 60,
                height: 60,
              }}
              alignSelf={'flex-start'}
              alt="avatar"
              resizeMode="contain"
            />
            <View>
              <Text bold fontSize="14px">
                James Lewis
              </Text>
              <Pressable
                w={70}
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between">
                <Text color="grey.200" fontSize="10px">
                  Edit Profile
                </Text>
                <EditIcon />
              </Pressable>
            </View>
          </HStack>
        </View>
        <Divider mb="30px" mt="10px" />
        <View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawerContent;

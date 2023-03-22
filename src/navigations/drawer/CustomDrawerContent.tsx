import React from 'react';
import {View, Image, HStack, Text, Pressable, Divider} from 'native-base';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import avatar from '@images/avatar.png';
import EditIcon from '@components/icons/edit';
import {AuthContext} from '@contexts/AuthContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {GuardStackParamList} from '@navigations/param-list';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {user, logout} = React.useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<GuardStackParamList>>();

  return (
    <View style={{flex: 1, marginTop: '5%'}}>
      <DrawerContentScrollView {...props} style={{paddingHorizontal: 30}}>
        <Pressable
          mt="4"
          mb="20px"
          onPress={() => navigation.navigate('profile')}>
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
                {user?.firstName} {user?.lastName}
              </Text>
              <View
                w="70px"
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between">
                <Text color="grey.200" fontSize="10px">
                  Edit Profile
                </Text>
                <EditIcon />
              </View>
            </View>
          </HStack>
        </Pressable>
        <Divider mb="30px" mt="10px" />
        <View>
          <DrawerItemList {...props} />
        </View>
        <View
          bottom="0px"
          w="90%"
          h="140px"
          pt="4"
          borderTopWidth={'1'}
          borderTopColor={'border'}>
          <DrawerItem
            label="Logout"
            onPress={logout}
            // icon={() => {
            //   return <Feather name="log-out" size={27} color={'#7A7992'} />;
            // }}
            style={{marginLeft: -6}}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawerContent;

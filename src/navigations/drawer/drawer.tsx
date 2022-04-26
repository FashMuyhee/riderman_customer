import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import {useTheme} from 'native-base';
import GuardStack from '../stack/guard';
import TimeIcon from '@components/icons/timer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const {colors} = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      defaultStatus="open"
      initialRouteName="stack"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.bg,
        },
        drawerInactiveTintColor: 'black',
        drawerActiveTintColor: colors.main,
        drawerItemStyle: {
          height: 50,
          width: '100%',
          marginLeft: -5,
          marginBottom: -5,
        },
        headerTitleAlign: 'center',
        drawerType: 'front',
        drawerActiveBackgroundColor: colors.bg,
        drawerLabelStyle: {
          fontFamily: 'Raleway-Regular',
          fontSize: 14,
          marginLeft: -10,
        },
      }}>
      <Drawer.Screen
        name="guard_stack"
        component={GuardStack}
        options={{
          drawerLabel: 'Delivery History',
          drawerIcon: ({focused}) => <TimeIcon isFocused={focused} />,
          headerShown: false,
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="delivery_history"
        component={GuardStack}
        options={{
          drawerLabel: 'Delivery History',
          drawerIcon: ({focused}) => <TimeIcon isFocused={focused} />,
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import {useTheme, View} from 'native-base';
import GuardStack from '../stack/guard';
import TimeIcon from '@components/icons/time';
import MyWallet from '@screens/wallet';
import DrawerWalletIcon from '@components/icons/drawer-wallet';
import {FONT} from '@utils/constant';
import {useNavigation} from '@react-navigation/native';
import DeliveryHistoryTab from '@screens/delivery-history';
import Profile from '@screens/profile';
import Transactions from '@screens/wallet/transactions';
import DrawerTransactionIcon from '@components/icons/drawer-order';
import ProfileIcon from '@components/icons/profile';
import HomeIcon from '@components/icons/home';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const {colors} = useTheme();
  const {goBack} = useNavigation();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      defaultStatus="closed"
      initialRouteName="guard_stack"
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
          fontFamily: FONT.REGULAR,
          fontSize: 14,
          marginLeft: -10,
        },
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: colors.main,
        },
        headerTitleStyle: {
          fontFamily: FONT.REGULAR,
          color: 'white',
          textTransform: 'capitalize',
          fontSize: 16,
        },
      }}>
      <Drawer.Screen
        name="guard_stack"
        component={GuardStack}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({focused}) => <HomeIcon active={focused} />,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="delivery_history"
        component={DeliveryHistoryTab}
        options={{
          drawerLabel: 'Delivery History',
          drawerIcon: ({focused}) => <TimeIcon isFocused={focused} />,
          headerShown: true,
          headerTitle: 'Delivery History',
        }}
      />
      <Drawer.Screen
        name="wallet"
        component={MyWallet}
        options={{
          drawerLabel: 'Wallet',
          drawerIcon: ({focused}) => <DrawerWalletIcon isFocused={focused} />,
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="transactions"
        component={Transactions}
        options={{
          drawerLabel: 'Transactions',
          drawerIcon: ({focused}) => (
            <DrawerTransactionIcon isFocused={focused} />
          ),
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="profile"
        component={Profile}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({focused}) => <ProfileIcon active={focused} />,
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

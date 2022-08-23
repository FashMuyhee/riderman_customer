import {View, Text, useTheme} from 'native-base';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FONT} from '@utils/constant';
import HistoryList from './components/HistoryList';

type IProps = {};

const TopTabs = createMaterialTopTabNavigator();

const DeliveryHistoryTab = (props: IProps) => {
  const {colors} = useTheme();

  return (
    <TopTabs.Navigator
      initialRouteName="Processing"
      screenOptions={{
        tabBarInactiveTintColor: colors.grey[200],
        tabBarActiveTintColor: colors.main,
        tabBarLabelStyle: {
          fontFamily: FONT.SEMI_BOLD,
          fontSize: 12,
          textTransform: 'capitalize',
        },
        tabBarPressColor: 'white',
        tabBarStyle: {
          backgroundColor: colors.white,
          height: 50,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.main,
        },
      }}
      transitionStyle="scroll">
      <TopTabs.Screen name="Processing">{() => <HistoryList status="Processing" />}</TopTabs.Screen>
      <TopTabs.Screen name="Active">{() => <HistoryList status="Active" />}</TopTabs.Screen>
      <TopTabs.Screen name="Completed">{() => <HistoryList status="Completed" />}</TopTabs.Screen>
      <TopTabs.Screen name="Confirmed">{() => <HistoryList status="Confirmed" />}</TopTabs.Screen>
    </TopTabs.Navigator>
  );
};

export default DeliveryHistoryTab;

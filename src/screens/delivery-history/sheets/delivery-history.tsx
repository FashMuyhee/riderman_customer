import React from 'react';
import {ACTION_SHEET_ANIMATION, ACTION_SHEET_STYLES} from '@utils/constant';
import ActionSheet, {ActionSheetRef, Route, SheetProps} from 'react-native-actions-sheet';
import {TipRiderSheet} from './TipRider';
import {RateDeliverySheet} from './RateDelivery';
import {DeliveryDetailSheet} from './DeliveryDetailSheet';
import {RiderLocationSheet} from './RiderLocation';

export const DeliveryHistorySheet = ({sheetId, payload}: SheetProps) => {
  const ref = React.useRef<ActionSheetRef>(null);

  const routes: Route[] = [
    {
      name: 'delivery-details',
      component: DeliveryDetailSheet,
      params: payload,
    },
    {
      name: 'rate-delivery',
      component: RateDeliverySheet,
      params: payload,
    },
    {
      name: 'tip-rider',
      component: TipRiderSheet,
    },
    {
      name: 'rider-location',
      component: RiderLocationSheet,
    },
  ];

  return (
    <ActionSheet
      id={sheetId}
      ref={ref}
      keyboardHandlerEnabled
      containerStyle={ACTION_SHEET_STYLES}
      openAnimationConfig={ACTION_SHEET_ANIMATION}
      enableRouterBackNavigation={true}
      routes={routes}
      initialRoute="delivery-details"
    />
  );
};

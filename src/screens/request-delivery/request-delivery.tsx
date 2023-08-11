import React, {useState} from 'react';
import {Text, View, ScrollView} from 'native-base';
import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, RenderSnackbar, ScreenWrapper} from '@components';
import FormInput from './components/FormInput';
import {IDeliveryRequestBody, LocationValue} from '@models/delivery';

export type IRequestDeliveryProps = {
  navigation: StackNavigationProp<GuardStackParamList, 'request_delivery'>;
};

const initialValues: IDeliveryRequestBody = {
  pickupLocation: {
    address: 'Tobbles Schools, Agege, Nigeria',
    lat: '6.5850218',
    long: '3.3968166',
  },
  deliveryLocation: {
    address: '1 Ibrahim Kolapo St, 112105, Agege, Ogun State, Nigeria',
    lat: '6.5746253',
    long: '3.3850089',
  },
  instruction: 'Fragile',
  packageTypes: ['Wears'],
  weight: '1',
  packageNo: '',
  rName: 'Ade Olu',
  rPhone: '',
  rEmail: '',
};

const RequestDelivery: React.FC<IRequestDeliveryProps> = ({navigation}) => {
  const [requestValues, setRequestValues] = useState<
    Array<IDeliveryRequestBody>
  >([initialValues]);
  const currentIndex = requestValues.length - 1;

  const handleFormChange =
    (index: number, key: string) =>
    (value: string | string[] | LocationValue) => {
      let newRequestValue = [...requestValues];
      newRequestValue[index] = {...newRequestValue[index], [key]: value};
      setRequestValues(newRequestValue);
    };

  const handleValidation = () => {
    const values = requestValues[currentIndex];
    if (values.pickupLocation == null || !values.pickupLocation.address) {
      RenderSnackbar({text: 'Enter Pick up location'});
      return false;
    }
    if (values.deliveryLocation == null || !values.deliveryLocation.address) {
      RenderSnackbar({text: 'Enter Delivery location'});
      return false;
    }
    if (!values.rPhone) {
      RenderSnackbar({text: 'Enter recipient phone number'});
      return false;
    }
    if (!values.rName) {
      RenderSnackbar({text: 'Enter recipient namer'});
      return false;
    }

    if (!values.packageNo) {
      RenderSnackbar({
        text: 'Enter the numbers of package you want to be picked up',
      });
      return false;
    }
    if (values.packageTypes.length < 1) {
      RenderSnackbar({
        text: 'Please select at least one package type',
      });
      return false;
    }
    return true;
  };

  const handleAddNewForm = () => {
    if (handleValidation()) {
      setRequestValues(prev => [
        ...prev,
        {...initialValues, pickupLocation: prev[0].pickupLocation},
      ]);
    }
  };

  const handleRemoveRequest = (index: number) => {
    const newState = requestValues.filter((item, key) => key != index);
    setRequestValues(newState);
  };
  return (
    <ScreenWrapper>
      <ScrollView px="15px">
        {requestValues.map((item, key) => (
          <FormInput
            // placeholder="Add a Package"
            index={key}
            key={key}
            body={item}
            onFormChange={handleFormChange}
            isLast={key === requestValues.length - 1}
            isFirst={key === 0}
            onDelete={handleRemoveRequest}
          />
        ))}
        <View>
          <View
            borderStyle="dashed"
            borderRadius={'1px'}
            borderColor="#EEEEEE"
            borderWidth={0.5}
            mt="10px"
          />
          <Text
            onPress={handleAddNewForm}
            fontSize="11px"
            color="main"
            mt="10px">
            + Add Another Delivery
          </Text>
          <Button
            title="Continue"
            mt="20px"
            onPress={() => {
              if (handleValidation()) {
                navigation.navigate('delivery_summary', {item: requestValues});
              }
            }}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export {RequestDelivery};

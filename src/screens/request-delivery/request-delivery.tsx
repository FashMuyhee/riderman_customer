import React, {useState} from 'react';
import {Text, View, ScrollView} from 'native-base';
import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, ScreenWrapper} from '@components';
import FormInput from './components/FormInput';
import {IDeliveryRequestBody, LocationValue} from '@models/delivery';

export type IRequestDeliveryProps = {
  navigation: StackNavigationProp<GuardStackParamList, 'request_delivery'>;
};

const initialValues: IDeliveryRequestBody = {
  pickupLocation: {lat: '0', long: '0', address: ''},
  deliveryLocation: {lat: '0', long: '0', address: ''},
  instruction: '',
  packageTypes: [],
  weight: '',
  packageNo: '',
  rName: '',
  rPhone: '',
  rEmail: '',
};

const RequestDelivery: React.FC<IRequestDeliveryProps> = ({navigation}) => {
  const [requestValues, setRequestValues] = useState<Array<IDeliveryRequestBody>>([initialValues]);

  const handleFormChange = (index: number, key: string) => (value: string | string[] | LocationValue) => {
    let newRequestValue = [...requestValues];
    newRequestValue[index] = {...newRequestValue[index], [key]: value};
    setRequestValues(newRequestValue);
  };

  const handleAddNewForm = () => {
    setRequestValues(prev => [...prev, {...initialValues, pickupLocation: prev[0].pickupLocation}]);
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
          <View borderStyle="dashed" borderRadius={'1px'} borderColor="#EEEEEE" borderWidth={0.5} mt="10px" />
          <Text onPress={handleAddNewForm} fontSize="11px" color="main" mt="10px">
            + Add Another Delivery
          </Text>
          <Button title="Continue" mt="20px" onPress={() => navigation.navigate('delivery_summary', {item: requestValues})} />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export {RequestDelivery};

import React from 'react';
import TextInput, {TextInputProps} from './TextInput';
import EyeIcon from './icons/eye';

const PasswordTextInput: React.FunctionComponent<TextInputProps> = props => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <TextInput
      {...props}
      returnKeyType={'done'}
      secureText={!passwordVisible}
      rightIcon={<EyeIcon onPress={toggleVisibility} />}
    />
  );
};

export default PasswordTextInput;

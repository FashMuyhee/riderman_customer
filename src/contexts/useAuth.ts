import {AuthContext} from '@contexts/AuthContext';
import React, {useContext} from 'react';

// Auth Hooks
const useAuth = () => {
  const context = useContext(AuthContext);
  return {...context};
};

export default useAuth;

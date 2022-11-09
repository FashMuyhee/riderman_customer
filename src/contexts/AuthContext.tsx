import React, {createContext} from 'react';
import {useMMKVObject, useMMKVBoolean, useMMKVString} from 'react-native-mmkv';

export type User = {
  uid: string;
  fName: string;
  lName: string;
  email: string;
  dp: string;
};

export interface IAuthContext {
  user?: User | null;
  token?: string;
  isAuth?: boolean;
  authenticate: (user: User, token: string) => void;
  logout: () => void;
  setToken: (token: string) => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  token: '',
  authenticate: (user, token) => {},
  logout: () => {},
  setToken: token => {},
  isAuth: false,
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useMMKVObject<User | null>('_user');
  const [isAuth, setIsAuth] = useMMKVBoolean('_isAuth');
  const [token, setToken] = useMMKVString('_token');

  const handleLogin = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    setIsAuth(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuth(false);
    setToken('');
  };

  const handleResetToken = (token: string) => {
    setToken(token);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        token,
        authenticate: handleLogin,
        logout: handleLogout,
        setToken: handleResetToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

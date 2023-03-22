import {IUser} from '@models/auth';
import tokenManagerService from '@services/TokenManager';
import React, {createContext} from 'react';
import {useMMKVObject, useMMKVBoolean, useMMKVString} from 'react-native-mmkv';

export interface IAuthContext {
  user?: IUser | null;
  token?: string;
  isAuth?: boolean;
  authenticate: (user: IUser, token: string) => void;
  logout: () => void;
  setToken: (token: string) => void;
  updateUser: (user: IUser) => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  token: '',
  authenticate: (user, token) => {},
  logout: () => {},
  setToken: token => {},
  isAuth: false,
  updateUser: user => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useMMKVObject<IUser | null>('_user');
  const [isAuth, setIsAuth] = useMMKVBoolean('_isAuth');
  const [token, setToken] = useMMKVString('_token');

  const handleLogin = (user: IUser, token: string) => {
    setUser(user);
    setToken(token);
    setIsAuth(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuth(false);
    setToken('');
    tokenManagerService.clearUserSession();
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
        updateUser: setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

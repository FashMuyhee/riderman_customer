import {IStoreUserCredentials as StoredUserCredentials, IStoreUserSession as StoredUserSession} from '@models/auth';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: `user-storage`,
  encryptionKey: 'ninjaneer',
});

class TokenManagerService {
  /**
   * store user auth session
   * @param  {} {token
   * @param  {} expireTime
   */
  storeUserSession({token, expireTime}: StoredUserSession) {
    storage.delete('_session');
    storage.set(
      '_session',
      JSON.stringify({
        expireTime,
        token,
      }),
    );
  }

  /**s
   * store user auth detail
   * @param  {} {email
   * @param  {} password
   * @param  {StoredUserCredentials} uid}
   */
  storeUserCredentials({email, password, uid}: StoredUserCredentials) {
    storage.delete('_credentials');
    storage.set(
      '_credentials',
      JSON.stringify({
        email,
        password,
        uid,
      }),
    );
  }

  /**
   * retrieve user session
   * @return StoredUserSession|null
   */
  retrieveUserSession() {
    const session = storage.getString('_session');
    if (session !== undefined) {
      // @ts-ignore
      return JSON.parse(session) as StoredUserSession;
    }
    return null;
  }

  /**
   * retrieve user credential
   */
  retrieveUserCredentials() {
    const session = storage.getString('_credentials');
    if (session !== undefined) {
      // @ts-ignore
      const credential: StoredUserCredentials = JSON.parse(session);
      return credential;
    }
    return null;
  }

  /**
   * clear all stored data
   */
  async clearUserSession() {
    storage.clearAll();
  }
}

const tokenManagerService = new TokenManagerService();
export default tokenManagerService;

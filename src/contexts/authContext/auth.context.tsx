import { AuthData } from '@moneyboy/api/AuthData';
import { usePesca } from '@moneyboy/hooks/usePesca';
import deepEqual from 'deep-equal';
import React, { PropsWithChildren, useEffect, useState } from 'react';

export type AuthContextType = {
  /**
   * Flag, if user is logged in.
   */
  loggedIn: boolean;
  /**
   * Flag, if initial auth is ready (i.e. app is fully loaded)
   */
  ready: boolean;
  /**
   * Object with all relevant user data.
   */
  user?: Pesca.UserProfileInformation;
  /**
   * Try to log in with the given data.
   * @param data AuthData to log in with
   */
  login(data: AuthData): Promise<MaybeError<boolean>>;
  /**
   * Log a user out.
   */
  logout(): void;
  /**
   * Try to Register a new user.
   */
  register(data: Pesca.RegistrationPayload): Promise<MaybeError<boolean>>;
};

/**
 * Context to use for authentication purposes.
 */
export const AuthContext = React.createContext<AuthContextType>({
  loggedIn: false,
  async login(_data) {
    return [true];
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout() {},
  async register() {
    return [true];
  },
  ready: true,
});

type AuthContextProviderProps = unknown;

type AuthContextState = {
  ready: boolean;
  loggedIn: boolean;
  user?: Pesca.UserProfileInformation;
};

/**
 * Provider for the authentication context.
 */
export const AuthContextProvider: React.FC<PropsWithChildren<AuthContextProviderProps>> = ({ children }) => {
  const { login: pescaLogin, logout: pescaLogout, register: pescaRegister, user, finished } = usePesca();
  const [authContextState, setAuthContextState] = useState<AuthContextState>({ loggedIn: false, ready: false });

  useEffect(() => {
    const newState: Partial<AuthContextState> = {
      ready: !!finished,
    };
    if (!deepEqual(user, authContextState.user)) {
      if (user) {
        newState.loggedIn = true;
        newState.user = user;
      } else {
        newState.user = undefined;
      }
    }
    if (!deepEqual({ ...authContextState, ...newState }, authContextState)) {
      setAuthContextState(curState => ({
        ...curState,
        ...newState,
      }));
    }
  }, [user, authContextState, setAuthContextState, finished]);

  /**
   * Try to log a user in. It will also try to authenticate the user.
   */
  async function login({ username, password }: AuthData): Promise<MaybeError<boolean>> {
    // We only want valid userdata
    if (!username.trim().length || !password.trim().length) {
      return [false];
    }

    // Try to log in
    const [success, message] = (await pescaLogin(username, password)) ?? [
      false,
      'Internal error while communicating with server',
    ];

    // On error, return
    if (!success) {
      return [success, message];
    }

    return [true];
  }

  async function register(data: Pesca.RegistrationPayload): Promise<MaybeError<boolean>> {
    // Simply forward call
    return pescaRegister(data) ?? [false, 'Internal error while communicating with server'];
  }

  /**
   * Log the current user out.
   */
  async function logout() {
    await pescaLogout();

    setAuthContextState({
      ...authContextState,
      loggedIn: false,
      user: undefined,
    });
  }

  const authContextData: AuthContextType = {
    ...authContextState,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

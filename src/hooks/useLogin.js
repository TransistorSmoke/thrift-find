import { useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { auth, signInWithEmailAndPassword } from '../firebase/config';
import {
  FIREBASE_ERROR_CODE_LIST,
  FIREBASE_ERROR_MAP,
} from '../utilities/constants';

const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (!isCancelled) {
        dispatch({ type: 'LOGIN', payload: response.user });
        setError(null);
        setIsPending(false);
      }
      // dispatch({ type: 'LOGIN', payload: response.user });
      setError(null);
      setIsPending(false);
    } catch (err) {
      if (!isCancelled) {
        const found = FIREBASE_ERROR_CODE_LIST.includes(err.code);
        let message = found
          ? FIREBASE_ERROR_MAP[err.code]
          : 'An error occurred during login. Please try again later.';

        if (err.code === 'auth/invalid-credential') {
          message = 'You entered a wrong email or password';
        }

        setError(message);
        setIsPending(false);
      }

      // const found = FIREBASE_ERROR_CODE_LIST.includes(err.code);
      // let message = found
      //   ? FIREBASE_ERROR_MAP[err.code]
      //   : 'An error occurred during login. Please try again later.';

      // if (err.code === 'auth/invalid-credential') {
      //   message = 'You entered a wrong email or password';
      // }
      // setError(message);
      // setIsPending(false);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
};

export default useLogin;

import { useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { auth } from '../firebase/config';

const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await auth.signInWithEmailAndPassword(email, password);

      if (!isCancelled) {
        dispatch({ type: 'LOGIN', payload: response.user });
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!isCancelled) {
        const e = JSON.parse(err.messsage);

        if (e.error.message === 'INVALID_LOGIN_CREDENTIALS') {
          setError('Invalid login credentials');
        } else {
          setError(e.error.message);
        }
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
};

export default useLogin;

import { useState, useEffect } from 'react';
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '../firebase/config';
import { useAuthContext } from './useAuthContext';

const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const ERR_INVALID_EMAIL = 'auth/invalid-email';

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!response) {
        throw new Error('Could not complete signup process');
      }

      await updateProfile(response.user, { displayName });
      dispatch({ type: 'LOGIN', payload: response.user });
      setIsPending(false);
      setError(null);
    } catch (err) {
      if (err?.message.includes(ERR_INVALID_EMAIL)) {
        setError('The email address is badly formatted.');
      } else {
        setError(err.message);
      }

      setIsPending(false);
    }
  };

  // Cancels state change/signup process if user attemps to go to another route (page) while signup is in progress
  // useEffect(() => {
  //   return;
  // }, []);

  return { signup, error, isPending };
};

export default useSignup;

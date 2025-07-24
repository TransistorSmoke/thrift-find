import { useState, useEffect } from 'react';
import { auth, sendPasswordResetEmail } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

const useResetPassword = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const resetPassword = async email => {
    setError(null);
    setIsPending(true);

    try {
      await sendPasswordResetEmail(auth, email);
      dispatch({ type: 'RESET_PASSWORD' });
      setError(null);
      setIsPending(false);
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Email is not valid');
          break;

        case 'auth/user-not-found':
          setError('User with this email does not exist');
          break;

        case 'auth/missing-email':
          setError('Email address is missing');
          break;

        default:
          setError('Failed to send password reset email. Please try again');
          break;
      }
      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  });

  return { resetPassword, error, isPending };
};

export default useResetPassword;

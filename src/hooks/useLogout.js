import { useState, useEffect } from 'react';
import { auth, signOut } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signOut(auth);

      // if (!isCancelled) {
      //   dispatch({ type: 'LOGOUT' });
      //   setIsPending(false);
      //   setError(null);
      // }

      dispatch({ type: 'LOGOUT' });
      setIsPending(false);
      setError(null);
    } catch (err) {
      // if (!isCancelled) {
      //   setError(err && err.message ? err.message : 'Could not log out');
      //   setIsPending(false);
      // }
      setError(err && err.message ? err.message : 'Could not log out');
      setIsPending(false);
    }
  };
  // useEffect(() => {
  //   return i() => setIsCancelled(true);
  // }, [])
  return { logout, error, isPending };
};

export default useLogout;

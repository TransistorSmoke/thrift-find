import { useEffect } from 'react';
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '../firebase/config';

const useResetPassword = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
};

export default useResetPassword;

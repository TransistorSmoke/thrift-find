import { useState, useEffect, useReducer } from 'react';
import { appFirestore, collection as fsCollection, addDoc, timestamp } from '../firebase/config';
import { serverTimestamp } from 'firebase/firestore';

const initialState = {
  document: null,
  ispending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { ...state, ispending: true, error: null, success: false };
    case 'ADDED_DOCUMENT':
      return {
        ...state,
        document: action.payload,
        ispending: false,
        success: true,
      };
    case 'ERROR':
      return { ...state, error: action.payload, ispending: false };
    default:
      return state;
  }
};

const useFirestore = collection => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  const [fsTransactionIsPending, setFsTransactionIsPending] = useState(false);
  const collectionRef = fsCollection(appFirestore, collection);

  const dispatchIfNotCancelled = action => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async doc => {
    dispatch({ type: 'IS_PENDING' });
    setFsTransactionIsPending(true);

    try {
      const createdAt = timestamp;
      console.log('createdAt', createdAt);
      const addedDocument = await addDoc(collectionRef, { ...doc, createdAt });
      dispatch({ type: 'ADDED_DOCUMENT', payload: addedDocument });
      // dispatchIfNotCancelled({
      //   type: 'ADDED_DOCUMENT',
      //   payload: addedDocument,
      // });
      console.log('Document added: ', addedDocument);
      setFsTransactionIsPending(false);
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
      setFsTransactionIsPending(false);
    }
  };

  // useEffect(() => {
  //   return () => setIsCancelled(true);
  // }, [])

  return { addDocument, response, fsTransactionIsPending };
};

export default useFirestore;

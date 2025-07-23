import { useState, useEffect, useReducer } from 'react';
import { appFirestore, collection as fsCollection, addDoc, timestamp, db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import dayjs from 'dayjs';

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

    case 'UPDATED_DOCUMENT':
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

  const updateDocument = async docToUpdate => {
    dispatch({ type: 'IS_PENDING' });
    setFsTransactionIsPending(true);

    try {
      const docId = docToUpdate.id;
      if (!docId) throw new Error('Document ID is missing');
      const updatedAt = timestamp;
      const docRef = doc(db, collection, docId);

      const formattedFields = {
        price: Number(docToUpdate.price).toFixed(2),
        purchaseDate: dayjs(docToUpdate.purchaseDate).format('YYYY-MM-DD'),
        ...(docToUpdate.sellPrice && {
          sellPrice: Number(docToUpdate.sellPrice).toFixed(2),
        }),
        ...(docToUpdate.sellDate && {
          sellDate: dayjs(docToUpdate.sellDate).format('YYYY-MM-DD'),
        }),
      };

      const { id, ...updateFields } = docToUpdate;
      const updatePayload = { ...updateFields, ...formattedFields, updatedAt };
      await updateDoc(docRef, updatePayload);
      dispatch({ type: 'UPDATED_DOCUMENT', payload: updatePayload });
      // dispatchIfNotCancelled({
      //   type: 'UPDATED_DOCUMENT',
      //   payload: updatedDocument,
      // });
      setFsTransactionIsPending(false);
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
      setFsTransactionIsPending(false);
    }
  };

  // useEffect(() => {
  //   return () => setIsCancelled(true);
  // }, [])

  return { addDocument, updateDocument, response, fsTransactionIsPending };
};

export default useFirestore;

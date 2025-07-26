import { useState, useReducer } from 'react';
import {
  appFirestore,
  collection as fsCollection,
  timestamp,
  db,
  storage,
} from '../firebase/config';
import { doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref as storageRef, deleteObject } from 'firebase/storage';
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
      return { ispending: true, error: null, success: false };

    case 'ADDED_DOCUMENT':
      return {
        document: action.payload,
        ispending: false,
        success: true,
        error: null,
      };

    case 'UPDATED_DOCUMENT':
      return {
        document: action.payload,
        ispending: false,
        success: true,
        error: null,
      };

    case 'DELETED_DOCUMENT':
      return {
        document: null,
        ispending: false,
        success: true,
        error: null,
      };

    case 'ERROR':
      return { error: action.payload, ispending: false };

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
      // dispatch({ type: 'ADDED_DOCUMENT', payload: addedDocument });
      dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      });
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
        price: Number(docToUpdate.price).toFixed(2) || '',
        purchaseDate:
          dayjs(docToUpdate.purchaseDate).format('YYYY-MM-DD') || '',
        ...(docToUpdate.sellPrice &&
          docToUpdate.sellPrice && {
            sellPrice: Number(docToUpdate?.sellPrice).toFixed(2) || '',
          }),
        ...(docToUpdate.sellDate && {
          sellDate: dayjs(docToUpdate?.sellDate).format('YYYY-MM-DD') || '',
        }),
      };

      const { id, ...updateFields } = docToUpdate;
      const updatePayload = { ...updateFields, ...formattedFields, updatedAt };
      await updateDoc(docRef, updatePayload);
      // dispatch({ type: 'UPDATED_DOCUMENT', payload: updatePayload });
      dispatchIfNotCancelled({
        type: 'UPDATED_DOCUMENT',
        payload: updatedDocument,
      });
      setFsTransactionIsPending(false);
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
      setFsTransactionIsPending(false);
    }
  };

  const deleteDocument = async (docId, imgUrl) => {
    dispatch({ type: 'IS_PENDING' });
    setFsTransactionIsPending(true);

    try {
      if (!docId) throw new Error('Document ID is missing');
      const docRef = doc(db, collection, docId);

      // 1.) Delete image first associated with the document.
      if (imgUrl) {
        try {
          const imgRef = storageRef(storage, imgUrl);
          await deleteObject(imgRef);
        } catch (err) {
          console.error(
            'Image ref in bucket not found. Image must have been deleted manually from the bucket. Still proceeding with deletion from the collection.'
          );
          console.error(err.message);
        }
      }

      // 2.) Delete the document itself.
      await deleteDoc(docRef);
      // dispatch({ type: 'DELETED_DOCUMENT' });
      dispatchIfNotCancelled({
        type: 'DELETED_DOCUMENT',
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
      setFsTransactionIsPending(false);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {
    addDocument,
    updateDocument,
    deleteDocument,
    response,
    fsTransactionIsPending,
  };
};

export default useFirestore;

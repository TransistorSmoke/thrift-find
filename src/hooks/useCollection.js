import { useEffect, useState, useRef } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  onSnapshot,
  query as fsQuery,
  where,
  orderBy as fsOrderBy,
} from 'firebase/firestore';

export const useCollection = (coll, _query = null, _orderBy = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const queryRef = useRef(_query).current;
  const orderByRef = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collection(db, coll);

    if (queryRef) {
      ref = fsQuery(ref, where(...queryRef));
    }

    if (orderByRef) {
      ref = fsQuery(ref, fsOrderBy(...orderByRef));
    }

    const unsub = onSnapshot(
      ref,
      snapshot => {
        let results = [];
        snapshot.docs.forEach(doc => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setDocuments(results);
        setError(null);
      },
      err => {
        console.error('Snapshot error:', err);
        setError(err.message);
      }
    );

    return () => unsub();
  }, [coll, queryRef, orderByRef]);

  return { documents, error };
};

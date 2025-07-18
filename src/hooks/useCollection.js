import { useEffect, useState } from 'react';

import { appFirestore } from '../firebase/config';
import { db } from '../firebase/config';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';

export const useCollection = (coll, _query, _orderBy = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = collection(db, coll);

    const unsub = onSnapshot(ref, snapshot => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setDocuments(results);
    });

    return () => unsub();
  }, [coll]);

  return { documents, error };
};

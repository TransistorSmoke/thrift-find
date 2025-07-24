import Form from '../components/Form/Form';
import { useEffect } from 'react';
import Inventory from '../components/Inventory/Inventory';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from '../hooks/useCollection';
import { getCollectionName } from '../utilities/utilities';

const Home = () => {
  const { user } = useAuthContext();
  const collection = getCollectionName(user.uid);
  const { documents: items } = useCollection(
    collection,
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );

  return (
    <div className="form-section">
      <Form uid={user.uid} />
      <Inventory items={items} uid={user.uid} />
    </div>
  );
};

export default Home;

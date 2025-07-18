import Form from '../components/Form/Form';
// import Item from '../components/Item/Item';
import Inventory from '../components/Inventory/Inventory';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from '../hooks/useCollection';

const Home = () => {
  const { documents: items } = useCollection('items');
  const { user } = useAuthContext();

  // console.log('Items: ', items);
  return (
    <div className="form-section">
      <Form uid={user.uid} />
      <Inventory items={items} />
    </div>
  );
};

export default Home;

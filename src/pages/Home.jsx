import Form from '../components/Form/Form';
// import Item from '../components/Item/Item';
import Inventory from '../components/Inventory/Inventory';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const { user } = useAuthContext();
  return (
    <div className="form-section">
      <Form uid={user.uid} />
      <Inventory />
    </div>
  );
};

export default Home;

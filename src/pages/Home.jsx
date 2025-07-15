import Form from '../components/Form/Form';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const { user } = useAuthContext();
  return (
    <div className="form-section">
      <Form uid={user.uid} />
    </div>
  );
};

export default Home;

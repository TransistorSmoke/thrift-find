import ThriftFindsLogo from '../../assets/images/logo-primary.png';
import './Navbar.scss';
import useLogout from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className="nav-container">
      <div className="">
        <img src={ThriftFindsLogo} alt="thrift fine logo" className="logo" />
      </div>
      <ul className={`nav-list-group  ${!user ? 'hoverable' : ''}`}>
        {user ? (
          <>
            <li>
              <div className="greeting">
                <p>Welcome, {user.displayName}!</p>
                <button className="app-button" onClick={logout}>
                  Log out
                </button>
              </div>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

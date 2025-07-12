import ThriftFindsLogo from '../../assets/images/logo-primary.png';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="nav-container">
      <div className="">
        <img src={ThriftFindsLogo} alt="thrift fine logo" className="logo" />
      </div>
      <ul className="nav-list-group">
        <li>Link 1</li>
        <li>Link 2</li>
        <li>Link 3</li>
      </ul>
    </nav>
  );
};

export default Navbar;

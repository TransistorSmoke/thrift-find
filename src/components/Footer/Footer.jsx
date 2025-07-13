import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} Thrift Finds. All rights reserved.
        </p>
        <p>Created by Jason Alegado</p>
      </div>
    </footer>
  );
};

export default Footer;

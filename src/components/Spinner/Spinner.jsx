import './Spinner.scss'; // Import the CSS

const Spinner = ({ size = 40, color = '#fff' }) => {
  return (
    <div
      className="spinner"
      style={{
        width: size,
        height: size,
        borderTopColor: color,
      }}
    ></div>
  );
};

export default Spinner;

import { useState } from 'react';
import './Form.scss';
import plus from '../../assets/images/icons/plus.svg';

const Form = () => {
  const [file, setFile] = useState(null);

  const handleAddItem = e => {
    e.preventDefault();
    console.log('Adding item...');
  };

  const handleImageUpload = e => {
    if (e.target.files) {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
      console.log('this is the file: ', uploadedFile);
    }
  };
  return (
    <div className="form-container">
      <p className="form-header">Add new item</p>
      <form className="form-add" onSubmit={handleAddItem}>
        <label>
          <span>Name: </span>
          <input type="text" name="name" placeholder="Item name" />
        </label>
        <label>
          <span>Price (AUD): </span>
          <input type="number" name="price" min="0" step="0.01" placeholder="0.00" />
        </label>
        <label>
          <span>Date purchased: </span>
          <input type="date" name="purchase-date" />
        </label>
        <label>
          <span>Image: </span>
          <input type="file" name="file-item" accept="image/*" onChange={handleImageUpload} />
        </label>
        <button className="submit">
          <img src={plus} alt="add icon" className="add" />
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;

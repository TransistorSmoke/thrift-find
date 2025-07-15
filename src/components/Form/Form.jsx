import { useEffect, useState } from 'react';
import './Form.scss';
import plus from '../../assets/images/icons/plus.svg';
import useFirestore from '../../hooks/useFirestore';
import compressImage from '../../utilities/utilities';

const Form = ({ uid }) => {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState('');
  const [image, setImage] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { addDocument, response, fsTransactionIsPending } = useFirestore('items');

  const handleAddItem = async e => {
    e.preventDefault();
    console.log('Adding item...');
    console.log('Item: ', item);
    console.log('Price:', parseFloat(price).toFixed(2));
    console.log('Purchase date: ', purchaseDate);
    console.log('image: ', image);

    clearAll();

    return;

    if (item?.trim() === '' || price <= 0 || purchaseDate === '') {
      //   console.error('Please fill in all fields correctly.');
      setError('Please fill in all fields correctly.');
      return;
    } else {
      try {
        await addDocument({
          uid,
          item,
          price: parseFloat(price).toFixed(2),
          purchaseDate,
        });
        console.log('reponse: ', response);

        setItem('');
        setPrice(0);
        setPurchaseDate('');
        setError(null);
      } catch (err) {
        console.error('Error adding item: ', err);
      }
    }
  };

  const handleFileChange = async e => {
    setImage(null);
    setFileError(null);
    let file = e.target.files[0];
    let filePreviewUrl = null;

    if (!file || !file.type.includes('image')) {
      setFileError('Please select an image file.');
      return;
    }

    if (file.size > 500000) {
      try {
        const { compressedFile, previewURL } = await compressImage(file);
        file = compressedFile;
        filePreviewUrl = previewURL;
      } catch (err) {
        setFileError(err.message || 'Image compression failed');
      }
    }

    setImage(file);
    if (filePreviewUrl) {
      setPreviewUrl(filePreviewUrl);
    }
  };

  const clearError = () => {
    if (error) setError(null);
    if (fileError) setFileError(null);
  };

  const clearAll = () => {
    setItem('');
    setPrice(0);
    setPurchaseDate('');
    setImage(null);
    setFileError(null);
    setError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  // Revoke preview URL during unmount to prevent memory leak
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    };
  }, [previewUrl]);

  return (
    <div className="form-container">
      <p className="form-header">Add new item</p>
      <form className="form-add" onSubmit={handleAddItem}>
        <label>
          <span>Name: </span>
          <input
            type="text"
            name="name"
            placeholder="Item name"
            value={item}
            onChange={e => setItem(e.target.value)}
            onFocus={clearError}
          />
        </label>
        <label>
          <span>Price (AUD): </span>
          <input
            type="number"
            name="price"
            min="0.00"
            step="0.01"
            placeholder="0.00"
            value={price}
            onChange={e => setPrice(e.target.value)}
            onFocus={clearError}
          />
        </label>
        <label>
          <span>Date purchased: </span>
          <input
            type="date"
            name="purchase-date"
            value={purchaseDate}
            onChange={e => setPurchaseDate(e.target.value)}
            onFocus={clearError}
          />
        </label>
        <label>
          <span>Image: </span>
          <input type="file" name="file-item" accept="image/*" onChange={handleFileChange} onFocus={clearError} />
        </label>
        <button className="submit">
          <img src={plus} alt="add icon" className="add" />
          Add
        </button>
        {error && <p className="error">{error}</p>}
        {fileError && <p className="error">{fileError}</p>}
      </form>
    </div>
  );
};

export default Form;

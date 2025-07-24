import { useEffect, useState, useRef, useContext } from 'react';
import './Form.scss';
import plus from '../../assets/images/icons/plus.svg';
import useFirestore from '../../hooks/useFirestore';
import {
  compressImage,
  transformFieldName,
  deleteToastSettings as settings,
  getCollectionName,
  getStorageBucketName,
} from '../../utilities/utilities';
import { storage, timestamp, uploadBytes, ref } from '../../firebase/config';
import { getDownloadURL } from 'firebase/storage';
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-toastify';

const Form = ({ uid, collection }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState('');
  const [image, setImage] = useState(null);
  const [imgIsCompressing, setImgIsCompressing] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [addDocIsPending, setAddDocIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const collectionName = getCollectionName(uid);
  const { addDocument } = useFirestore(collectionName);

  const handleAddItem = async e => {
    e.preventDefault();
    setAddDocIsPending(true);
    const fields = { name, price, purchaseDate, image };

    if (name?.trim() === '' || price <= 0 || purchaseDate === '' || !image) {
      const emptyFields = await Object.entries(fields)
        .filter(([_, value]) => !value)
        .map(([key]) => transformFieldName(key));

      setError(
        `Please fill in the following fields: ${emptyFields.join(', ')}`
      );
      setAddDocIsPending(false);
      return;
    } else {
      try {
        let imageUrl = '';
        if (image) {
          const storageName = getStorageBucketName(uid, image.name, timestamp);
          const imageRef = ref(storage, storageName);
          await uploadBytes(imageRef, image);
          imageUrl = await getDownloadURL(imageRef);
        }

        clearError();
        await addDocument({
          uid,
          name,
          price: parseFloat(price).toFixed(2),
          purchaseDate,
          imageUrl,
        });
        toast.success('Item successfully added', settings);

        clearAll();
      } catch (err) {
        toast.error('Failed to add item', settings);
        setError('Faile to add item');
      }

      setAddDocIsPending(false);
    }
  };

  const handleFileChange = async e => {
    setImage(null);
    setFileError(null);
    setImgIsCompressing(false);
    let file = e.target.files[0];
    let filePreviewUrl = null;

    if (!file || !file.type.includes('image')) {
      setFileError('Please select an image file.');
      return;
    }

    if (file.size > 400000) {
      try {
        setImgIsCompressing(true);
        const { compressedFile, previewURL } = await compressImage(file);
        file = compressedFile;
        filePreviewUrl = previewURL;
        setImgIsCompressing(false);
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
    setName('');
    setPrice(0);
    setPurchaseDate('');
    setImage(null);
    setFileError(null);
    setError(null);
    clearPreviewUrl(previewUrl);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearPreviewUrl = url => {
    if (url) {
      URL.revokeObjectURL(url);
      setPreviewUrl(null);
    }
  };

  // Revoke preview URL during unmount to prevent memory leak
  useEffect(() => {
    return () => clearPreviewUrl(previewUrl);
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
            value={name}
            onChange={e => setName(e.target.value)}
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
          <input
            type="file"
            name="file-item"
            accept=".heic,image/heic,image/heif,image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            onFocus={clearError}
          />
        </label>
        <button className="submit" disabled={imgIsCompressing}>
          {addDocIsPending ? (
            <Spinner size={16} color="transparent" />
          ) : (
            <img src={plus} alt="add icon" className="add" />
          )}
          {addDocIsPending ? 'Adding' : 'Add'}
        </button>
        {error && <p className="error">{error}</p>}
        {fileError && <p className="error">{fileError}</p>}
        {imgIsCompressing && (
          <p className="info-processing">Image is being processed...</p>
        )}
      </form>
    </div>
  );
};

export default Form;

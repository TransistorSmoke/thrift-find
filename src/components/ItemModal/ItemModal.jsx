import { useState, useEffect, forwardRef } from 'react';
import './ItemModal.scss';
import useFirestore from '../../hooks/useFirestore';
import LoadingImage from '../../assets/images/loading.gif';
import dayjs from 'dayjs';
import {
  getCollectionName,
  getStorageBucketName,
  deleteToastSettings as settings,
} from '../../utilities/utilities';
import { toast } from 'react-toastify';

const ItemModal = forwardRef(({ item, uid, action }, ref) => {
  const collectionName = getCollectionName(uid);
  const bucketName = getStorageBucketName(uid);
  const { updateDocument, deleteDocument } = useFirestore(
    collectionName,
    bucketName
  );
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const isDelete = action === 'delete';

  // Temporary holder of item detail's edited input fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [sellDate, setSellDate] = useState('');
  // ------------------------------------------------

  const edit = e => {
    e.preventDefault();
    setIsEditing(!isEditing);
    setName(name);
    setPrice(price);
    setPurchaseDate(purchaseDate);
    setSellPrice(sellPrice);
    setSellDate(sellDate);
  };

  const save = async e => {
    e.preventDefault();
    let details = {};

    if (sellPrice) {
      details = { ...details, sellPrice };
    }

    if (sellDate) {
      details = { ...details, sellDate };
    }

    setIsEditing(!isEditing);

    try {
      await updateDocument({ ...item, name, price, purchaseDate, ...details });
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteDoc = async e => {
    e.preventDefault();
    console.log('image URL of the item to be deleted: ', item.imageUrl);
    // return;

    try {
      await deleteDocument(item.id, item.imageUrl);
      toast.success('Item successfully deleted', settings);

      if (ref?.current) {
        ref.current.close();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    setIsEditing(false);
    setName(item?.name);
    setPrice(item?.price);
    setPurchaseDate(item?.purchaseDate);
    setSellPrice(item?.sellPrice);
    setSellDate(item?.sellDate);
    setIsLoadingImage(true);

    // When an item is edited and saved, and user goes to open the same item, image does not load.
    // Force image URL to be 'different' each time the item is accessed, to simulate a 'change of state', invoking a re-render
    setCurrentImageUrl(
      item?.imageUrl ? `${item.imageUrl}?t=${Date.now()}` : null
    );
  }, [item]);
  return (
    <dialog ref={ref} className="item-modal">
      {/* <div className="item-container"> */}
      <div className={`item-container ${isDelete ? 'warning' : ''}`}>
        {isDelete && !isLoadingImage && (
          <div className="delete-notice">
            <i className="delete-icon fa-solid fa-triangle-exclamation"></i>
            <p>Are you sure you want to delete this item?</p>
          </div>
        )}
        <div className={`item-header ${isDelete ? 'warning' : ''}`}>
          <h1 className="item-title">
            {isEditing ? (
              <input
                type="text"
                value={name}
                alt="name of item"
                className="field-editing"
                onChange={e => setName(e.target.value)}
              />
            ) : item?.name || name ? (
              name
            ) : (
              '-'
            )}
          </h1>
        </div>
        {currentImageUrl && (
          <img
            src={currentImageUrl}
            className="item-img"
            style={{ display: isLoadingImage ? 'none' : '' }}
            onLoad={() => setIsLoadingImage(false)}
            alt={item?.name || 'Item'}
          />
        )}
        {isLoadingImage && <img src={LoadingImage} className="loading" />}

        <div className="item-details">
          <div className="item-price">
            <span>Purchasing Price (AUD): </span>
            <span>
              {isEditing ? (
                <input
                  type="text"
                  value={price}
                  alt="price of item"
                  className="field-editing"
                  onChange={e => setPrice(e.target.value)}
                />
              ) : item?.price || price ? (
                price
              ) : (
                '-'
              )}
            </span>
          </div>
          <div className="item-purchase-date">
            <span>Purchased On: </span>
            <span>
              {isEditing ? (
                <input
                  type="text"
                  value={purchaseDate || ''}
                  alt="date item is bought"
                  className="field-editing"
                  onChange={e => setPurchaseDate(e.target.value)}
                />
              ) : item?.purchaseDate || purchaseDate ? (
                dayjs(purchaseDate).isValid() ? (
                  dayjs(purchaseDate)?.format('DD MMM YYYY')
                ) : (
                  '-'
                )
              ) : (
                '-'
              )}
            </span>
          </div>
          <div className="item-sell-price">
            <span>Selling Price (AUD): </span>
            <span>
              {isEditing ? (
                <input
                  type="text"
                  value={sellPrice || ''}
                  alt="price item is sold for"
                  className="field-editing"
                  onChange={e => setSellPrice(e.target.value)}
                />
              ) : item?.sellPrice || sellPrice ? (
                sellPrice
              ) : (
                '-'
              )}
            </span>
          </div>
          <div className="item-sell-date">
            <span>Sold On: </span>
            <span>
              {isEditing ? (
                <input
                  type="text"
                  value={sellDate || ''}
                  alt="date item is sold"
                  className="field-editing"
                  onChange={e => setSellDate(e.target.value)}
                />
              ) : item?.sellDate || sellDate ? (
                dayjs(sellDate).isValid() ? (
                  dayjs(sellDate).format('DD MMM YYYY')
                ) : (
                  '-'
                )
              ) : (
                '-'
              )}
            </span>
          </div>
        </div>
      </div>

      <form
        method="dialog"
        onSubmit={() => setIsEditing(false)}
        className={isDelete ? 'warning' : ''}
      >
        {error && <p className="error-msg">{error.message}</p>}
        {isDelete ? (
          <>
            <button
              className="app-button delete"
              onClick={deleteDoc}
              // disabled={isLoadingImage}
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              className={`app-button ${isEditing ? 'edit' : 'save'}`}
              onClick={isEditing ? save : edit}
              // disabled={isLoadingImage}
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </>
        )}
        <button className="app-button close">
          {isDelete ? 'Cancel' : 'Close'}
        </button>
      </form>
    </dialog>
  );
});

export default ItemModal;

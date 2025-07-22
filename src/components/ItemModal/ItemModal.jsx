import { useState, useEffect, forwardRef } from 'react';
import useFirestore from '../../hooks/useFirestore';
import { Item } from '../Item/Item';
import LoadingImage from '../../assets/images/loading.gif';
import './ItemModal.scss';
import dayjs from 'dayjs';

const ItemModal = forwardRef(({ item, onClose }, ref) => {
  const { updateDocument } = useFirestore('items');
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Temporary holder of item detail's edited input fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [sellDate, setSellDate] = useState('');
  // ------------------------------------------------

  const edit = e => {
    e.preventDefault();
    console.log('Editing details...');
    setIsEditing(!isEditing);
    setName(name);
    setPrice(price);
    setPurchaseDate(purchaseDate);
    setSellPrice(sellPrice);
    setSellDate(sellDate);
  };

  const save = async () => {
    let details = {};

    if (sellPrice) {
      details = { ...details, sellPrice };
    }

    if (sellDate) {
      details = { ...details, sellDate };
    }

    await updateDocument({ ...item, name, price, purchaseDate, ...details });
  };

  useEffect(() => {
    setIsEditing(false);
    setName(item?.name);
    setPrice(item?.price);
    setPurchaseDate(item?.purchaseDate);
    setSellPrice(item?.sellPrice);
    setSellDate(item?.sellDate);
    setIsLoadingImage(true);
    setCurrentImageUrl(item?.imageUrl || null);
  }, [item]);
  return (
    <dialog ref={ref} className="item-modal">
      <div className="item-container">
        <div className="item-header">
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
          {/* <h1 className="item-title">{item?.item}</h1> */}
          {/* <p className="info-purchase-price">{item?.price}</p> */}
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
                  onBlur={() => {
                    setSellDate(sellDate);
                    console.log('sellDate: ', sellDate);
                  }}
                />
              ) : item?.sellDate || sellDate ? (
                dayjs(sellDate).isValid() ? (
                  daysjs(sellDate).format('DD MMM YYYY')
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

      <form method="dialog" onSubmit={() => setIsEditing(false)}>
        <button className="edit" onClick={edit} disabled={isLoadingImage}>
          {isEditing ? 'Finish Edit' : 'Edit'}
        </button>
        <button className="save" onClick={save} disabled={isLoadingImage}>
          Save
        </button>
        <button className="close">Close</button>
      </form>
    </dialog>
  );
});

export default ItemModal;

import { useState, useEffect, forwardRef } from 'react';
import { Item } from '../Item/Item';
import LoadingImage from '../../assets/images/loading.gif';
import './ItemModal.scss';
import dayjs from 'dayjs';

const ItemModal = forwardRef(({ item, onClose }, ref) => {
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Temporary holder of item detail's edited input fields
  const [price, setPrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [sellDate, setSellDate] = useState('');

  const editDetails = e => {
    e.preventDefault();

    console.log('Editing details...');

    setIsEditing(!isEditing);
    console.log('price ', price);
    console.log('purchase data ', purchaseDate);
    console.log('sell price ', sellPrice);
    console.log('sell data ', sellDate);
    setPrice(price);
    setPurchaseDate(setPurchaseDate);
    setSellPrice(sellPrice);
    setSellDate(sellDate);
  };

  useEffect(() => {
    console.log('price: ', price);

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
          <h1 className="item-title">{item?.item}</h1>
          {/* <p className="info-purchase-price">{item?.price}</p> */}
        </div>
        {currentImageUrl && (
          <img
            src={currentImageUrl}
            className="item-img"
            style={{ display: isLoadingImage ? 'none' : '' }}
            onLoad={() => setIsLoadingImage(false)}
            alt={item?.item || 'Item'}
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
              ) : (
                item?.price || sellPrice(`$${price}`)
              )}
            </span>
          </div>
          <div className="item-purchase-date">
            <span>Purchased On: </span>
            <span>
              {isEditing ? (
                <input
                  value={purchaseDate}
                  alt="date item is bought"
                  className="field-editing"
                  onChange={e => setPurchaseDate(e.target.value)}
                />
              ) : item?.purchaseDate || purchaseDate ? (
                dayjs(purchaseDate)?.format('DD MMM YYYY')
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
                  value={sellPrice}
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
                  value={sellDate}
                  alt="date item is sold"
                  className="field-editing"
                  onChange={e => setSellDate(e.target.value)}
                  onBlur={() => setSellDate(sellDate)}
                />
              ) : item?.sellDate || sellDate ? (
                dayjs(sellDate)?.format('DD MMM YYYY')
              ) : (
                '-'
              )}
            </span>
          </div>
        </div>
      </div>

      <form method="dialog">
        <button className="edit" onClick={editDetails}>
          {isEditing ? 'Finish Edit' : 'Edit'}
        </button>
        <button className="close">Close</button>
      </form>
    </dialog>
  );
});

export default ItemModal;

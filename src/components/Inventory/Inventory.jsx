import './Inventory.scss';
import { useState, useRef } from 'react';
import ItemModal from '../ItemModal/ItemModal';
import { calculateProfit } from '../../utilities/utilities';

const Inventory = ({ items, uid }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [action, setAction] = useState(null);
  const dialog = useRef();
  const ACTION_ITEM_DELETE = 'delete';

  const showItemInfo = (item, action = null) => {
    setSelectedItem(item);
    setAction(action);
    dialog.current?.showModal();
  };

  const handleClose = () => {
    setSelectedItem(null);
    dialog.current?.close();
  };

  if (!Array.isArray(items)) {
    return <div className="table-container">Loading inventory...</div>;
  }

  return (
    <>
      <ItemModal
        ref={dialog}
        item={selectedItem}
        action={action}
        onClose={handleClose}
        uid={uid}
      />
      <div className="table-container" tabIndex="0">
        <table className="table-main">
          <caption>Inventory</caption>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Purchasing Price (AUD)</th>
              <th>Date Purchased</th>
              <th>Selling Price (AUD)</th>
              <th>Date Sold</th>
              <th>Profit (AUD)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length === 0 ? (
              <tr>
                <td colSpan={7}>No items found.</td>
              </tr>
            ) : (
              items.map(item => (
                <tr key={item.id} className={item?.sellDate ? 'sold' : ''}>
                  <td className="item">
                    {item && item.name ? item.name : '-'}
                  </td>
                  <td className="price">
                    {item && item.price ? item.price : '-'}
                  </td>
                  <td className="purchase-date">
                    {item && item.purchaseDate ? item.purchaseDate : '-'}
                  </td>
                  <td className="selling-price">
                    {item && item.sellPrice ? item.sellPrice : '-'}
                  </td>
                  <td className="sell-date">
                    {item && item.sellDate ? item.sellDate : '-'}
                  </td>
                  <td className="profit">
                    {item && item.price && item.sellPrice && item.sellDate ? (
                      <span
                        className={
                          item.sellPrice - item.price > 0 ? 'gain' : 'loss'
                        }
                      >
                        {calculateProfit(item.price, item.sellPrice)}
                      </span>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="options">
                    <div className="icons-container">
                      <span className="view" onClick={() => showItemInfo(item)}>
                        <i className="fas fa-eye"></i>
                      </span>
                      <span
                        className="delete"
                        onClick={() => showItemInfo(item, ACTION_ITEM_DELETE)}
                      >
                        <i className="fas fa-trash"></i>
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Inventory;

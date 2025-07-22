import './Inventory.scss';
import { useState, useRef } from 'react';

import ItemModal from '../ItemModal/ItemModal';

const ItemTable = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [canEditContent, setCanEditContent] = useState(false);

  const dialog = useRef();

  // Temporary field names value during row edit

  const [cellToEdit, setCellToEdit] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const showItemInfo = item => {
    setSelectedItem(item);
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
      <ItemModal ref={dialog} item={selectedItem} onClose={handleClose} />
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
              <th>Profit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center' }}>
                  No items found.
                </td>
              </tr>
            ) : (
              items.map(item => (
                <tr key={item.id} onClick={() => showItemInfo(item)}>
                  <td className="item">{item && item.name ? item.name : '-'}</td>
                  <td className="price">{item && item.price ? item.price : '-'}</td>
                  <td className="purchase-date">{item && item.purchaseDate ? item.purchaseDate : '-'}</td>
                  <td className="selling-price">{item && item.sellPrice ? item.sellPrice : '-'}</td>
                  <td className="sell-date">{item && item.sellDate ? item.sellDate : '-'}</td>
                  <td className="profit">
                    {item && item.price && item.sellPrice ? (+item.sellPrice - +item.price).toFixed(2) : '-'}
                  </td>
                  <td className="options">
                    <div className="icons-container">
                      <span className="view" onClick={() => showItemInfo(item)}>
                        <i className="fas fa-eye"></i>
                      </span>
                      <span className="edit" onClick={() => setCanEditContent(true)}>
                        <i className="fas fa-pen"></i>
                      </span>
                      <span className="delete">
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

export default ItemTable;

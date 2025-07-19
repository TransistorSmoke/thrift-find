import './Inventory.scss';

const ItemTable = ({ items }) => {
  const showItemInfo = () => {
    console.log('Showing item info:');
  };

  if (!Array.isArray(items)) {
    return <div className="table-container">Loading inventory...</div>;
  }

  return (
    <div>
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
                <tr key={item.id} onClick={showItemInfo}>
                  <td className="item">{item && item.item ? item.item : '-'}</td>
                  <td className="price">{item && item.price ? item.price : '-'}</td>
                  <td className="purchase-date">{item && item.purchaseDate ? item.purchaseDate : '-'}</td>
                  <td className="selling-price">{item && item.sellPrice ? item.sellPrice : '-'}</td>
                  <td className="sell-date">{item && item.sellDate ? item.sellDate : '-'}</td>
                  <td className="profit">
                    {item && item.price && item.sellPrice ? (+item.sellPrice - +item.price).toFixed(2) : '-'}
                  </td>
                  <td className="options">
                    <div className="icons-container">
                      <span className="view">
                        <i class="fas fa-eye"></i>
                      </span>
                      <span className="edit">
                        <i class="fas fa-pen"></i>
                      </span>
                      <span className="delete">
                        <i class="fas fa-trash"></i>
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemTable;

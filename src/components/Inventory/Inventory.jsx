import './Inventory.scss';

const ItemTable = ({ items }) => {
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
              <th>Purchasing Price</th>
              <th>Date Purchased</th>
              <th>Selling Price</th>
              <th>Date Sold</th>
              <th>Profit</th>
              <th>options here</th>
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
                <tr key={item.id}>
                  <td className="item">{item && item.item ? item.item : '-'}</td>
                  <td className="price">{item && item.price ? item.price : '-'}</td>
                  <td className="purchase-date">{item && item.purchaseDate ? item.purchaseDate : '-'}</td>
                  <td className="selling-price">{item && item.sellPrice ? item.sellPrice : '-'}</td>
                  <td className="sell-date">{item && item.sellDate ? item.sellDate : '-'}</td>
                  <td className="profit">
                    {item && item.price && item.sellPrice ? (+item.sellPrice - +item.price).toFixed(2) : '-'}
                  </td>
                  <td className="options">OPTIONS HERE - edit/delete</td>
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

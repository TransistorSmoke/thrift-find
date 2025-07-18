import './Inventory.scss';

const ItemTable = ({ items }) => {
  console.log('Items in inventory: ', items);

  if (!Array.isArray(items)) {
    return <div className="table-container">Loading inventory...</div>;
  }

  return (
    <div>
      {/* <h1 className="inventory-title">Inventory</h1> */}
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
                  <td>{item && item.item ? item.item : '-'}</td>
                  <td>{item && item.price ? item.price : '-'}</td>
                  <td>{item && item.purchaseDate ? item.purchaseDate : '-'}</td>
                  <td>{item && item.sellPrice ? item.sellPrice : '-'}</td>
                  <td>{item && item.sellDate ? item.sellDate : '-'}</td>
                  <td>OPTIONS HERE - edit/delete</td>
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

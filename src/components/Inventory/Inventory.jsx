import './Inventory.scss';

const ItemTable = ({ items = null }) => {
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
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemTable;

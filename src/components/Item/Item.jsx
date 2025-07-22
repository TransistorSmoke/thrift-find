import { useState, useEffect } from 'react';
import './Item.scss';

export const Item = ({ item }) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [wholeItem, setWholeItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log('item from Item compoenent: ', item);

  useEffect(() => {
    let isMounted = true;
    setImgUrl(null);
    setIsLoading(true);

    if (item) {
      console.log('image url can now be set');
      setWholeItem(item);

      setImgUrl(item.imageUrl);
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
      setIsLoading(false);
    };
  }, [wholeItem]);

  return (
    <>
      {isLoading ? (
        <p>Loading image data...</p>
      ) : (
        <div>
          hello world
          <h1>Item name: {item?.item}</h1>
          <img src={imgUrl} alt="Image of item" />
          <p>Price: {item?.price}</p>
        </div>
      )}
    </>
  );
};

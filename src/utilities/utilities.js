import imageCompression from 'browser-image-compression';
import heic2any from 'heic2any';

export const compressImage = async file => {
  // Image compression time!
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 500,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return { compressedFile, previewURL: URL.createObjectURL(compressedFile) };
  } catch (error) {
    throw new Error(`Image compression failed: ${error.message}`);
  }
};

export const transformFieldName = str => {
  let split = str.replace(/([A-Z])/g, ' $1').split(' ');
  let transformed = split
    .map(str => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' ');
  return transformed;
};

export const deleteToastSettings = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: false,
  progress: 0,
  theme: 'dark',
};

export const calculateProfit = (buy, sell) => {
  return parseFloat(buy) && parseFloat(sell) ? sell - buy : '-';
};

/*
 * Gets either demo or prod collection depending on user
 * id - UID of user
 */
export const getCollectionName = id =>
  id === import.meta.env.VITE_PROD_USER_ID ? 'items' : 'items-demo';
/*
 * Gets either demo or prod storage bucket depending on user
 * id - UID of user
 * name - name of uploaded image
 * ts - timestamp
 */

export const getStorageBucketName = (id, name, ts) =>
  id === import.meta.env.VITE_PROD_USER_ID
    ? `posts/${name}-${ts}`
    : `posts-demo/${name}-${ts}`;

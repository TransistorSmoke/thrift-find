import imageCompression from 'browser-image-compression';

export const compressImage = async file => {
  const options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 800,
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
  // Add a space before all uppercase letters that are not at the beginning of the string,
  // and then convert the whole string to lowercase.
  // let strSplit = str.replace(/([A-Z])/g, ' $1').toLowerCase();
  let split = str.replace(/([A-Z])/g, ' $1').split(' ');
  let transformed = split.map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
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
  console.log('buy, sell: ', buy, sell);
  return parseFloat(buy) && parseFloat(sell) ? sell - buy : '-';
};

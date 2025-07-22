import imageCompression from 'browser-image-compression';

export const compressImage = async file => {
  const options = {
    maxSizeMB: 0.35,
    maxWidthOrHeight: 300,
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

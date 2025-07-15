import imageCompression from 'browser-image-compression';

const compressImage = async file => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    console.log('preview URL - ', URL.createObjectURL(compressedFile));
    return compressedFile;
  } catch (error) {
    throw new Error(`Image compression failed: ${error.message}`);
  }
};

export default compressImage;

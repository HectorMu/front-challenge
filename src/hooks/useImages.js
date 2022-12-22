import { useState, useEffect } from "react";

const IMAGES_URL = "https://jsonplaceholder.typicode.com/photos";

const useImages = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRandomImage = () => {
    if (images.length > 0) {
      const randomImage = images[Math.floor(Math.random() * images.length)];

      return randomImage;
    }
  };

  const getImages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(IMAGES_URL);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return {
    images,
    isLoading,
    error,
    getRandomImage,
  };
};

export default useImages;

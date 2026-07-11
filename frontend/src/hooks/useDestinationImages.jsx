
import { useState, useEffect } from 'react';
import { useUnsplash } from './useUnsplash';
import { usePexels } from './usePexels';
import { getFallbackImages } from './useFallbackImages';

export const useDestinationImages = (destinationName, count = 12) => {
  const [finalImages, setFinalImages] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  // First try Unsplash
  const {
    images: unsplashImages,
    loading: unsplashLoading,
    error: unsplashError,
    refetch: refetchUnsplash
  } = useUnsplash(destinationName, count);

  // Then try Pexels if Unsplash fails
  const {
    images: pexelsImages,
    loading: pexelsLoading,
    error: pexelsError
  } = usePexels(destinationName, count);

  // Combine everything, choose what to use
  useEffect(() => {
    // Determine which source to use
    let imagesToUse = [];

    if (unsplashImages.length > 0) {
      imagesToUse = unsplashImages;
    } else if (pexelsImages.length > 0) {
      imagesToUse = pexelsImages;
    } else {
      imagesToUse = getFallbackImages(destinationName);
    }

    // Ensure at least 8 images, up to 12
    setFinalImages(imagesToUse.slice(0, 12));
    
    // Randomize hero index for fresh look each time
    const randomIndex = Math.floor(Math.random() * Math.min(imagesToUse.length, 8));
    setHeroIndex(randomIndex);
    
  }, [unsplashImages, pexelsImages, destinationName]);

  const loading = unsplashLoading || pexelsLoading;

  return {
    images: finalImages,
    heroImage: finalImages[heroIndex] || finalImages[0],
    loading,
    error: unsplashError || pexelsError,
    refetch: () => {
      refetchUnsplash();
      const randomIndex = Math.floor(Math.random() * Math.min(finalImages.length, 8));
      setHeroIndex(randomIndex);
    }
  };
};

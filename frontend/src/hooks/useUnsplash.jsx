
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const useUnsplash = (query, count = 12) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = useCallback(async () => {
    if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === 'your_unsplash_access_key_here') {
      console.warn('Unsplash API key not configured');
      setLoading(false);
      setError('API key missing');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Search Unsplash for high-quality, landscape images
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: query,
          per_page: count,
          orientation: 'landscape',
          content_filter: 'high'
        },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      });

      // Format the response to get the right sizes
      const formattedImages = response.data.results.map((photo) => ({
        id: photo.id,
        url: photo.urls.regular, // Good quality for most things
        full: photo.urls.full, // For lightbox
        thumb: photo.urls.small, // Thumbnails
        download: photo.links.download_location,
        author: photo.user.name,
        alt: photo.alt_description || photo.description
      }));

      // Shuffle the images for randomness
      const shuffled = [...formattedImages].sort(() => Math.random() - 0.5);

      setImages(shuffled);
      setLoading(false);

      // Cache in localStorage for 1 hour
      try {
        const cacheKey = `unsplash_${query}`;
        const cacheData = {
          data: shuffled,
          timestamp: Date.now(),
          ttl: 3600000 // 1 hour
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      } catch (e) {
        console.warn('Failed to cache Unsplash data', e);
      }

    } catch (err) {
      console.error('Error fetching Unsplash images:', err);
      setLoading(false);
      setError(err);
    }
  }, [query, count]);

  // Check cache first on mount
  useEffect(() => {
    const cacheKey = `unsplash_${query}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp, ttl } = JSON.parse(cached);
        if (Date.now() - timestamp < ttl) {
          setImages(data);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      // Ignore cache errors, just fetch new
    }
    fetchImages();
  }, [query, fetchImages]);

  return {
    images,
    loading,
    error,
    refetch: fetchImages
  };
};

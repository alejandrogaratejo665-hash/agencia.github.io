
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export const usePexels = (query, count = 12) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = useCallback(async () => {
    if (!PEXELS_API_KEY || PEXELS_API_KEY === 'your_pexels_api_key_here') {
      console.warn('Pexels API key not configured');
      setLoading(false);
      setError('API key missing');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('https://api.pexels.com/v1/search', {
        params: {
          query: query,
          per_page: count,
          orientation: 'landscape',
          size: 'large'
        },
        headers: {
          Authorization: PEXELS_API_KEY
        }
      });

      const formattedImages = response.data.photos.map((photo) => ({
        id: photo.id,
        url: photo.src.large,
        full: photo.src.original,
        thumb: photo.src.medium,
        author: photo.photographer,
        alt: photo.alt
      }));

      const shuffled = [...formattedImages].sort(() => Math.random() - 0.5);

      setImages(shuffled);
      setLoading(false);

      try {
        const cacheKey = `pexels_${query}`;
        const cacheData = {
          data: shuffled,
          timestamp: Date.now(),
          ttl: 3600000
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      } catch (e) {
        console.warn('Failed to cache Pexels data', e);
      }

    } catch (err) {
      console.error('Error fetching Pexels images:', err);
      setLoading(false);
      setError(err);
    }
  }, [query, count]);

  useEffect(() => {
    const cacheKey = `pexels_${query}`;
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
    } catch (e) {}
    fetchImages();
  }, [query, fetchImages]);

  return { images, loading, error, refetch: fetchImages };
};

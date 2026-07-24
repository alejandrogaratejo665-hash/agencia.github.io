import { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (err) {
      console.error('Error loading favorites:', err);
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Error saving favorites:', err);
    }
  }, [favorites]);

  const addFavorite = (item) => {
    // Check if item is already in favorites
    const isAlreadyFavorite = favorites.some(fav => fav.id === item.id && fav.type === item.type);
    if (!isAlreadyFavorite) {
      setFavorites([...favorites, item]);
    }
  };

  const removeFavorite = (itemId, itemType) => {
    setFavorites(favorites.filter(fav => !(fav.id === itemId && fav.type === itemType)));
  };

  const isFavorite = (itemId, itemType) => {
    return favorites.some(fav => fav.id === itemId && fav.type === itemType);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

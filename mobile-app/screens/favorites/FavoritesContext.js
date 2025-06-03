import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Context oluştur
const FavoritesContext = createContext();

// Placeholder image için URL
export const placeholderImage = 'YOUR_API_KEY';

// Optimized Unsplash URL utility function
const optimizeUnsplashUrl = (url) => 'YOUR_API_KEY';

// Hayvan görsellerinin URL'leri
export const animalImages = {
  'aslan': 'YOUR_API_KEY',
  'fil': 'YOUR_API_KEY',
  'kartal': 'YOUR_API_KEY',
  'köpek': 'YOUR_API_KEY',
  'kedi': 'YOUR_API_KEY',
  'timsah': 'YOUR_API_KEY',
  'somon': 'YOUR_API_KEY',
  'örümcek': 'YOUR_API_KEY',
  'kurt': 'YOUR_API_KEY',
  'maymun': 'YOUR_API_KEY',
  'zürafa': 'YOUR_API_KEY',
  'papağan': 'YOUR_API_KEY',
  'yılan': 'YOUR_API_KEY',
  'güvercin': 'YOUR_API_KEY',
  'kertenkele': 'YOUR_API_KEY',
  'kaplumbağa': 'YOUR_API_KEY',
  'köpekbalığı': 'YOUR_API_KEY',
  'palyaço balığı': 'YOUR_API_KEY',
  'ahtapot': 'YOUR_API_KEY',
  'arı': 'YOUR_API_KEY',
  'kelebek': 'YOUR_API_KEY',
  'karınca': 'YOUR_API_KEY',
  'baykuş': 'YOUR_API_KEY',
  'flamingo': 'YOUR_API_KEY',
};

// Provider bileşeni
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Favori listesini AsyncStorage'dan yükle
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites !== null) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Favoriler yüklenirken hata oluştu:', error);
      }
    };

    loadFavorites();
  }, []);

  // Favori listesini AsyncStorage'a kaydet
  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Favoriler kaydedilirken hata oluştu:', error);
    }
  };

  // Favorilere ekle
  const addToFavorites = (animal) => {
    // Önce kontrol et, aynı hayvan zaten favorilerde var mı
    const isAlreadyFavorite = favorites.some(fav => fav.name === animal);
    
    if (!isAlreadyFavorite) {
      const newFavorite = {
        id: Date.now().toString(),
        name: animal,
        imageUrl: animalImages[animal] || placeholderImage
      };
      
      const newFavorites = [...favorites, newFavorite];
      setFavorites(newFavorites);
      saveFavorites(newFavorites);
      return true; // Başarıyla eklendi
    }
    
    return false; // Zaten favorilerde
  };

  // Favorilerden çıkar
  const removeFromFavorites = (id) => {
    const newFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  // Favori kontrolü
  const isFavorite = (animal) => {
    return favorites.some(fav => fav.name === animal);
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addToFavorites, 
        removeFromFavorites,
        isFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites hook must be used within a FavoritesProvider');
  }
  return context;
}; 
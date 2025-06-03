import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { useFavorites, animalImages, placeholderImage } from '../favorites/FavoritesContext';

// Ortak resim önbelleğe alma ayarları
const imageDefaultProps = {
  cachePolicy: 'memory-disk',
  contentFit: 'cover',
  transition: 300,
  placeholderContentFit: 'cover',
  placeholder: { uri: placeholderImage },
};

export default function AnimalDetailScreen({ route, navigation }) {
  const { animal } = route.params;
  const [loading, setLoading] = useState(true);
  const [animalData, setAnimalData] = useState(null);
  const [error, setError] = useState(null);

  // Favoriler context'ini kullan
  const { addToFavorites, isFavorite } = useFavorites();
  const [isFavorited, setIsFavorited] = useState(false);

  // API server URL
  const API_URL = 'YOUR_API_KEY';

  useEffect(() => {
    // Favori durumunu kontrol et
    setIsFavorited(isFavorite(animal));
    
    // Hayvan detaylarını getir
    fetchAnimalDetails();
  }, [animal]);

  const fetchAnimalDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/animal-nutrition?animal=${encodeURIComponent(animal)}`);
      const text = await response.text();
      const data = JSON.parse(text);

      if (data.success) {
        setAnimalData(data);
      } else {
        setError(`${animal} hakkında detaylı bilgi bulunamadı.`);
      }
    } catch (error) {
      console.error('API Error:', error);
      setError('Bağlantı hatası! Lütfen internet bağlantınızı kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  // Favorilere ekleme işlemi
  const handleAddToFavorites = () => {
    const result = addToFavorites(animal);
    
    if (result) {
      setIsFavorited(true);
      Alert.alert(
        "Başarılı",
        `${animal} favorilere eklendi!`,
        [{ text: "Tamam", onPress: () => console.log("OK Pressed") }]
      );
    } else {
      Alert.alert(
        "Bilgi",
        `${animal} zaten favorilerinizde bulunuyor.`,
        [{ text: "Tamam", onPress: () => console.log("OK Pressed") }]
      );
    }
  };

  // Hayvan türüne göre varsayılan bir resim URL'i
  const getAnimalImageUrl = () => {
    return animalImages[animal] || placeholderImage;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{animal.toUpperCase()}</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Bilgiler yükleniyor...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchAnimalDetails}
          >
            <Text style={styles.retryButtonText}>Tekrar Dene</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.detailsContainer}>
          <Image
            source={{ uri: getAnimalImageUrl() }}
            style={styles.animalImage}
            {...imageDefaultProps}
          />
          
          <View style={styles.infoSection}>
            <Text style={styles.animalTitle}>{animalData.animal.toUpperCase()}</Text>
            <Text style={styles.sectionTitle}>Beslenme Bilgisi</Text>
            <Text style={styles.infoText}>{animalData.dietInformation}</Text>
            
            <Text style={styles.sectionTitle}>Yaşam Alanı</Text>
            <Text style={styles.infoText}>
              {animal === 'aslan' ? 'Afrika ve Asya\'nın bazı bölgelerindeki savanlar ve çayırlarda yaşar.' :
              animal === 'fil' ? 'Afrika ve Asya\'nın tropikal ormanları ve savanlarında yaşar.' :
              animal === 'kartal' ? 'Dağlık bölgeler, açık alanlar ve deniz kıyılarında yaşar.' :
              animal === 'köpek' ? 'İnsanlarla birlikte dünyanın her yerinde yaşar, evcil hayvanlardır.' :
              animal === 'kedi' ? 'İnsanlarla birlikte dünyanın her yerinde yaşar, evcil hayvanlardır.' :
              animal === 'timsah' ? 'Tropikal bölgelerdeki nehirler, göller ve bataklıklarda yaşar.' :
              animal === 'somon' ? 'Kuzey Atlantik ve Kuzey Pasifik\'teki soğuk sularda yaşar.' :
              animal === 'örümcek' ? 'Antarktika hariç dünyanın her yerinde bulunabilir.' :
              'Bu hayvanın yaşam alanı hakkında detaylı bilgi bulunmamaktadır.'}
            </Text>
            
            <Text style={styles.sectionTitle}>İlginç Bilgiler</Text>
            <Text style={styles.infoText}>
              {animal === 'aslan' ? 'Aslanlar günde 20 saate kadar uyuyabilir. Erkek aslanların yelesi, onları daha heybetli gösterir ve dövüşlerde koruma sağlar.' :
              animal === 'fil' ? 'Filler, insanlardan sonra en iyi hafızaya sahip hayvanlardır. Hortumlarında 40.000\'den fazla kas bulunur.' :
              animal === 'kartal' ? 'Kartallar 3 km yükseklikten avlarını görebilir. Kanatları açıldığında 2 metreye kadar ulaşabilir.' :
              animal === 'köpek' ? 'Köpekler 1 milyon kat daha güçlü koku alma duyusuna sahiptir. İnsanların duygularını anlayabilirler.' :
              animal === 'kedi' ? 'Kediler 5 kat daha hızlı iyileşebilirler. Miyavlamaları özellikle insanlarla iletişim için geliştirdikleri bir yöntemdir.' :
              animal === 'timsah' ? 'Timsahlar 100 milyon yıldan fazla süredir çok az değişiklikle dünyada yaşamaktadır. Dakikada 8 kilometre hızla koşabilirler.' :
              animal === 'somon' ? 'Somon balıkları doğdukları yere yumurtlamak için binlerce kilometre yolculuk yaparlar.' :
              animal === 'örümcek' ? 'Örümcekler ağlarını örerken vücutlarındaki özel bezlerden ipek salgılarlar. Bu ipek çelikten 5 kat daha güçlüdür.' :
              'Bu hayvan hakkında ilginç bilgiler eklenecek.'}
            </Text>
          </View>
        </ScrollView>
      )}

      {/* Favori Butonu */}
      <View style={styles.favoriteButtonContainer}>
        <TouchableOpacity 
          style={[
            styles.favoriteButton,
            isFavorited && styles.favoriteButtonActive
          ]}
          onPress={handleAddToFavorites}
        >
          <Text style={styles.favoriteButtonText}>
            {isFavorited ? "Favorilerde" : "Favorilere Ekle"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 30, // backButton genişliği kadar
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
  },
  animalImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#e0e0e0', // Yükleme sırasında arka plan rengi
  },
  infoSection: {
    padding: 20,
  },
  animalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 15,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  favoriteButtonContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  favoriteButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: '#4CAF50',
  },
  favoriteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 
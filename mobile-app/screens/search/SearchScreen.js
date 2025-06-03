import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { animalImages, placeholderImage } from '../favorites/FavoritesContext';

// Ortak resim önbelleğe alma ayarları
const imageDefaultProps = {
  cachePolicy: 'memory-disk',
  contentFit: 'cover',
  transition: 300,
  placeholderContentFit: 'cover',
  placeholder: { uri: placeholderImage },
};

export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Klavye dinleyicileri
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Tüm hayvanlar listesi
  const allAnimals = [
    { id: '1', name: 'aslan', category: 'Memeliler' },
    { id: '2', name: 'fil', category: 'Memeliler' },
    { id: '3', name: 'kartal', category: 'Kuşlar' },
    { id: '4', name: 'köpek', category: 'Memeliler' },
    { id: '5', name: 'kedi', category: 'Memeliler' },
    { id: '6', name: 'timsah', category: 'Sürüngenler' },
    { id: '7', name: 'somon', category: 'Balıklar' },
    { id: '8', name: 'örümcek', category: 'Böcekler' },
    { id: '9', name: 'kurt', category: 'Memeliler' },
    { id: '10', name: 'maymun', category: 'Memeliler' },
    { id: '11', name: 'zürafa', category: 'Memeliler' },
    { id: '12', name: 'papağan', category: 'Kuşlar' },
    { id: '13', name: 'yılan', category: 'Sürüngenler' },
    { id: '14', name: 'kertenkele', category: 'Sürüngenler' },
    { id: '15', name: 'kaplumbağa', category: 'Sürüngenler' },
    { id: '16', name: 'köpekbalığı', category: 'Balıklar' },
    { id: '17', name: 'palyaço balığı', category: 'Balıklar' },
    { id: '18', name: 'ahtapot', category: 'Balıklar' },
    { id: '19', name: 'arı', category: 'Böcekler' },
    { id: '20', name: 'kelebek', category: 'Böcekler' },
    { id: '21', name: 'karınca', category: 'Böcekler' },
    { id: '22', name: 'baykuş', category: 'Kuşlar' },
    { id: '23', name: 'güvercin', category: 'Kuşlar' },
    { id: '24', name: 'flamingo', category: 'Kuşlar' },
  ];

  const searchAnimals = () => {
    if (!searchText.trim()) return;
    
    setSearching(true);
    setSearched(true);
    
    // Hayali bir API çağrısı simülasyonu
    setTimeout(() => {
      // Türkçe karakterleri normalleştirme fonksiyonu
      const normalizeText = (text) => {
        return text.toLowerCase()
          .replace(/ı/g, 'i')
          .replace(/ğ/g, 'g')
          .replace(/ü/g, 'u')
          .replace(/ş/g, 's')
          .replace(/ö/g, 'o')
          .replace(/ç/g, 'c');
      };

      const normalizedSearch = normalizeText(searchText);
      
      const filtered = allAnimals.filter(animal => {
        const normalizedName = normalizeText(animal.name);
        const normalizedCategory = normalizeText(animal.category);
        
        return normalizedName.includes(normalizedSearch) || 
               normalizedCategory.includes(normalizedSearch) ||
               animal.name.toLowerCase().includes(searchText.toLowerCase()) ||
               animal.category.toLowerCase().includes(searchText.toLowerCase());
      });
      
      setResults(filtered);
      setSearching(false);
    }, 800); // 800ms gecikme ile arama sonuçları gösteriliyor
  };

  const getAnimalImage = (animalName) => {
    return animalImages[animalName] || placeholderImage;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => navigation.navigate('AnimalDetail', { animal: item.name })}
    >
      <Image 
        source={{ uri: getAnimalImage(item.name) }}
        style={styles.animalImage}
        {...imageDefaultProps}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.animalName}>{item.name.toUpperCase()}</Text>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateTo = (screen) => {
    setMenuVisible(false);
    navigation.navigate(screen);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar style="light" />
      
      {/* Header with Menu Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hayvan Ara</Text>
      </View>

      {/* Menu Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigateTo('AnaSayfa')}
            >
              <Text style={styles.menuItemText}>Ana Sayfa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigateTo('Arama')}
            >
              <Text style={styles.menuItemText}>Ara</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigateTo('Favoriler')}
            >
              <Text style={styles.menuItemText}>Favoriler</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Search Bar */}
      <View style={[
        styles.searchContainer,
        keyboardVisible && styles.searchContainerKeyboardOpen
      ]}>
        <TextInput
          style={styles.searchInput}
          placeholder="Hayvan adı veya kategori ara..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={searchAnimals}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={searchAnimals}
          disabled={searching || !searchText.trim()}
        >
          {searching ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.searchButtonText}>Ara</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Results */}
      {searched && (
        <View style={[
          styles.resultsContainer,
          keyboardVisible && { marginBottom: 50 }
        ]}>
          {searching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.loadingText}>Aranıyor...</Text>
            </View>
          ) : results.length > 0 ? (
            <>
              <Text style={styles.resultsCount}>
                "{searchText}" için {results.length} sonuç bulundu
              </Text>
              <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
              />
            </>
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>"{searchText}" ile ilgili sonuç bulunamadı</Text>
              <Text style={styles.noResultsSubText}>
                Farklı bir arama terimi deneyin veya ana sayfadan bir kategori seçin.
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Başlangıç durumu - henüz arama yapılmadı */}
      {!searched && (
        <View style={styles.initialContainer}>
          <Text style={styles.initialText}>Hayvan adı veya kategorisi arayın</Text>
          <Text style={styles.initialSubText}>
            Örnek: "aslan", "köpek", "Memeliler", "Kuşlar" gibi
          </Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 0,
  },
  searchContainerKeyboardOpen: {
    position: 'absolute',
    top: 85, // Header yüksekliğinden sonra
    left: 0,
    right: 0,
    zIndex: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsCount: {
    padding: 15,
    fontSize: 16,
    color: '#666',
    backgroundColor: '#f0f0f0',
  },
  listContainer: {
    padding: 10,
    paddingBottom: 30,
  },
  resultItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  animalImage: {
    width: 80,
    height: 80,
    backgroundColor: '#e0e0e0', // Yükleme sırasında arka plan rengi
  },
  infoContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  animalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    color: '#4CAF50',
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
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    paddingBottom: 45,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  noResultsSubText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
  initialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    paddingBottom: 45,
  },
  initialText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  initialSubText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
  header: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  menuButton: {
    padding: 10,
  },
  menuButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
}); 
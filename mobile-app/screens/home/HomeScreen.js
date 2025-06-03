import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard,
  Modal,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { animalImages, placeholderImage } from '../favorites/FavoritesContext';
import Constants from 'expo-constants';

// Ortak resim önbelleğe alma ayarları
const imageDefaultProps = {
  cachePolicy: 'memory-disk',
  contentFit: 'cover',
  transition: 300,
  placeholderContentFit: 'cover',
  placeholder: { uri: placeholderImage },
};

// API URL'i .env dosyasından veya Constants.manifest.extra'dan al
// Not: .env kullanımı için metro.config.js ve app.config.js yapılandırması gerekir
const API_URL = Constants.expoConfig?.extra?.apiUrl || 'YOUR_API_KEY';

export default function HomeScreen({ navigation }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '🐾 Merhaba! Hangi hayvanın beslenme bilgilerini öğrenmek istiyorsunuz?',
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const scrollViewRef = useRef();
  const [menuVisible, setMenuVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Hayvan kategorileri
  const categories = ['Tümü', 'Memeliler', 'Kuşlar', 'Sürüngenler', 'Balıklar', 'Böcekler'];

  // Kategori bazlı hayvanlar
  const animalsByCategory = {
    'Tümü': ['aslan', 'fil', 'kartal', 'köpek', 'kedi', 'timsah', 'somon', 'örümcek', 'kurt', 'maymun'],
    'Memeliler': ['aslan', 'fil', 'köpek', 'kedi', 'kurt', 'maymun', 'zürafa'],
    'Kuşlar': ['kartal', 'papağan', 'güvercin', 'baykuş', 'flamingo'],
    'Sürüngenler': ['timsah', 'yılan', 'kertenkele', 'kaplumbağa'],
    'Balıklar': ['somon', 'köpekbalığı', 'palyaço balığı', 'ahtapot'],
    'Böcekler': ['örümcek', 'arı', 'kelebek', 'karınca']
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/animal-nutrition?animal=${encodeURIComponent(currentInput)}`);
      const text = await response.text();
      console.log('API yanıtı:', text);
      const data = JSON.parse(text);

      let botResponse;
      if (data.success) {
        botResponse = {
          id: Date.now() + 1,
          text: `🐾 ${data.animal.toUpperCase()}\n\n${data.dietInformation}`,
          isUser: false,
        };
      } else {
        botResponse = {
          id: Date.now() + 1,
          text: `❌ ${currentInput} hakkında bilgi bulamadım. Başka bir hayvan deneyin.`,
          isUser: false,
        };
      }

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: '❌ Bağlantı hatası! API server çalışıyor mu kontrol edin.',
        isUser: false,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Kategori seçme fonksiyonu
  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  // Seçilen kategoriye göre hayvanları filtreleme
  const filteredAnimals = animalsByCategory[selectedCategory] || [];

  // Hayvan detay sayfasına gitmek için
  const goToAnimalDetail = (animal) => {
    navigation.navigate('AnimalDetail', { animal });
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateTo = (screen) => {
    setMenuVisible(false);
    navigation.navigate(screen);
  };

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
        <Text style={styles.headerTitle}>🐾 Hayvan Beslenme Uzmanı</Text>
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
      
      {/* Kategori Seçimi */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Kategoriler:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonSelected
              ]}
              onPress={() => selectCategory(category)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextSelected
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Messages */}
      <ScrollView 
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={[
              styles.messageText,
              message.isUser ? styles.userMessageText : styles.botMessageText,
            ]}>
              {message.text}
            </Text>
          </View>
        ))}
        
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#4CAF50" />
            <Text style={styles.loadingText}>Yanıt hazırlanıyor...</Text>
          </View>
        )}
        <View style={{ height: keyboardVisible ? 250 : 100 }} />
      </ScrollView>

      {/* Quick Buttons */}
      {!keyboardVisible && (
        <View style={styles.quickContainer}>
          <Text style={styles.quickTitle}>{selectedCategory} Kategorisinden Hayvanlar:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filteredAnimals.map((animal, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickButton}
                onPress={() => {
                  setInputText(animal);
                }}
                onLongPress={() => goToAnimalDetail(animal)}
              >
                {animalImages[animal] && (
                  <Image 
                    source={{ uri: animalImages[animal] }}
                    style={styles.animalThumbnail}
                    {...imageDefaultProps}
                  />
                )}
                <Text style={styles.quickButtonText}>{animal}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Input */}
      <View style={[
        styles.inputContainer,
        keyboardVisible && styles.inputContainerKeyboardOpen
      ]}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Hayvan adını yazın..."
          placeholderTextColor="#999"
          onSubmitEditing={() => {
            sendMessage();
            Keyboard.dismiss();
          }}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
          onPress={() => {
            sendMessage();
            Keyboard.dismiss();
          }}
          disabled={isLoading || !inputText.trim()}
        >
          <Text style={styles.sendButtonText}>Gönder</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  categoryContainer: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    zIndex: 2,
  },
  categoryTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryButtonSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  categoryButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryButtonTextSelected: {
    color: 'white',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingBottom: 5,
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4CAF50',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: 'white',
  },
  botMessageText: {
    color: '#333',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  loadingText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  quickContainer: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginBottom: 0,
    zIndex: 5,
  },
  quickTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  quickButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  animalThumbnail: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
    backgroundColor: '#e0e0e0', // Yükleme sırasında arka plan rengi
  },
  quickButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginBottom: 80, // Telefon simgeleriyle çakışmaması için daha fazla boşluk
    zIndex: 10,
  },
  inputContainerKeyboardOpen: {
    marginBottom: 5, // Klavye açıkken daha az boşluk
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 2,
    borderTopColor: '#4CAF50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#a5d6a7',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  menuButton: {
    padding: 10,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuItemText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
}); 
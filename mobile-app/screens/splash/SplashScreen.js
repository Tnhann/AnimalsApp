import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';

export default function SplashScreen({ navigation }) {
  // Animasyon değerini tutacak ref
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const textOpacityAnim = useRef(new Animated.Value(0)).current;

  // İlginç hayvan bilgileri dizisi
  const ilgincBilgiler = [
    "Dünya üzerinde 1 milyondan fazla hayvan türü yaşamaktadır ve bunların çoğu hala keşfedilmeyi bekliyor!",
    "Balinalar 30 dakikaya kadar nefeslerini tutabilirler ve uykularının sadece yarısında beyinlerinin bir tarafı uyur.",
    "Karıncalar kendi ağırlıklarının 50 katı ağırlığı kaldırabilirler, bu insanların bir arabayı kaldırabilmesine eşdeğerdir.",
    "Zürafalar günde sadece 30 dakika uyurlar ve bunu genellikle 5 dakikalık kısa aralıklarla yaparlar.",
    "Yunusların, bir gözleri açık uyuyarak beynin bir yarısını dinlendirdikleri benzersiz bir uyku mekanizması vardır.",
    "Koalalar günün neredeyse 22 saatini uyuyarak geçirirler ve okaliptüs yapraklarındaki düşük enerji değeri buna sebep olur.",
    "Arılar, kovanlarına geri dönmek için güneşin pozisyonuna göre yön bulurlar ve diğer arılara yiyecek yerini 'dans' ile anlatırlar.",
    "Ahtapotların 9 beyni vardır - merkezi bir beyin ve her kolda bir mini beyin bulunur.",
    "Kaplanların derileri de çizgilidir, sadece kürkleri değil!",
    "Penguenler bir eşleri olduğunda, genellikle ömür boyu birlikte kalırlar.",
  ];

  // Rastgele bir bilgi seç
  const rastgeleBilgi = ilgincBilgiler[Math.floor(Math.random() * ilgincBilgiler.length)];

  useEffect(() => {
    // Görsel animasyonu
    Animated.sequence([
      // Önce görsel büyüsün
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Sonra metin görünsün
      Animated.timing(textOpacityAnim, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // 6 saniye sonra ana sayfaya geçiş yap
    const timer = setTimeout(() => {
      navigation.replace('MainApp');
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.contentContainer}>
        <Animated.View
          style={[
            styles.imageContainer,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <Image
            source={{ uri: 'YOUR_API_KEY' }}
            style={styles.image}
            contentFit="cover"
            cachePolicy="memory-disk"
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textOpacityAnim,
            },
          ]}
        >
          <Text style={styles.titleText}>Hayvan Dünyasına Hoşgeldiniz</Text>
          <Text style={styles.infoText}>{rastgeleBilgi}</Text>
        </Animated.View>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.replace('MainApp')}
        >
          <Text style={styles.skipText}>Atla</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 30,
    backgroundColor: 'white',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    marginHorizontal: 20,
  },
  skipButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  skipText: {
    color: 'white',
    fontWeight: '600',
  },
}); 
import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Ekranlar
import HomeScreen from './screens/home/HomeScreen';
import AnimalDetailScreen from './screens/details/AnimalDetailScreen';
import FavoritesScreen from './screens/favorites/FavoritesScreen';
import SearchScreen from './screens/search/SearchScreen';
import SplashScreen from './screens/splash/SplashScreen';

// Favori Context Provider
import { FavoritesProvider } from './screens/favorites/FavoritesContext';

// Stack Navigator tanımlaması
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

// Ana uygulama için stack navigator
function MainAppStack() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="AnaSayfa" component={HomeScreen} />
      <MainStack.Screen name="Arama" component={SearchScreen} />
      <MainStack.Screen name="Favoriler" component={FavoritesScreen} />
      <MainStack.Screen name="AnimalDetail" component={AnimalDetailScreen} />
    </MainStack.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Splash" component={SplashScreen} />
          <RootStack.Screen name="MainApp" component={MainAppStack} />
        </RootStack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
} 
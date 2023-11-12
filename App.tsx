import 'react-native-gesture-handler';
import React from 'react';
import { MainNavigator } from './src/navigation/main-navigator';
import { NavigationContainer } from '@react-navigation/native';
import { useCustomFonts } from './src/hooks/useCustomFonts';
import { AppProvider } from './src/context';

export default function App() {
  const { fontsLoaded } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}


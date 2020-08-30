import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import SplashScreen from 'react-native-splash-screen';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto';
import { View } from 'react-native';

import { Routes } from './routes';
import dark from './styles/themes/dark';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hide();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <View style={{ backgroundColor: '#312E38', flex: 1 }} />;
  }

  return (
    <ThemeProvider theme={dark}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;

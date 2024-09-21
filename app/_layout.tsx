import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import GlobalProvider from '@/context/GlobalProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets_other/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets_other/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets_other/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets_other/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets_other/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets_other/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets_other/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets_other/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets_other/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  // const colorScheme = useColorScheme();
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets_other/fonts/SpaceMono-Regular.ttf'),
  // });

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }

  return (
    // <ThemeProvider value={DarkTheme}></ThemeProvider>
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GlobalProvider>
  );
}

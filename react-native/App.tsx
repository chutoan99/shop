import React, { useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import RoutesConfig from "./src/route";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Black": require("./src/assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("./src/assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("./src/assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-ExtraLight": require("./src/assets/fonts/Inter-ExtraLight.ttf"),
    "Inter-Light": require("./src/assets/fonts/Inter-Light.ttf"),
    "Inter-Medium": require("./src/assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("./src/assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("./src/assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Thin": require("./src/assets/fonts/Inter-Thin.ttf"),
  });

  const loadResourcesAndDataAsync = useCallback(async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    } catch (e) {
      console.warn(e);
    }
  }, [fontsLoaded, fontError]);
  useEffect(() => {
    loadResourcesAndDataAsync();
  }, [loadResourcesAndDataAsync]);

  if (!fontsLoaded && !fontError) {
    return null; 
  }
  return (
    <RoutesConfig></RoutesConfig>
  );
}

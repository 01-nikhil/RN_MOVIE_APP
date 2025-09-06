import { Stack } from "expo-router";
import './global.css'
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar, View } from "react-native"; // Add View import

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    MontserratRegular: Montserrat_400Regular,
    MontserratBold: Montserrat_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar hidden={true} />
      <View style={{ flex: 1, backgroundColor: "#0D0D0D" }}> {/* Add this wrapper */}
        <Stack 
          screenOptions={{
            contentStyle: { backgroundColor: "#0D0D0D" },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              contentStyle: { backgroundColor: "#0D0D0D" }, // Ensure tabs group also has it
            }}
          />
          <Stack.Screen
            name="movies/[id]"
            options={{
              headerShown: false,
              contentStyle: { backgroundColor: "#0D0D0D" },
              animation: "fade",
            }}
          />
        </Stack>
      </View>
    </>
  );
}
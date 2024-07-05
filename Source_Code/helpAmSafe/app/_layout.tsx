import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar, Text } from "react-native";
import "react-native-reanimated";
import Colors from "@/constants/Colors";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// const queryClient = new QueryClient();

// Clerk needs the publishable key
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

/* Cache the Clerk JWT 
Tells Clerk to use the below mechanism to store the token */

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    ...FontAwesome.font,
  });

  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    console.log("Segments:", segments);
  }, [segments]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoaded) return;
    const inAuthGroup = segments[0] === "(authenticated)";
    //  console.log(isSignedIn)

    if (isSignedIn && !inAuthGroup) {
      console.log(segments);
      router.replace("/(authenticated)/(tabs)/home");
      // } else if (
      //   !isSignedIn &&
      //   !segments.includes("login") &&
      //   !segments.includes("signup") &&
      //   !segments.includes("help") &&
      //   !segments.includes("verify/[phone]")
      // ) {
      //   router.replace("/");
    }
  }, [isSignedIn, isLoaded, segments]);

  if (!loaded || !isLoaded) {
    return <Text>Loading...</Text>;
  }

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle={"dark-content"} translucent={false} />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="secondpage" options={{ headerShown: true }} />
        <Stack.Screen name="thirdpage" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="verify/[phone]" options={{ headerShown: false }} />
        <Stack.Screen
          name="(authenticated)/(tabs)"
          options={{ headerShown: false}}
        />
      </Stack>
    </>
  );
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <InitialLayout />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
};

export default RootLayoutNav;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Import Firebase auth instance
import Colors from "../constants/Colors"; // Ensure correct path for Colors import
import { defaultStyles } from "../constants/Styles"; // Ensure correct path for defaultStyles import

// An enum for the different sign-in functionalities
enum SignInType {
  Email,
  Google,
  Facebook,
}

const logoImage = require("../assets/images/LOGO.png");

const Page: React.FC = () => {
  // Fonts
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  // State management
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null); // Replace 'any' with appropriate user type if available

  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();

  const onSignIn = async (type: SignInType) => {
    setLoading(true);
    try {
      if (type === SignInType.Email) {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "You have successfully logged in!");
        router.push("/home"); // Replace with your desired route
      } else if (type === SignInType.Google) {
        // Implement Google Sign-In
      } else if (type === SignInType.Facebook) {
        // Implement Facebook Sign-In
      }
    } catch (error: any) {
      // Specific error handling
      switch (error.code) {
        case "auth/invalid-email":
          Alert.alert("Invalid Email", "The email address is not valid.");
          break;
        case "auth/user-disabled":
          Alert.alert(
            "Account Disabled",
            "This user account has been disabled."
          );
          break;
        case "auth/user-not-found":
          Alert.alert("User Not Found", "No user found with this email.");
          break;
        case "auth/wrong-password":
          Alert.alert("Wrong Password", "The password is incorrect.");
          break;
        case "auth/network-request-failed":
          Alert.alert(
            "Network Error",
            "Network request failed. Please check your connection."
          );
          break;
        case "auth/invalid-credential":
          Alert.alert(
            "Invalid Credential",
            "Invalid email address or password"
          );
          break;
        default:
          Alert.alert("Error", error.message);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  if (!loaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={[defaultStyles.container, { flex: 1 }]}>
        <Image source={logoImage} style={styles.logo} />

        <Text style={styles.title}>Login to your account</Text>
        <Text style={styles.subtitle}>
          A verification code will be sent to your phone number to verify your
          account.
        </Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.gray}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor={Colors.gray}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.loginButton,
            email && password ? styles.enabled : styles.disabled,
          ]}
          onPress={() => onSignIn(SignInType.Email)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text>Don't have an account? </Text>
          <Link href={"/signup"}>
            <Text style={styles.signupText}>Sign Up</Text>
          </Link>
        </View>

        <Text style={styles.orRegisterText}>Or Login Using</Text>
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => onSignIn(SignInType.Facebook)}
          >
            <Ionicons name="logo-facebook" size={30} color={"#1877F2"} />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => onSignIn(SignInType.Google)}
          >
            <Ionicons name="logo-google" size={30} color={"#EA4335"} />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    margin: 30,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    borderColor: "#D0D5DD",
    borderWidth: 1,
    marginHorizontal: 20,
  },
  loginButton: {
    backgroundColor: Colors.purple,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  enabled: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: Colors.green,
    fontWeight: "bold",
  },
  orRegisterText: {
    textAlign: "center",
    marginTop: 40,
    marginBottom: 10,
    fontSize: 14,
    color: Colors.gray,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  socialButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
    width: "40%",
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  socialButtonText: {
    color: Colors.dark,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Page;

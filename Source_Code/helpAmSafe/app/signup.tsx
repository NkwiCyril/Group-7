import React, { useCallback, useState } from "react";
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
} from "react-native";
import { useFonts } from "expo-font";
import { Link, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { auth, firestore } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";


const logoImage = require("../assets/images/LOGO.png");

const Page: React.FC = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSignup = async () => {
    try {
      setLoading(true);
      // Simulate async signup process
      setTimeout(() => {
        setLoading(false);
        // Handle the actual signup logic here
      }, 3000); // Simulate a 3-second delay
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      await setDoc(doc(firestore, "users", user.uid), {
        fullName,
        phoneNumber,
        email,
        createdAt: new Date(),
      });

      // Redirect to the dashboard after successful sign-up
      router.push("/login");
    } catch (error) {
      console.error("Error signing up", error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMessage("This email address is already in use.");
            break;
          case "auth/invalid-email":
            setErrorMessage("This email address is invalid.");
            break;
          case "auth/operation-not-allowed":
            setErrorMessage("Email/Password authentication is not enabled.");
            break;
          case "auth/weak-password":
            setErrorMessage("The password is too weak.");
            break;
          default:
            setErrorMessage("An unknown error occurred. Please try again.");
            break;
        }
      } else {
        setErrorMessage("An unknown error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.white }}
      behavior="padding"
    >
      <View style={[styles.container, { flex: 1, paddingTop: 25 }]}>
        <Image source={logoImage} style={styles.logo} />

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g Nyando Onongwene..."
          placeholderTextColor={Colors.gray}
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g example@example.com"
          placeholderTextColor={Colors.gray}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor={Colors.gray}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor={Colors.gray}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[
            styles.pillButton,
            email && password ? styles.enabled : styles.disabled,
          ]}
          onPress={onSignup}
        >
          {loading ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            <Text style={styles.textButton}>Create your account</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text>Already have an account? </Text>
          <Link href={"/login"}>
            <Text style={styles.signupText}>Log in</Text>
          </Link>
        </View>

        <Text style={styles.orRegisterText}>Or Register Using</Text>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={30} color={"#1877F2"} />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={30} color={"#EA4335"} />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  logo: {
    width: 100,
    height: 100,
    paddingTop: 16,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.dark,
    marginVertical: 10,
  },
  label: {
    paddingTop: 10,
    fontSize: 14,
    color: Colors.dark,
  },
  input: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    borderColor: "#D0D5DD",
    borderWidth: 1,
    marginVertical: 8,
  },
  pillButton: {
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 20,
  },
  enabled: {
    backgroundColor: Colors.purple,
  },
  disabled: {
    backgroundColor: Colors.lightPurple,
  },
  textButton: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  signupText: {
    color: Colors.green,
    fontWeight: "bold",
  },
  orRegisterText: {
    textAlign: "center",
    marginVertical: 10,
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
  },
});

export default Page;

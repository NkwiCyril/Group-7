import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { auth } from "@/firebaseConfig";
import firebase from "firebase/auth"; // Import firebase to use its types
import { router } from "expo-router";

const Sidebar = ({ onClose }: { onClose: () => void }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            auth.signOut()
              .then(() => {
                setUser(null);
                Alert.alert("Success", "Logout successfully!!");
                router.push("/login"); // Replace with your desired route
              })
              .catch((error) => {
                console.error("Logout error:", error);
              });
          }
        }
      ],
      { cancelable: false }
    );
  };


  return (
    <View style={styles.sidebar}>
      <View style={styles.header}>
        <Ionicons
          name="close"
          size={30}
          color={Colors.white}
          onPress={onClose}
        />
      </View>
      {user && (
        <View style={styles.profileSection}>
          <Ionicons
            name="person-circle-outline"
            size={100}
            color={Colors.white}
          />
          <Text style={styles.profileName}>{user.displayName}</Text>
          {/* <Text style={styles.profileName}>{user.phoneNumber }</Text> */}
          <Text style={styles.profilePhone}>
            {user.email}
          </Text>
        </View>
      )}
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="person-outline" size={24} color={Colors.white} />
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="document-text-outline" size={24} color={Colors.white} />
        <Text style={styles.menuText}>My Posts</Text>
      </TouchableOpacity>
      <View style={styles.logoutButton}>
        <Button title="Logout" onPress={handleLogout} color={Colors.white} />
      </View>

      {/* Add more menu items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: Colors.purple,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileName: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  profilePhone: {
    color: Colors.white,
    fontSize: 14,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuText: {
    color: Colors.white,
    fontSize: 16,
    marginLeft: 15,
  },
  logoutButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default Sidebar;

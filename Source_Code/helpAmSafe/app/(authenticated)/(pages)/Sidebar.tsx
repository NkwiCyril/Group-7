// components/Sidebar.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Sidebar = ({ onClose }: { onClose: () => void }) => {
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
      <View style={styles.profileSection}>
        <Ionicons
          name="person-circle-outline"
          size={100}
          color={Colors.white}
        />
        <Text style={styles.profileName}>MBUH NKEM</Text>
        <Text style={styles.profilePhone}>+23767040693</Text>
      </View>
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="person-outline" size={24} color={Colors.white} />
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="document-text-outline" size={24} color={Colors.white} />
        <Text style={styles.menuText}>My Posts</Text>
      </TouchableOpacity>
      {/* Add more menu items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: Colors.purple,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
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
});

export default Sidebar;

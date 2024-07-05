import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SosCallEnded = ({ emergencyName, onClose }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Call Ended</Text>
      <Text style={styles.emergencyTitle}>
        Your call for {emergencyName} has ended.
      </Text>
      <TouchableOpacity onPress={onClose} style={styles.doneButton}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  doneButton: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
  },
  doneText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SosCallEnded;

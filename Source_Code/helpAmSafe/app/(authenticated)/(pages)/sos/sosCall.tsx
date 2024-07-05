import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SosCall = ({ emergencyName, onEndCall }) => {
  const [callTime, setCallTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCallTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleEndCall = () => {
    onEndCall();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ongoing Call</Text>
      <Text style={styles.emergencyTitle}>
        HELP {emergencyName.toUpperCase()}
      </Text>
      <Text style={styles.callTimestamp}>
        Call Time: {new Date(callTime * 1000).toISOString().substr(11, 8)}
      </Text>
      <Ionicons name="call" size={100} color="black" style={styles.callIcon} />
      <Text style={styles.infoText}>
        Your SOS message has been sent to people around you and those using the
        app.
      </Text>
      <TouchableOpacity onPress={handleEndCall} style={styles.endCallButton}>
        <Text style={styles.endCallText}>End Call</Text>
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
  callTimestamp: {
    fontSize: 16,
    marginBottom: 20,
  },
  callIcon: {
    marginVertical: 20,
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  endCallButton: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
  },
  endCallText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SosCall;

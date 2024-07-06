import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Ionicons } from "@expo/vector-icons";
import SosCall from "../(pages)/sos/sosCall";
import SosCallEnded from "../(pages)/sos/sosEnd";

const EmergencyScreen = ({ visible, onClose }) => {
  const emergencies = [
    { name: "Floods", icon: "water" },
    { name: "Fires", icon: "fire" },
    { name: "Earthquakes", icon: "wave-square" },
    { name: "Landslides", icon: "house-damage" },
    { name: "Tornado", icon: "wind" },
    { name: "Ambulance", icon: "ambulance" },
    { name: "Volcanic Eruption", icon: "mountain" },
  ];

  const slideAnim = useRef(new Animated.Value(0)).current;
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [callEnded, setCallEnded] = useState(false);

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleEmergencySelect = (emergencyName) => {
    setSelectedEmergency(emergencyName);
    setCallEnded(false);
  };

  const handleEndCall = () => {
    setCallEnded(true);
  };

  return (
    <Modal transparent visible={visible} animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContent,
                {
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [600, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.header}>
                <Text style={styles.headerText}>
                  Select the situation you are in
                </Text>
                <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={styles.grid}>
                {emergencies.map((emergency, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.gridItemWrapper}
                    onPress={() => handleEmergencySelect(emergency.name)}
                  >
                    <View style={styles.gridItem}>
                      <View style={styles.iconBackground}>
                        <Icon name={emergency.icon} size={40} color="#fff" />
                      </View>
                    </View>
                    <Text style={styles.gridItemText}>{emergency.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
      {selectedEmergency && !callEnded && (
        <SosCall emergencyName={selectedEmergency} onEndCall={handleEndCall} />
      )}
      {callEnded && (
        <SosCallEnded emergencyName={selectedEmergency} onClose={onClose} />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    height: "80%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
  closeIcon: {
    padding: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  gridItemWrapper: {
    width: "30%",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: "1.5%",
  },
  gridItem: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#00C0C0",
    justifyContent: "center",
    alignItems: "center",
  },
  gridItemText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    color: "#000",
  },
});

export default EmergencyScreen;

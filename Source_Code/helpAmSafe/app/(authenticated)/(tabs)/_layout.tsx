import React, { useState } from "react";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Colors from "@/constants/Colors";
import CustomHomeHeader from "@/components/home/CustomHomeHeader";
import CustomHeader from "@/components/CustomHeader";
import { Link, Stack, Tabs } from "expo-router";
import EmergencyScreen from "./sos";
import CustomRecoverHeader from "@/components/recover/CustomRecoverHeader";

const Layout = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content" translucent={false} />
      <Tabs
        screenOptions={{
          tabBarBackground: () => (
            <BlurView
              intensity={100}
              tint={"light"}
              style={{
                flex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderTopColor: "rgba(255, 255, 255, 0.3)",
                borderTopWidth: 1,
              }}
            />
          ),
          tabBarStyle: {
            backgroundColor: Colors.white,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            borderTopWidth: 0,
          },
          headerTransparent: true,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            header: () => <CustomHomeHeader />,
            tabBarActiveTintColor: Colors.purple
          }}
        />
        <Tabs.Screen
          name="prepare"
          options={{
            title: "Prepare",
            tabBarIcon: ({ size, color }) => (
              <Ionicons
                name="shield-checkmark-outline"
                size={size}
                color={color}
              />
            ),
            headerShown: false,
            tabBarActiveTintColor: Colors.purple
          }}
        />
        <Tabs.Screen
          name="sos"
          options={{
            title: "",
            tabBarButton: () => (
              <TouchableOpacity
                style={styles.sosTab}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.sosText}>SOS</Text>
              </TouchableOpacity>
            ),
            header: () => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  padding: 16,
                }}
              >
                <TouchableOpacity>
                  <Ionicons
                    name="close-outline"
                    color={Colors.dark}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            ),
            headerShown: false,
            tabBarActiveTintColor: Colors.purple
          }}
        />
        <Tabs.Screen
          name="recover"
          options={{
            title: "Recover",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="construct-outline" size={size} color={color} />
            ),
            header: () => <CustomRecoverHeader />,
            headerTransparent: true,
            tabBarActiveTintColor: Colors.purple
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: "Map",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="map-outline" size={size} color={color} />
            ),
            header: () => <CustomHeader />,
            headerTransparent: true,
            headerShown: false,
            tabBarActiveTintColor: Colors.purple
          }}
        />
      </Tabs>

      {/* EmergencyScreen Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <EmergencyScreen
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  sosTab: {
    position: "absolute",
    bottom: 20, // Adjust based on your preference
    left: 180,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Ensure it appears above other tabs
  },
  sosText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Layout;

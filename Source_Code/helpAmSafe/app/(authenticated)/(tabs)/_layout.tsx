import React from "react";
import { StatusBar, Text, View, StyleSheet } from "react-native";
import CustomHeader from "@/components/CustomHeader";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Stack, Link, Tabs } from "expo-router";
import CustomHomeHeader from "@/components/home/CustomHomeHeader";
import Colors from "@/constants/Colors";

const Layout = () => {
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
          }}
        />
        <Tabs.Screen
          name="sos"
          options={{
            title: "",
            tabBarButton: () => (
              <View style={styles.sosTab}>
                <Link href="/(authenticated)/(tabs)/sos">
                  <Text style={styles.sosText}>SOS</Text>
                </Link>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="recover"
          options={{
            title: "Recover",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="construct-outline" size={size} color={color} />
            ),
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
          }}
        />
      </Tabs>
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
    fontSize: 20
  },
});

export default Layout;

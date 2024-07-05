import React from "react";
import { StatusBar } from "react-native"; // Import StatusBar from react-native

import CustomHeader from "@/components/CustomHeader";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Stack, Tabs } from "expo-router";
import CustomHomeHeader from "@/components/home/CustomHomeHeader";
import Colors from "@/constants/Colors";

const Layout = () => {
  return (
    <>
      {/* Set StatusBar properties */}
      <StatusBar
        barStyle="dark-content" // Specify light or dark content
        translucent={false} // Set to false for opaque StatusBar
      />

      {/* Rest of your component */}
      <Tabs
        screenOptions={{
          tabBarBackground: () => (
            <BlurView
              intensity={100}
              tint={"light"}
              style={{
                flex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.1)", // Light semi-transparent background
                borderTopColor: "rgba(255, 255, 255, 0.3)", // Light border color with low opacity
                borderTopWidth: 1, // Slight border to enhance glassmorphic effect
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
              <FontAwesome name="home" size={size} color={color} />
            ),
            header: () => <CustomHomeHeader />,
          }}
        />
        <Tabs.Screen
          name="prepare"
          options={{
            title: "Prepare",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="shield" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="recover"
          options={{
            title: "Recover",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="line-chart" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: "Map",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="map" size={size} color={color} />
            ),
            header: () => <CustomHeader />,
            headerTransparent: true,
          }}
        />
      </Tabs>
    </>
  );
};

export default Layout;

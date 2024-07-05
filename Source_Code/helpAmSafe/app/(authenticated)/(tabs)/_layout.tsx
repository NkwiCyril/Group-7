import React from "react";
import { StatusBar } from "react-native"; // Import StatusBar from react-native

import CustomHeader from "@/components/CustomHeader";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";

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
            backgroundColor: "transparent",
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
            title: "home",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
            header: () => <CustomHeader />,
            headerTransparent: true,
          }}
        />
        <Tabs.Screen
          name="prepare"
          options={{
            title: "prepare",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="line-chart" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="recover"
          options={{
            title: "recover",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="exchange" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: "map",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="bitcoin" size={size} color={color} />
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

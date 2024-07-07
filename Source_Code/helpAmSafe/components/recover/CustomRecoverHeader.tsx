import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const Banner = () => {
  return (
    <View style={styles.banner}>
      <Text style={styles.title}>Disaster Recovery Tools</Text>
    </View>
  );
};

const CustomHomeHeader = () => {
  //Destructure top to avoid the safeAread
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => {
            console.log("Clicked!!");
          }}
        >
          <Ionicons name="menu" size={25} />
        </TouchableOpacity>

        <View style={styles.notMenu}>
          {/* <Link href={"(authenticated)/(modal)/options"}>
            <Ionicons name="options-outline" size={25} color={Colors.dark} />
          </Link> */}
          <Link href={"(authenticated)/(modal)/notification"}>
            <Ionicons
              name="notifications-outline"
              size={25}
              color={Colors.dark}
            />
          </Link>
          <TouchableOpacity style={styles.lang} onPress={() =>{}}>
            <Ionicons name="globe-outline" size={25} color={Colors.dark} />
            <Text>EN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Banner></Banner>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // height: 60,
    backgroundColor: Colors.white,
    padding: 20,
    // borderWidth: 1,
  },

  menu: {
    justifyContent: "space-between",
  },

  notMenu: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  lang: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  circle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },

  banner: {
    backgroundColor: Colors.purple,
    padding: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default CustomHomeHeader;

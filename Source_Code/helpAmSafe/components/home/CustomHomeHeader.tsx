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
import DropDownPicker from "react-native-dropdown-picker";

const Banner = () => {
  const openLocationSettings = () => {
    Linking.openURL("app-settings:").catch(() => {
      Alert.alert("Unable to open settings");
    });
  };

  return (
    <View style={styles.banner}>
      <Text style={styles.title}>Welcome!</Text>
      <TouchableOpacity
        style={styles.myLocation}
        onPress={openLocationSettings}
      >
        <Ionicons
          name="location-outline"
          size={20}
          color={Colors.white}
        ></Ionicons>
        <Text style={styles.subtitle}>Add your location</Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomHomeHeader = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "EN", value: "en" },
    { label: "FR", value: "fr" },
    // Add more languages as needed
  ]);
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
          <Link href={"/(authenticated)/(pages)/Sidebar"}>
            <Ionicons name="menu" size={25} />
          </Link>
        </TouchableOpacity>

        <View style={styles.notMenu}>
          {/* <Link href={"(authenticated)/(modal)/option"}>
            <Ionicons name="options-outline" size={25} color={Colors.dark} />
          </Link> */}
          <Link href={"(authenticated)/(modal)/notification"}>
            <Ionicons
              name="notifications-outline"
              size={25}
              color={Colors.dark}
            />
          </Link>
          <TouchableOpacity style={styles.lang} onPress={() => {}}>
            {/* <Ionicons name="globe-outline" size={25} color={Colors.dark} /> */}
            <View style={styles.lang}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                placeholder="EN"
                onChangeValue={(value) =>
                  console.log("Selected language:", value)
                }
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Banner></Banner>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    width: 80,
    marginLeft: 5,
  },
  dropdown: {
    backgroundColor: Colors.lightGray,
    borderColor: Colors.dark,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // height: 60,
    backgroundColor: Colors.white,
    padding: 10,
    paddingHorizontal: 15,
    // borderWidth: 1,
  },

  menu: {
    justifyContent: "space-between",
  },

  notMenu: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
    padding: 5,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: -1
  },
  title: {
    color: Colors.white,
    fontSize: 16,
  },
  myLocation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 30,
    gap: 5,
  },

  subtitle: {
    color: Colors.white,
    fontSize: 14,
  },

  // searchSection: {
  //   flex: 1,
  //   flexDirection: "row",
  //   backgroundColor: Colors.lightGray,
  //   borderRadius: 30,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // searchIcon: {
  //   padding: 10,
  // },
  // input: {
  //   flex: 1,
  //   paddingRight: 10,
  //   paddingBottom: 5,
  //   paddingTop: 5,
  //   paddingLeft: 0,
  //   color: Colors.dark,
  // },
});
export default CustomHomeHeader;

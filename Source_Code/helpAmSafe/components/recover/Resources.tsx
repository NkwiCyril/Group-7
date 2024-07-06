import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "react-native-vector-icons/Icon";
import { Link } from "expo-router";

interface App {
  id: string;
  name: string;
  description: string;
  details: string;
  image: ImageSourcePropType;
  link: string;
}

const apps: App[] = [
  {
    id: "1",
    name: "Buyam",
    description: "eCommerce for Essential Supplies",
    details:
      "Buyam helps you quickly find and purchase essential supplies like food, water, and medical items during and after a disaster, ensuring you can gather necessary resources for recovery.",
    image: require("../../../helpAmSafe/assets/images/Buyam.png"),
    link: "https://buyam.co/hq/en/download",
  },
  {
    id: "2",
    name: "Nkwa",
    description: "Money Saving and Financial Management",
    details:
      "Nkwa aids in managing and saving money effectively, offering tools for budgeting and finding discounts, which is crucial for efficient resource allocation during disaster recovery.",
    image: require("../../../helpAmSafe/assets/images/nkwa.png"),
    link: "https://play.google.com/store/apps/details?id=com.maealth.oyesavings&hl=en",
  },
  {
    id: "3",
    name: "Digital Renter",
    description: "Real Estate and House Renting.",
    details:
      "Digital Rental helps you find temporary or permanent housing post-disaster, providing listings of rental properties and information on emergency housing programs.",
    image: require("../../../helpAmSafe/assets/images/DR.png"),
    link: "https://digitalrenter.com/",
  },
  {
    id: "4",
    name: "Waspito",
    description: "eHealth Platform for Medical Assistance",
    details:
      "Waspito offers access to healthcare services, telehealth consultations, and medical advice, ensuring you maintain your health and well-being during and after a disaster.",
    image: require("../../../helpAmSafe/assets/images/waspito.png"),
    link: "https://www.waspito.com/",
  },
];

const ResourcefulApps: React.FC = () => {
  const renderItem = ({ item }: { item: App }) => (
    <View style={styles.itemContainer}>
      <View style={styles.appNameContainer}>
        <Text style={styles.appName}>{item.name}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <Text style={styles.appDescription}>{item.description}</Text>
      <Text style={styles.appDetails}>{item.details}</Text>
      <Link href={item.link}>
        <View style={styles.learnMoreButton}>
          <Text style={styles.learnMoreText}>Learn more</Text>
          <Ionicons name="open-outline" size={24} color={Colors.white} />
        </View>
      </Link>
      {/* <TouchableOpacity style={styles.learnMoreButton} >

      </TouchableOpacity> */}
    </View>
  );

  return (
    <View>
      <FlatList
        data={apps}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  itemContainer: {
    marginBottom: 30,
    backgroundColor: Colors.white,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  appNameContainer: {
    borderWidth: 1,
    borderColor: Colors.purple,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginLeft: 5, 
    alignSelf: 'flex-start',

  },
  appName: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.purple,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    paddingTop: 10,
  },
  appDescription: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  appDetails: {
    fontSize: 16,
    color: Colors.dark,
    marginVertical: 10,
  },
  learnMoreButton: {
    backgroundColor: Colors.purple,
    padding: 5,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    flexDirection: "row",
    marginTop: 15,
    gap: 10
  },
  learnMoreText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ResourcefulApps;

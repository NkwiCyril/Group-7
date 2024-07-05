import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import BottomSheet from "@/components/home/BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface Location {
  area: string;
  city: string;
}

interface Report {
  reportTime: string;
  date: string;
  description: string;
  location: Location;
  imageUrl: ImageSourcePropType;
}

const reports: Report[] = [
  {
    reportTime: "1:00pm",
    date: "Today",
    description: "House on fire",
    location: {
      area: "Molyko",
      city: "Buea",
    },
    imageUrl: require("../../../assets/images/unsplash_9Jgn8hSYUFc_fire.png"),
  },
  {
    reportTime: "2:30pm",
    date: "Yesterday",
    description: "Flood",
    location: {
      area: "Bonapriso",
      city: "Douala",
    },
    imageUrl: require("../../../assets/images/unsplash_qVULJ6acwe8_flood.png"),
  },
  {
    reportTime: "10:15am",
    date: "Today",
    description: "Volcanic Activity",
    location: {
      area: "Fako",
      city: "Buea",
    },
    imageUrl: require("../../../assets/images/unsplash_igcgouMC318_volcano.png"),
  },
];

interface ReportCardProps {
  report: Report;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  return (
    <View style={styles.card}>
      <View style={styles.section}>
        <Image source={report.imageUrl} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.reportTime}>
            {report.date}, {report.reportTime}
          </Text>
          <Text style={styles.date}></Text>
        </View>
        <View style={styles.readMore}>
          <Text style={styles.description}>{report.description}</Text>
          <View style={styles.location_icon}>
            <Ionicons name="location" size={15} />

            <Text style={styles.location}>
              {report.location.area}, {report.location.city}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.readMore}>
          <Text style={styles.details}>Details and Steps to take</Text>
          <Ionicons name="arrow-forward" size={20} color={Colors.purple} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Home: React.FC = () => {
    // create a reference to the bottom sheet modal
    const bottomeSheetRef = useRef<BottomSheetModal>(null);

    const openModal = () => {
      // present the bottom sheet modal
      bottomeSheetRef.current?.present();    
    }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BottomSheet ref={bottomeSheetRef} />
      <FlatList
        data={reports}
        renderItem={({ item }) => <ReportCard report={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.container}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={
          openModal
        }
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 70,
    backgroundColor: Colors.purple,
    padding: 15,
    borderRadius: 100,
  },
  container: {
    paddingVertical: 120,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 20,
    marginBottom: 15,
    elevation: 3,
  },
  section: {
    borderBottomColor: Colors.lightPurple,
    borderBottomWidth: 1,
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 5,
  },
  reportTime: {
    color: "white",
    fontWeight: "bold",
  },
  date: {
    color: "white",
    textAlign: "right",
  },
  description: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 5,
  },
  location_icon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  location: {
    fontSize: 15,
  },

  readMore: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  details: {
    color: Colors.purple,
    fontSize: 16,
  },
});

export default Home;

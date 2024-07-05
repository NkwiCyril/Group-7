import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ReportCard from "@/components/home/ReportCard";
import { ScrollView } from "react-native-gesture-handler";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ReportCard />
        <Text>Let us work on this section now</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    top: 110,
    height: '100%',
    backgroundColor: "#fff",
  },
});

export default Home;

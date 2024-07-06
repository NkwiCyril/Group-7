import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

type Emergency = {
  id: number;
  name: string;
  icon: string;
};

const Prepare = () => {
  const router = useRouter();

  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null);

  const emergencies : Emergency[] = [
    { id: 1, name: 'Floods', icon: 'water' },
    { id: 2, name: 'Fires', icon: 'fire' },
    { id: 3, name: 'Earthquakes', icon: 'wave-square' },
    { id: 4, name: 'Landslides', icon: 'house-damage' },
    { id: 5, name: 'Tornado', icon: 'wind' },
    { id: 6, name: 'Volcanic Eruption', icon: 'mountain' },
  ];

  const handleEmergencySelect = (emergency : Emergency) => {
    setSelectedEmergency(emergency.name);
    router.push({
      pathname: '../(pages)/prepare/disasterGuide',
      params: { emergencyName: emergency.name, emergencyId: emergency.id },
    });
  };

  const handleToolKitSelect = () => {
    router.push({
      pathname: '../(pages)/prepare/toolKitList',
      // params: { emergencyName: emergency.name, emergencyId: emergency.id },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.sectionHeader}>Safety Tips</Text>
      <View style={styles.grid}>
        {emergencies.map((emergency) => (
          <TouchableOpacity
            key={emergency.id}
            style={[
              styles.gridItemWrapper,
              selectedEmergency === emergency.name && styles.selectedGridItemWrapper,
            ]}
            onPress={() => handleEmergencySelect(emergency)}
          >
            <View style={styles.gridItem}>
              <View style={styles.iconBackground}>
                <FontAwesome5 name={emergency.icon} size={40} color="#fff" />
              </View>
            </View>
            <Text style={styles.gridItemText}>{emergency.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.showAllText}>Show all resources</Text>
      <View style={styles.moreSection}>
        <Text style={styles.sectionHeader}>More</Text>
        <TouchableOpacity style={styles.itemContainer} onPress={handleToolKitSelect}>
          <View style={styles.iconCircle}>
            <MaterialIcon name="toolbox" size={28} color="#800080" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>ToolKit</Text>
            <Text style={styles.subtitle}>Essential tools needed for emergency escape</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer} onPress={() => console.log('First Aid pressed')}>
          <View style={styles.iconCircle}>
            <FontAwesome5 name="first-aid" size={20} color="#800080" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>First Aid</Text>
            <Text style={styles.subtitle}>Learn how to administer first aid in trouble</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    paddingLeft: 3,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  gridItemWrapper: {
    width: '30%',
    alignItems: 'center',
    marginVertical: 10,
  },
  gridItem: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedGridItemWrapper: {
    backgroundColor: '#fff',
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 30, 
    // backgroundColor: '#00C0C0', 
    backgroundColor: '#800080', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItemText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
  },
  showAllText: {
    color: '#800080',
    textAlign: 'center',
    marginVertical: 10,
  },
  moreSection: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#800080',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Prepare;

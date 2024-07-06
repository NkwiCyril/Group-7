import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const images = {
  rain_drops_1: require('../../../../assets/images/rain_drops_1.jpg'),
  rain_drops_4: require('../../../../assets/images/rain_drops_4.jpg'),
  rain_drops_5: require('../../../../assets/images/rain_drops_5.jpg'),
  fire_1: require('../../../../assets/images/fire_1.jpg'),
  fire_5: require('../../../../assets/images/fire_5.jpg'),
  earthquake_1: require('../../../../assets/images/earthquake_1.jpg'),
  earthquake_3: require('../../../../assets/images/earthquake_3.jpg'),
  landslide_3 : require('../../../../assets/images/landslide_3.jpg'),
  landslide_4 : require('../../../../assets/images/landslide_4.jpg'),
  tornado_1 : require('../../../../assets/images/tornado_1.jpg'),
  tornado_5 : require('../../../../assets/images/tornado_5.jpg'),
  volcanic_eruption_1 : require('../../../../assets/images/volcanic_eruption_1.jpg'),
  volcanic_eruption_4 : require('../../../../assets/images/volcanic_eruption_4.jpg'),
  volcanic_eruption_5 : require('../../../../assets/images/volcanic_eruption_5.jpg'),


};


type Step = {
  text: string;
  image: keyof typeof images;
};

type EmergencyData = {
  id: number;
  name: string;
  introduction: string;
  beforeFlood: string;
  steps: Step[];
};

const FloodGuide = () => {
  const router = useRouter();
  const { emergencyId } = useLocalSearchParams();
  const [emergencyData, setEmergencyData] = useState<EmergencyData | null>(null);

  useEffect(() => {
    const loadEmergencyData = async () => {
      let data: EmergencyData | null = null;
      switch (emergencyId) {
        case '1':
          data = require('./jsons/floods.json');
          break;
        case '2':
          data = require('./jsons/fires.json');
          break;
        case '3':
          data = require('./jsons/earthQuakes.json');
          break;
        case '4':
          data = require('./jsons/landSlides.json');
          break;
        case '5':
          data = require('./jsons/tornado.json');
          break;
        case '6':
          data = require('./jsons/volcanicEruption.json');
          break;
        default:
          data = null;
      }
      setEmergencyData(data);
    };

    loadEmergencyData();
  }, [emergencyId]);

  if (!emergencyData) {
    return <Text>Loading...</Text>;
  }

  const handleFinsihedReading = () => {
   router.back();
    
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* <Text style={styles.header}>{emergencyData.name}</Text> */}
      <Text style={styles.subHeader}>Introduction</Text>
      <Text style={styles.paragraph}>{emergencyData.introduction}</Text>
      <Text style={styles.subHeader}>Things to do before a {emergencyData.name.toLowerCase()}</Text>
      <Text style={styles.paragraph}>{emergencyData.beforeFlood}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View kit list here</Text>
      </TouchableOpacity>
      <Text style={styles.subHeader}>Things to do during a {emergencyData.name.toLowerCase()}</Text>
      {emergencyData.steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View style={styles.paragraphContainer}>
            <Text style={styles.number}>{index + 1}. </Text>
            <Text style={styles.paragraph}>{step.text}</Text>
          </View>
          {
            step.image && (
              <Image
                source={images[step.image]}
                style={styles.image}
                resizeMode="contain"
              />
            )
          }
        </View>
      ))}
      <TouchableOpacity 
        style={styles.button} 
       onPress={handleFinsihedReading}
      >
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
  },
  paragraphContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    flex: 1,
    paddingHorizontal: 10,
  },
  stepContainer: {
    marginBottom: 20,
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#800080',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
    width: '90%',
    marginHorizontal: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default FloodGuide;

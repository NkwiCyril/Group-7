// HazardPrediction.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HazardPredictionProps {
  type: string;
  location: string;
  reported: string;
  updated: string;
}

const HazardPrediction: React.FC<HazardPredictionProps> = ({ type, location, reported, updated }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.type}>{type}</Text>
      <Text style={styles.location}>Location: {location}</Text>
      <Text style={styles.reported}>Reported: {reported}</Text>
      <Text style={styles.updated}>Updated: {updated}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e0f7fa',
    borderRadius: 5,
  },
  type: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  location: {
    fontSize: 14,
  },
  reported: {
    fontSize: 12,
    color: 'gray',
  },
  updated: {
    fontSize: 12,
    color: 'gray',
  },
});

export default HazardPrediction;

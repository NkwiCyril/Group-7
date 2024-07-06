import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import PlacesInput from 'react-native-places-input';
import { GOOGLE_API_KEY, OPENWEATHERMAP_API_KEY } from '@env';
import HazardPrediction from '@/components/home/HazardPrediction';
import moment from 'moment';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface WeatherData {
  weather: { description: string }[];
  main: { temp: number };
}

const MapViewWithWeather: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [hazards, setHazards] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      getWeather(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const getWeather = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHERMAP_API_KEY}`);
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (data: any) => {
    const { geometry } = data;
    const { lat, lng } = geometry.location;
    setLocation({
      coords: { latitude: lat, longitude: lng } as Location.LocationObjectCoords,
      timestamp: Date.now()
    });
    getWeather(lat, lng);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={location ? {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } : undefined}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Selected location"
          />
        )}
      </MapView>
      <View style={styles.searchContainer}>
        <PlacesInput
          googleApiKey={GOOGLE_API_KEY}
          placeHolder="Search for locations"
          onSelect={handleSearch}
        />
      </View>
      <View style={styles.predictionsContainer}>
        <Text style={styles.heading}>Hazards</Text>
        <FlatList
          data={hazards}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <HazardPrediction
              type={item.type}
              location={item.location}
              reported={item.reported}
              updated={item.updated}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '80%',
  },
  searchContainer: {
    padding: 10,
  },
  predictionsContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default MapViewWithWeather;

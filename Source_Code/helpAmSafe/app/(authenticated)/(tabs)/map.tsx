import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapViewWithWeather from '../(modal)/location-search'

const Map = () => {
  return (
    <SafeAreaView>
      <MapViewWithWeather>

      </MapViewWithWeather>
    </SafeAreaView>
  )
}

export default Map
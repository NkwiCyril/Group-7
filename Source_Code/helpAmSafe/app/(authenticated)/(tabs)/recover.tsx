import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ResourcefulApps from '@/components/recover/Resources'
import Colors from '@/constants/Colors'

const Recover = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ResourcefulApps></ResourcefulApps>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    top: 100,
    paddingBottom: 200,
  },

})

export default Recover
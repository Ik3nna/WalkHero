import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Feed = () => {
  AsyncStorage.clear();
  return (
    <View>
      <StatusBar style='light' />
      
    </View>
  )
}

export default Feed

const styles = StyleSheet.create({})
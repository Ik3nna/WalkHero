import { StyleSheet, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { getFontSize } from '../../utils/getFontSize'
import { NavigationProps } from '../../types'
import { HOME, LOGIN } from '../../constants/routeName'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { decode as base64Decode } from 'base-64'

const Loading = ({ navigation }: NavigationProps) => {
  const checkAuthenticationStatus = async ()=> {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
    
      if (userToken) {
        const decodedToken = JSON.parse(base64Decode(userToken.split('.')[1]));
        const currentTime = Date.now() / 1000;

        if (currentTime < decodedToken.exp) {
          navigation.navigate(HOME);
        } else {
          navigation.navigate(LOGIN);
        } 
      } else {
        navigation.navigate(LOGIN);
      }
    } catch (error) {
      console.log("err", error);
    }
  }

  useEffect(()=>{
    setTimeout(()=>{
      checkAuthenticationStatus();
    }, 1000)
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />
      <Text style={styles.text}>Loading</Text>
    </SafeAreaView>
  )
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    columnGap: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontFamily: "curlyBold",
    fontSize: getFontSize(0.1),
  }
})
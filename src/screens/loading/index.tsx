import { StyleSheet, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { getFontSize } from '../../utils/getFontSize'
import { NavigationProps } from '../../types'
import { HOME, LOGIN } from '../../constants/routeName'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'

const Loading = ({ navigation }: NavigationProps) => {
  const checkAuthenticationStatus = async ()=> {
    onAuthStateChanged(auth, async (user)=> {
      if (user) {
        navigation.navigate(HOME);
      } else {
        navigation.navigate(LOGIN);
      }
    })
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
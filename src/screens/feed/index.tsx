import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Button from '../../components/button';
import colors from '../../assets/themes/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ACTIVITY } from '../../constants/routeName';

const { width, height } = Dimensions.get("window");

const Feed = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      
      <Button 
        title='Start walk'
        bgColor={colors.purple}
        color={colors.white}
        style={styles.btn}
        width={width - (0.08 * width)}
        onPress={()=>navigation.push(ACTIVITY)}
      />
    </View>
  )
}

export default Feed

const styles = StyleSheet.create({
  container: {
    height: height,
    marginHorizontal: "4%"
  },
  btn: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? height - (0.77 * height) : height - (0.8 * height),
  }
})
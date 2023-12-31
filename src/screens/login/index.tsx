import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getFontSize } from '../../utils/getFontSize'
import Input from '../../components/input'
import colors from '../../assets/themes/colors'
import { useForm, Controller } from "react-hook-form";
import { FormDataProps, NavigationProps } from '../../types'
import Button from '../../components/button'
import { HOME, SIGNUP } from '../../constants/routeName'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width, height } = Dimensions.get("window");

const Login = ({ navigation }: NavigationProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormDataProps>({
    defaultValues: {
      email: "",
      password: ""
    },
  })
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormDataProps)=> {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const userToken = await userCredential.user.getIdToken();
      AsyncStorage.setItem("userToken", userToken);
      navigation.navigate(HOME);
    } catch (error: any) {
      Alert.alert("Error", "Invalid Login Credentials. Try again")
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Walk Hero</Text>

      <View style={styles.form_container}>
        <Controller
          control={control}
          rules={{
            required: "This field is required",
            pattern: {
              value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
              message: "Please enter a valid email address"
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              placeholder='Email'
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{
            required: "This field is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*([a-zA-Z\d])\1{2}).{8,}$/,
              message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long."
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              placeholder="Password"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              secureTextEntry
              error={errors.password?.message}
              errorWidth={width - (0.2 * width)}
            />
          )}
          name="password"
        />
      </View>

      <View style={styles.btn_container}>
        <Button 
          title='Login'
          bgColor={colors.purple}
          color={colors.white}
          loading={isLoading}
          width={width - (width * 0.2)}
          onPress={handleSubmit(onSubmit)}
        />

        <Button 
          title='Sign Up'
          bgColor="transparent"
          color={colors.black}
          width={width - (width * 0.2)}
          onPress={()=>navigation.navigate(SIGNUP)}
        />
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
    position: "relative",
    height: height
  },
  title: {
    fontFamily: "curlyBold",
    fontSize: getFontSize(0.07),
    color: colors.black,
  },
  form_container: {
    paddingVertical: "5%",
    flexDirection: "column",
    rowGap: 20,
    flex: 1,
  },
  btn_container: {
    position: "absolute",
    bottom: "10%"
  }
})
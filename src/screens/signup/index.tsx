import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getFontSize } from '../../utils/getFontSize'
import Input from '../../components/input'
import colors from '../../assets/themes/colors'
import { useForm, Controller } from "react-hook-form";
import { FormDataProps, NavigationProps } from '../../types'
import Button from '../../components/button'
import { LOGIN, SIGNUP } from '../../constants/routeName'

const { width, height } = Dimensions.get("window");

const Login = ({ navigation }: NavigationProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Register</Text>

      <View style={styles.form_container}>
        <Controller
            control={control}
            rules={{
              required: "This field is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              placeholder="Name"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.name?.message}
            />
          )}
            name="name"
          />

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
              message: "Password must be at least 8 characters and include uppercase, lowercase, and a number"
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
          title='Sign Up'
          bgColor={colors.purple}
          color={colors.white}
          loading={isLoading}
          width={width - (width * 0.2)}
        />

        <Button 
          title='Go Back'
          bgColor="transparent"
          color={colors.black}
          width={width - (width * 0.2)}
          onPress={()=>navigation.navigate(LOGIN)}
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
    flex: 1
  },
  btn_container: {
    position: "absolute",
    bottom: "10%"
  }
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getFontSize } from '../../utils/getFontSize'
import Input from '../../components/input'
import colors from '../../assets/themes/colors'
import { useForm, Controller } from "react-hook-form";
import { FormDataProps } from '../../types'

const Login = () => {
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
            />
          )}
          name="password"
        />
      </View>

      <View>

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
    position: "relative"
  },
  title: {
    fontFamily: "curlyBold",
    fontSize: getFontSize(0.07),
    color: colors.black,
  },
  form_container: {
    paddingVertical: "5%",
    flexDirection: "column",
    rowGap: 20
  }
})
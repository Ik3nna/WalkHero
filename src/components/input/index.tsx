import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { InputProps } from '../../types'
import colors from '../../assets/themes/colors'
import { getFontSize } from '../../utils/getFontSize';

const { width } = Dimensions.get("window");

const Input = ({ placeholder, value, onChange, onBlur, error, ...props }: InputProps) => {
  return (
    <View>
      <TextInput 
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.grey}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    input: {
        borderBottomColor: colors.black,
        width: width - (width * 0.2),
        borderBottomWidth: 2,
        paddingVertical: "3%", 
        fontFamily: "normal",
        fontSize: getFontSize(0.03),
        color: colors.grey
    },
    error: {
        fontFamily: "normal",
        color: colors.danger,
        paddingBottom: 2,
        fontSize: getFontSize(0.015)
    }
})
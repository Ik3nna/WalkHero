import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ButtonProps } from '../../types'
import { getFontSize } from '../../utils/getFontSize';
import colors from '../../assets/themes/colors';

const Button = ({ title, bgColor, color, loading, width, style, onPress, ...props }: ButtonProps) => {
  const getBorderColor = () => {
    if (loading) {
      return colors.grey
    } else {
      return bgColor
    }
  }

  return (
    <TouchableOpacity onPress={onPress} {...props} disabled={loading || props.disabled} style={[styles.container, style, { backgroundColor: getBorderColor(), width: width }]}>
      {loading && <ActivityIndicator style={styles.loading} />}
      <Text style={[styles.text, { color: color }]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    container: {
        padding: "4%",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    loading: {
        color: colors.white,
        paddingRight: 7,
    },
    text: {
        fontFamily: "normal",
        fontSize: getFontSize(0.026)
    }
})
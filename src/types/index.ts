import { NavigationProp, ParamListBase } from '@react-navigation/native'


// Navigation type
export type NavigationProps = {
    navigation: NavigationProp<ParamListBase>
}

// Form data type
export type FormDataProps = {
    name?: string,
    email: string,
    password: string
}

// Text Input type
export type InputProps = {
    placeholder: string,
    value: string | undefined,
    error: string | undefined,
    errorWidth?: number
    onChange: ()=> void,
    onBlur: ()=> void,
    [props: string]: any
}

// Button type
export type ButtonProps = {
    title: string,
    bgColor: string,
    color: string,
    loading?: boolean,
    style?: any,
    width: number,
    onPress?: ()=> void
}
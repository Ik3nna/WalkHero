import { NavigationProp, ParamListBase } from '@react-navigation/native'


// Navigation type
export type NavigationProps = {
    navigation: NavigationProp<ParamListBase>
}

// Form data props 
export type FormDataProps = {
    name?: string,
    email: string,
    password: string
}

// Text Input props
export type InputProps = {
    placeholder: string,
    value: string,
    error: string | undefined,
    onChange: ()=> void,
    onBlur: ()=> void,
    [props: string]: any
}
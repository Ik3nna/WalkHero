import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ACTIVITY, FEEDSCREEN } from '../../constants/routeName';
import Feed from '../../screens/feed';
import Activity from '../../screens/activity';
import { StyleSheet } from 'react-native';
import { getFontSize } from '../../utils/getFontSize';
import colors from '../../assets/themes/colors';

const Stack = createNativeStackNavigator();


export const FeedNavigator = ()=> {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name={FEEDSCREEN} 
                component={Feed} 
                options={{  headerStyle: style.headerStyle,
                    headerBackVisible: false,
                    headerTitle: "Feed",
                    headerTitleStyle: style.headerTitleStyle,
                    headerTitleAlign: "center"
                }} 
            /> 
            <Stack.Screen name={ACTIVITY} component={Activity} options={{ headerShown: false}} />
        </Stack.Navigator>
    )
}

const style = StyleSheet.create({
    headerStyle: {
        backgroundColor: colors.purple,
    },
    headerTitleStyle: {
        color: colors.white, 
        fontFamily: "normal", 
        fontSize: getFontSize(0.028),
    }
})
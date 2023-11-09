import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LOADING, LOGIN, HOME, FEED, LEADERBOARD, SIGNUP } from '../../constants/routeName';
import Loading from '../../screens/loading';
import Login from '../../screens/login';
import Feed from '../../screens/feed';
import LeaderBoard from '../../screens/leaderboard';
import colors from '../../assets/themes/colors';
import Signup from '../../screens/signup';
import { getFontSize } from '../../utils/getFontSize';
import { StyleSheet, View } from 'react-native';
import Icon from '../../components/icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs () {
    return(
        <Tab.Navigator
            screenOptions={
                ({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    let type;
                    if (route.name === FEED) {
                        iconName = "analytics-outline";
                        type = "ionicons";
                        size = focused ? 30 : 25;
                    } else  {
                        iconName = "newspaper-outline";
                        type = "ionicons";
                        size = focused ? 30 : 25;
                    } 
                    return(
                        <View>
                            <Icon type={type} name={iconName} size={size} color={color} />
                        </View>
                    )
                },
                tabBarLabelStyle: style.tabBarLabelStyle,
                tabBarActiveTintColor: colors.purple,
                tabBarInactiveTintColor: colors.grey,
                headerShown: false
                })
            }
        >
            <Tab.Screen name={FEED} component={Feed} options={{ headerShown: false }} />
            <Tab.Screen name={LEADERBOARD} component={LeaderBoard} />
        </Tab.Navigator>
    )
}

export const MainNavigator = ()=> {
    return(
        <Stack.Navigator>
            <Stack.Screen name={LOADING} component={Loading} options={{ headerShown: false}} />
            <Stack.Screen name={LOGIN} component={Login} options={{ headerShown: false}} />
            <Stack.Screen name={SIGNUP} component={Signup} options={{ headerShown: false}} />
            <Stack.Screen 
                name={HOME} 
                component={BottomTabs} 
                options={{ 
                    headerStyle: style.headerStyle,
                    headerBackVisible: false,
                    headerTitle: "Feed",
                    headerTitleStyle: style.headerTitleStyle
                }} 
            />
        </Stack.Navigator>
    )
}

const style = StyleSheet.create({
    tabBarLabelStyle: {
        fontSize: getFontSize(0.02), 
        fontFamily: "normal" 
    },
    headerStyle: {
        backgroundColor: colors.purple
    },
    headerTitleStyle: {
        color: colors.white, 
        fontFamily: "normal", 
        fontSize: getFontSize(0.025)
    }
})
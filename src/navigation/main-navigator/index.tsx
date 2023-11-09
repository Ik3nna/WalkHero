import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LOADING, LOGIN, HOME, FEED, LEADERBOARD, SIGNUP } from '../../constants/routeName';
import Loading from '../../screens/loading';
import Login from '../../screens/login';
import Feed from '../../screens/feed';
import LeaderBoard from '../../screens/leaderboard';
import colors from '../../assets/themes/colors';
import Signup from '../../screens/signup';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs () {
    return(
        <Tab.Navigator>
            <Tab.Screen name={FEED} component={Feed} />
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
                    headerStyle: { backgroundColor: colors.purple },
                    headerBackVisible: false
                }} 
            />
        </Stack.Navigator>
    )
}

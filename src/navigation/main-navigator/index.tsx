import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LOADING, LOGIN, HOME, FEED, LEADERBOARD } from '../../constants/routeName';
import Loading from '../../screens/loading';
import Login from '../../screens/login';
import Feed from '../../screens/feed';
import LeaderBoard from '../../screens/leaderboard';

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
            <Stack.Screen name={LOADING} component={Loading} />
            <Stack.Screen name={LOGIN} component={Login} />
            <Stack.Screen name={HOME} component={BottomTabs} />
        </Stack.Navigator>
    )
}

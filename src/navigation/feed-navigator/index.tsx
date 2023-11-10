import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ACTIVITY, FEEDSCREEN } from '../../constants/routeName';
import Feed from '../../screens/feed';
import Activity from '../../screens/activity';

const Stack = createNativeStackNavigator();


export const FeedNavigator = ()=> {
    return(
        <Stack.Navigator>
            <Stack.Screen name={FEEDSCREEN} component={Feed} options={{ headerShown: false}} />
            <Stack.Screen name={ACTIVITY} component={Activity} options={{ headerShown: false}} />
        </Stack.Navigator>
    )
}

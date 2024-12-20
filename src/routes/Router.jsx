import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/Home/HomeScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import SplashScreen from "../screens/Splash/SplashScreen";
import DetailsScreen from "../screens/Details/DetailsScreen";

export default function Router() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    )
}
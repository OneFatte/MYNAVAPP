import { useEffect } from "react";
import { View, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({ navigation }) {

    useEffect(() => {
        const checkSession = async () => {
            const sessionData = await AsyncStorage.getItem("userSession");
            if (sessionData) {
                navigation.replace("Home", { data: JSON.parse(sessionData) });
            } else {
                navigation.replace("Login");
            }
        };
        setTimeout(checkSession, 2000);
    }, [navigation]);

    const styles = ScaledSheet.create({
        container: {
            flex: 1,
        },
        image: {
            width: "100%",
            height: "100%",
        },
    });

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/img/wallMarvel.jpg")}
                style={styles.image}
                resizeMode="cover"
            />
        </View>
    );
}

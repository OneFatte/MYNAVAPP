import { useEffect, useState } from "react";
import { colors, globalStyles } from "../../assets/styles/styles";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";

import MainButton from "../../components/buttons/MainButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MOCK_USER = {
    user: "camilo@mail.com",
    password: "pass12345678",
    fullName: "Camilo Giraldo",
};

export default function LoginScreen({ navigation }) {
    const [userSend, setUserSend] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordSend, setPasswordSend] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setUserSend('');
        setPasswordSend('');
        setErrorMessage('');
    }, []);

    const handleLogin = async () => {
        if (userSend === MOCK_USER.user && passwordSend === MOCK_USER.password) {
            const sessionData = JSON.stringify(MOCK_USER);
            await AsyncStorage.setItem("userSession", sessionData);
            navigation.replace('Home', { data: MOCK_USER });
        } else {
            setErrorMessage('Correo o contraseña incorrectos');
        }
    };

    const loginStyles = ScaledSheet.create({
        LoginContainer: {
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: verticalScale(350),
            backgroundColor: colors.tertiaryBlack,
        },
        circleBack1: {
            top: -125,
            right: -80,
            width: 250,
            zIndex: -1,
            height: 250,
            borderRadius: 300,
            position: 'absolute',
            backgroundColor: colors.grayLightCircles,
        },
        circleBack2: {
            left: -150,
            width: 500,
            height: 500,
            bottom: -250,
            borderRadius: 500,
            position: 'absolute',
            backgroundColor: colors.grayLightCircles,
            zIndex: -1
        },
        imageMarvel:{
            width: 200, 
            height: 200,
        },
        text:{
            padding: 20,
            fontSize: 26, 
            color: 'white', 
        },
        passwordContainer: {
            width: '80%', 
            borderRadius: 10, 
            marginBottom: 20,
            alignItems: 'center', 
            flexDirection: 'row', 
            justifyContent: 'center', 
            backgroundColor: 'white', 
        },
    })

    return (
        <View style={loginStyles.LoginContainer}>

            <Image source={require('../../assets/img/marvel.png')} style={loginStyles.imageMarvel} />
            <Text style={[globalStyles.text, loginStyles.text]}>Ingrese a su cuenta</Text>

            <TextInput
                style={[globalStyles.input, globalStyles.text]}
                placeholder="Usuario"
                placeholderTextColor="#8E949A"
                value={userSend}
                onChangeText={text => {
                    setUserSend(text)
                    setErrorMessage('')
                }}
            />

            <View style={loginStyles.passwordContainer}>
                <TextInput
                    style={[globalStyles.input, globalStyles.text, { marginBottom: 0, width: '75%' }]}
                    placeholder='Contraseña'
                    placeholderTextColor="#8E949A"
                    value={passwordSend}
                    onChangeText={(text) => {
                        setPasswordSend(text)
                        setErrorMessage('')

                    }}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity style={{ paddingHorizontal: scale(10), width: '25%' }} onPress={() => setShowPassword(!showPassword)}>
                    <Text style={[globalStyles.text, { color: "#8E949A" }]}>{showPassword ? "Ocultar" : "Mostrar"}</Text>
                </TouchableOpacity>
            </View>

            {errorMessage ? <Text style={{ color: 'red', paddingBottom: 10 }}>{errorMessage}</Text> : null}
            
            <MainButton
                title="Ingresar"
                style={{ marginBottom: 30 }}
                onPress={() => handleLogin()}
            />

            <View style={loginStyles.circleBack1} />
            <View style={loginStyles.circleBack2} />
        </View>
    );
}

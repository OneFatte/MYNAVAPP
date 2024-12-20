import { useEffect, useState } from "react";
import { colors } from "../../assets/styles/styles";
import { useRoute } from "@react-navigation/native";
import { getHeroes } from "../../services/marvelApi";
import { ScaledSheet, verticalScale } from "react-native-size-matters";
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, Image } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
    const route = useRoute();
    const user = route.params.data;

    const [offset, setOffset] = useState(0);
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalHeroes, setTotalHeroes] = useState(0);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        fetchHeroes();

    }, [offset]);

    const fetchHeroes = async () => {
        setIsFetching(true);

        try {
            const { results, total } = await getHeroes(offset, 20);
            const uniqueResults = results.filter(
                (newHero) => !heroes.some((existingHero) => existingHero.id === newHero.id)
            );

            setHeroes(prevHeroes => [...prevHeroes, ...uniqueResults]);
            setTotalHeroes(total);
        } catch (error) {
            console.error("Error fetching heroes:", error);
        }

        setLoading(false);
        setIsFetching(false);
    };

    const loadMoreHeroes = () => {
        if (!isFetching && heroes.length < totalHeroes) {
            setOffset(prevOffset => prevOffset + 20);
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem("userSession");
        navigation.replace("Login");
    };

    if (loading && offset === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.tertiaryBlack }}>
                <ActivityIndicator size="large" color={colors.primaryRed} />
                <Text style={{ color: 'white', marginTop: 10 }}>Cargando héroes...</Text>
            </View>
        );
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={homeStyles.cardContainer}
            onPress={() => navigation.navigate('Details', { hero: item })}
        >
            <Image
                source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }}
                style={homeStyles.cardImage}
            />
            <View style={homeStyles.cardNameContainer}>
                <Text style={homeStyles.cardName} numberOfLines={2}>{item.name}</Text>
                <Text style={{ color: 'white', fontSize: 14 }}>
                    {item.comics.available} cómics
                </Text>
            </View>
        </TouchableOpacity>
    );

    const homeStyles = ScaledSheet.create({
        HomeContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.tertiaryBlack,
        },
        textWelcome: {
            margin: 20,
            fontSize: 24,
            color: 'white',
        },
        listConntainer: {
            flex: 1,
            width: '90%',
        },
        cardContainer: {
            gap: 10,
            width: '90%',
            borderRadius: 10,
            marginVertical: 8,
            alignSelf: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: colors.grayDark,
        },
        cardImage: {
            borderTopLeftRadius: 10,
            width: verticalScale(75),
            height: verticalScale(75),
            borderBottomLeftRadius: 10,
        },
        cardNameContainer: {
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        cardName: {
            fontSize: 18,
            color: 'white',
            flexWrap: 'wrap',
            overflow: 'hidden',
            fontWeight: 'bold',
        },
        cardComics: {
            color: 'white',
            fontSize: 14,
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
            zIndex: -1,
            left: -150,
            width: 500,
            height: 500,
            bottom: -250,
            borderRadius: 500,
            position: 'absolute',
            backgroundColor: colors.grayLightCircles,
        },
        buttonLogout: {
            padding: 10,
            position: 'absolute',
            top: verticalScale(10),
            right: verticalScale(20),
        },
    })

    return (
        <View style={homeStyles.HomeContainer}>
            <Text style={homeStyles.textWelcome}>
                ¡Hola, {user.fullName}!
            </Text>
            <TouchableOpacity style={homeStyles.buttonLogout} onPress={handleLogout}>
                <Image source={require('../../assets/icons/cerrar-sesion.png')} />
            </TouchableOpacity>
            <FlatList
                data={heroes}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                onEndReached={loadMoreHeroes}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => (
                    isFetching ? (
                        <View style={{ alignItems: 'center', marginVertical: 10 }}>
                            <ActivityIndicator size="large" color={colors.primaryRed} />
                        </View>
                    ) : null
                )}
                style={homeStyles.listConntainer}
            />

            <View style={homeStyles.circleBack1} />
            <View style={homeStyles.circleBack2} />
        </View>
    );
}

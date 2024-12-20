import { useEffect, useState } from "react";
import { colors } from "../../assets/styles/styles";
import { getOneHero } from "../../services/marvelApi";
import { ScaledSheet, verticalScale } from "react-native-size-matters";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";

export default function DetailsScreen({ route }) {
    const { hero } = route.params;

    const [offset, setOffset] = useState(0);
    const [comics, setComics] = useState([]);
    const [totalComics, setTotalComics] = useState(0);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        fetchComics();
    }, [offset]);

    const fetchComics = async () => {
        setIsFetching(true);
        try {
            const { results, total } = await getOneHero(hero.id, offset, 20);
            const uniqueResults = results.filter(
                (newComics) => !comics.some((existingComic) => existingComic.id === newComics.id)
            );
            setComics((prevComics) => [...prevComics, ...uniqueResults]);
            setTotalComics(total);
        } catch (error) {
            console.error("Error fetching comics:", error);
        }
        setIsFetching(false);
    };

    const loadMoreComics = () => {
        if (!isFetching && comics.length < totalComics) {
            setOffset((prevOffset) => prevOffset + 20);
        }
    };

    const styles = ScaledSheet.create({
        detailsContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.tertiaryBlack,
        },
        heroImage: {
            width: "100%",
            height: verticalScale(240),
        },
        heroName: {
            fontSize: 24,
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 10,
        },
        heroDescription: {
            fontSize: 16,
            color: "white",
            marginBottom: 20,
            marginHorizontal: 10,
        },
        comicCard: {
            width: "90%",
            borderRadius: 5,
            marginVertical: 8,
            alignSelf: "center",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: colors.grayDark,
        },
        comicImage: {
            width: verticalScale(50),
            height: verticalScale(50),
            borderRadius: 5,
            marginRight: 10,
        },
        comicTitle: {
            flex: 1,
            fontSize: 16,
            color: "white",
        },
    });

    return (
        <View style={styles.detailsContainer}>
            <Image
                source={{ uri: `${hero.thumbnail.path}.${hero.thumbnail.extension}` }}
                style={styles.heroImage}
            />
            <Text style={styles.heroName}>{hero.name}</Text>
            <Text style={styles.heroDescription}>
                {hero.description || "No hay descripción disponible para este héroe."}
            </Text>

            <FlatList
                data={comics}
                keyExtractor={(item) => `${item.id}`}
                style={{ width: "100%" }}
                renderItem={({ item }) => (
                    <View style={styles.comicCard}>
                        <Image
                            source={{
                                uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
                            }}
                            style={styles.comicImage}
                        />
                        <Text style={styles.comicTitle} numberOfLines={2}>
                            {item.title}
                        </Text>
                    </View>
                )}
                onEndReached={loadMoreComics}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() =>
                    isFetching ? (
                        <View style={{ alignItems: 'center', marginVertical: 10 }}>
                            <ActivityIndicator size="large" color={colors.primaryRed} />
                        </View>
                    ) : null
                }
            />
        </View>
    );
}

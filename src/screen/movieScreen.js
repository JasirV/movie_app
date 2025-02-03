import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import COLOR from "../constants/colors";
import { getMovie, getPoster, getVideo } from "../services/movieService";
import ItemSeparator from "../components/itemSeparator";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import { APPEEND_TO_RESPONSE as AR } from "../constants/urls";
import CastCard from "../components/castCard";
import MovieCard from "../components/movieCard";
const { height, width } = Dimensions.get("screen");
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;
const MovieScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState({});
  useEffect(() => {
    const fetching = async () => {
      try {
        const respons = await getMovie(
          movieId,
          `${AR.VIDEOS},${AR.RECOMMENDATIONS},${AR.SIMILAR}`
        );
        setMovie(respons.data);
        const responsforCredis = await getMovie(movieId, `${AR.CREDITS}`);
        // console.log(responsforCredis.data.credits.cast)
        setCast(responsforCredis.data.credits);
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, []);
  return (
    <ScrollView>
      <StatusBar style="auto" />
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "rgba(217,217,217,0)"]}
        start={[0, 0.3]}
        style={style.linearGradient}
      />
      <View style={style.moviePosterImageContainer}>
        <Image
          style={style.moviePosterImage}
          resizeMode="cover"
          source={{ uri: getPoster(movie.backdrop_path) }}
        />
      </View>
      <View style={style.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={35} color={COLOR.WHITE} />
        </TouchableOpacity >
        <TouchableOpacity  activeOpacity={0.3}>
        <Text onPress={()=>Share.share({message:`${movie?.title}\n\n${movie?.homepage}`})} style={style.headerText}>Share</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={style.playButton}
        onPress={() => Linking.openURL(getVideo(movie.videos.results[0].key))}
      >
        <Ionicons name="play-circle-outline" size={70} color={COLOR.WHITE} />
      </TouchableOpacity>
      <ItemSeparator height={setHeight(37)} />
      <View style={style.movieTitleContainer}>
        <Text style={style.movieTitle} numberOfLines={2}>
          {movie?.original_title}
        </Text>
        <View style={style.row}>
          <Ionicons name="heart" size={22} color={COLOR.HEART} />
          <Text style={style.retingText}>
            {String(movie?.vote_average)?.slice(0, 3)}
          </Text>
        </View>
      </View>
      <Text style={style.generText}>
        {movie?.genres?.map((i) => i?.name)?.join(", ")} | {movie?.runtime} Min
      </Text>
      <Text style={style.generText}>
        {movie?.original_language?.toUpperCase()}
      </Text>
      <View style={style.overviewContainer}>
        <Text style={style.overviewTitile}>Overview</Text>
        <Text style={style.overviewText}>{movie?.overview}</Text>
      </View>
      <View>
        <Text style={style.castTitle}>Cast</Text>
        <FlatList
          style={{ marginVertical: 5 }}
          data={cast?.cast}
          keyExtractor={(item) => item?.credit_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <CastCard
              originalName={item?.name}
              characterName={item?.character}
              image={item?.profile_path}
            />
          )}
        />
      </View>
      <Text style={style.extraListTitle}>Recommended Movies</Text>
      <FlatList
        data={movie?.recommendations?.results}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <ItemSeparator width={20} />}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListFooterComponent={() => <ItemSeparator width={20} />}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            hart={false}
            size={0.6}
            onPress={() => navigation.navigate("movie", { movieId: item.id })}
          />
        )}
      />
      <Text style={style.extraListTitle}>Similar Movies</Text>
      <FlatList
        data={movie?.similar?.results}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <ItemSeparator width={20} />}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListFooterComponent={() => <ItemSeparator width={20} />}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            hart={false}
            size={0.6}
            onPress={() => navigation.navigate("movie", { movieId: item.id })}
          />
        )}
      />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BASIC_BACKGROUND,
  },
  moviePosterImageContainer: {
    height: setHeight(35),
    width: setWidth(145),
    alignItems: "center",
    position: "absolute",
    left: setWidth((100 - 145) / 2),
    top: 0,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    elevation: 8,
  },
  moviePosterImage: {
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    width: setWidth(145),
    height: setHeight(35),
  },
  linearGradient: {
    width: setWidth(100),
    height: setHeight(6),
    position: "absolute",
    top: 0,
    elevation: 9,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    left: 0,
    top: 50,
    elevation: 20,
  },
  headerText: {
    color: COLOR.WHITE,
  },
  playButton: {
    position: "absolute",
    top: 110,
    left: setWidth(50) - 70 / 2,
    elevation: 10,
  },
  movieTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  movieTitle: {
    color: COLOR.BALCK,
    fontSize: 18,
    width: setWidth(60),
  },
  retingText: {
    marginLeft: 5,
    color: COLOR.BALCK,
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  generText: {
    color: COLOR.LIGHTGRAY,
    paddingHorizontal: 20,
    paddingTop: 5,
    fontSize: 13,
  },
  overviewContainer: {
    backgroundColor: COLOR.EXRALIGHTGRAY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  overviewTitile: {
    color: COLOR.BALCK,
    fontSize: 18,
  },
  overviewText: {
    color: COLOR.LIGHTGRAY,
    paddingVertical: 5,
    fontSize: 13,
    textAlign: "justify",
  },
  castTitle: {
    marginLeft: 20,
    color: COLOR.BALCK,
    fontSize: 18,
  },
  extraListTitle: {
    marginLeft: 20,
    color: COLOR.BALCK,
    fontSize: 18,
    marginVertical: 8,
  },
});

export default MovieScreen;

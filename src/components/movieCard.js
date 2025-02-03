import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import COLORS from "../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import IMAGE from "../constants/images";
import { getPoster } from "../services/movieService";

const MovieCard = ({
  titile,
  language,
  voteAverage,
  mvoteCount,
  poster,
  size,
  onPress,
  hart = true,
}) => {
  const [like, setLike] = useState(false);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <ImageBackground
        imageStyle={{ borderRadius: 12 }}
        style={{ ...style.container, width: 230 * size, height: 340 * size }}
        source={{ uri: getPoster(poster) }}
      >
        <View style={{ ...style.imdbContainer, paddingVertical: 3 * size }}>
          <Image
            source={IMAGE.IMDB}
            resizeMode="cover"
            style={{ ...style.imbImage, height: 20 * size, width: 50 * size }}
          />
          <Text
            style={{
              ...style.imdbRating,
              marginRight: 5 * size,
              fontSize: 14 * size,
            }}
          >
            {voteAverage}
          </Text>
        </View>
        <TouchableNativeFeedback onPress={() => setLike(!like)}>
          <Ionicons
            name={like ? "heart" : "heart-outline"}
            size={25 * size}
            color={like ? COLORS.HEART : COLORS.WHITE}
            style={{ position: "absolute", bottom: 10, left: 10 }}
          />
        </TouchableNativeFeedback>
      </ImageBackground>
      {hart && (
        <View>
          <Text
            style={{ ...style.moveiTitle, width: 230 * size }}
            numberOfLines={3}
          >
            {titile}
          </Text>
          <View style={style.movieSubTitleContainer}>
            <Text style={style.movieSubTitle}>{language.toUpperCase()}</Text>
            <View style={style.rowAndCenter}>
              <Ionicons
                name="heart"
                size={17 * size}
                color={COLORS.HEART}
                style={{ marginRight: 5 }}
              />
              <Text style={style.movieSubTitle}>{mvoteCount}</Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    height: 340,
    width: 230,
    borderRadius: 12,
    elevation: 5,
    marginVertical: 2,
    marginTop: 5,
  },
  moveiTitle: {
    color: COLORS.GRAY,
    paddingVertical: 2,
    marginTop: 5,
    width: 230,
  },
  movieSubTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  movieSubTitle: {
    fontSize: 12,
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  imdbContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: COLORS.YELLOW,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 12,
    paddingVertical: 3,
  },
  imbImage: {
    height: 20,
    width: 50,
    borderBottomLeftRadius: 5,
  },
  imdbRating: {
    color: COLORS.HEART,
    marginRight: 5,
  },
});

MovieCard.defaultProps = {
  size: 1,
};
export default MovieCard;

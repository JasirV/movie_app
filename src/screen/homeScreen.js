import React, { useState,useEffect } from "react";
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import COLOR from "../constants/colors";
import GenreCard from "../components/genreCard";
import ItemSeparator from "../components/itemSeparator";
import MovieCard from "../components/movieCard";
import { getNowPlayingMovies } from "../services/movieService";
const Genres = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-Fi"];

const HomeScreen = () => {
  const [acitcveGoner,setActiveGoner]=useState("All")
  const [nowPlaying,setNowPlaying]=useState({})
  useEffect(() => {
    const fetchMovies = async () => {
        const response = await getNowPlayingMovies();
        setNowPlaying(response.data)
    }

    fetchMovies(); 
  }, []);


  return (
    <ScrollView contentContainerStyle={style.container}>
      <StatusBar style="auto" translucent={false} />
      <View style={style.headContainer}>
        <Text style={style.headerTitle}>Now Playing</Text>
        <Text style={style.headerSubTitle}>View All</Text>
      </View>
      <View style={style.gonerListContainer}>
      <FlatList
        data={Genres}
        ItemSeparatorComponent={() => <ItemSeparator  width={20} />}
        horizontal
        keyExtractor={(item) => item}
        ListFooterComponent={()=> <ItemSeparator width={20}/>}
        ListHeaderComponent={<ItemSeparator  width={20} />}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <GenreCard  gonerName={item} active={item===acitcveGoner?true:false} onPress={(gonerName)=>{setActiveGoner(gonerName)}}/>}
        /> 
        </View>

        <View>
          <FlatList 
          data={nowPlaying.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={()=> <ItemSeparator width={20}/>}
          ListHeaderComponent={<ItemSeparator  width={20} />}
          ItemSeparatorComponent={() => <ItemSeparator  width={20} />}
          renderItem={({ item }) => <MovieCard titile={item.title} language={item.original_language} voteAverage={item.vote_average} voteCount={item.vote_count} poster={item.poster_path}/>}
          />
        </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BASIC_BACKGROUND,
  },
  headContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 28,
  },
  headerSubTitle: {
    fontSize: 13,
    color: COLOR.ATCIVE,
  },
  gonerListContainer:{
    paddingHorizontal:5
  }
});

export default HomeScreen;

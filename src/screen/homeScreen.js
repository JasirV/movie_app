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
import { getNowPlayingMovies, getUpcomingMovies,getGenres } from "../services/movieService";

const HomeScreen = ({navigation}) => {
  const [acitcveGoner,setActiveGoner]=useState("All")
  const [nowPlaying,setNowPlaying]=useState({})
  const [upcoming,setUpcoming]=useState({})
  const [genres,setGenres]=useState([{id:10110,name:'All'}]) 
   useEffect(() => {
    const fetchMovies = async () => {
        const response = await getNowPlayingMovies();
        setNowPlaying(response.data)
        const upresponse=await getUpcomingMovies()
        setUpcoming(upresponse.data)
        const genresResponse=await getGenres()
        setGenres([...genres,...genresResponse.data.genres])
    }

    fetchMovies(); 
  }, []);

 
  return (
    <ScrollView style={style.container}>
      <StatusBar style="auto" translucent={false} />
      <View style={style.headContainer}>
        <Text style={style.headerTitle}>Now Showing</Text>
        <Text style={style.headerSubTitle}>VIEW ALL</Text>
      </View>
      <View style={style.gonerListContainer}>
      <FlatList
        data={genres}
        ItemSeparatorComponent={() => <ItemSeparator  width={20} />}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={()=> <ItemSeparator width={20}/>}
        ListHeaderComponent={<ItemSeparator  width={20} />}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <GenreCard  gonerName={item.name} active={item.name===acitcveGoner?true:false} onPress={(gonerName)=>{setActiveGoner(gonerName)}}/>}
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
          renderItem={({ item }) => <MovieCard titile={item.title} language={item.original_language} voteAverage={item.vote_average} voteCount={item.vote_count} poster={item.poster_path} onPress={()=>navigation.navigate('movie',{movieId:item.id})}/>}
          />
        </View>


        <View style={style.headContainer}>
        <Text style={style.headerTitle}>Coming Soon</Text>
        <Text style={style.headerSubTitle}>VIEW ALL</Text>
      </View>
      <View>
          <FlatList 
          data={upcoming.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={()=> <ItemSeparator width={20}/>}
          ListHeaderComponent={<ItemSeparator  width={20} />}
          ItemSeparatorComponent={() => <ItemSeparator  width={20} />}
          renderItem={({ item }) => <MovieCard titile={item.title} language={item.original_language} voteAverage={item.vote_average} voteCount={item.vote_count} poster={item.poster_path} size={.6} onPress={()=>navigation.navigate('movie',{movieId:item.id})}/>}
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

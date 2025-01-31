import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text,  TouchableOpacity, View } from 'react-native'
import COLOR from '../constants/colors'
import { getMovie, getPoster } from '../services/movieService'
import ItemSeparator from '../components/itemSeparator'
import {LinearGradient} from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons';

const {height,width}=Dimensions.get('screen')
const setHeight=(h)=>(height/100)*h
const setWidth =(w)=>(width/100)*w
const MovieScreen = ({route,navigation}) => {
  const {movieId}=route.params
const [movie,setMovie]=useState({})
  useEffect(()=>{
    const fetching=async()=>{
      try {
        const respons=await getMovie(movieId)
        setMovie(respons.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetching()
  },[])
  return (
   <ScrollView> 
    <StatusBar style="auto" />
    <LinearGradient 
    colors={["rgba(0,0,0,o.5","rgba(217,217,217,0)"]}
    start={[0,0.3]}
    style={style.linearGradient}
    />
    <View style={style.moviePosterImageContainer}>
      <Image  style={style.moviePosterImage} resizeMode='cover' source={{uri:getPoster(movie.backdrop_path)}}/>
    </View>
    <View style={style.headerContainer}>
      <TouchableOpacity>
      <Feather name="chevron-left" size={35} color={COLOR.WHITE} />
      </TouchableOpacity>
      <Text style={style.headerText}>Share</Text>
    </View>
    <ItemSeparator height={setHeight(37)}/>
   </ScrollView>
  )
}

const style =StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:COLOR.BASIC_BACKGROUND
  },
  moviePosterImageContainer:{
    height:setHeight(35),
    width:setWidth(145),
    alignItems:"center",
    position:'absolute',
    left:setWidth((100-145)/2),
    top:0,
    borderBottomRightRadius:300,
    borderBottomLeftRadius:300,
    elevation:8
  },
  moviePosterImage:{
    borderBottomRightRadius:300,
    borderBottomLeftRadius:300,
    width:setWidth(145),
    height:setHeight(35)
  },
  linearGradient:{
    width:setWidth(100),
    height:setHeight(6),
    position:"absolute",
    top:0,
    elevation:9
  },
  headerContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:20,
    position:'absolute',
    right:0,
    left:0,
    top:50,
    elevation:20,
  },
  headerText:{
    color:COLOR.WHITE
  }
})

export default MovieScreen
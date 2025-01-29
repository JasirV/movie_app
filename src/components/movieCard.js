import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import COLORS from '../constants/colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import IMAGE from '../constants/images'


const MovieCard = () => {
    const [like,setLike]=useState(false)
  return (
    <TouchableOpacity>
    <View style={style.container}>
        <View style={style.imdbContainer}>
            <Image source={IMAGE.IMDB} resizeMode='cover' style={style.imbImage}/>
            <Text style={style.imdbRating}>9.4</Text>
        </View>
        <TouchableNativeFeedback onPress={()=>setLike(!like)}>
        <Ionicons name={like?"heart":"heart-outline"} size={25} color={like?COLORS.HEART:COLORS.WHITE}  style={{position:'absolute',bottom:10,left:10}} />
        </TouchableNativeFeedback>
    </View>
    <View>
        <Text style={style.moveiTitle} numberOfLines={3}>URI - Surgical Strike</Text>
        <View style={style.movieSubTitleContainer}>
            <Text style={style.movieSubTitle}>Hindi | (U/A)</Text>
            <View style={style.rowAndCenter}>
            <Ionicons name="heart" size={17} color={COLORS.HEART} style={{marginRight:5}} />
                <Text style={style.movieSubTitle}>90%</Text>
            </View>
        </View>
    </View>
    </TouchableOpacity>
  )
}

const style=StyleSheet.create({
    container:{
        backgroundColor:COLORS.ATCIVE,
        height:340,
        width:230,
        borderRadius:12,
        elevation:5,
        marginVertical:2,
        marginTop:5
    },
    moveiTitle:{
        color:COLORS.GRAY,
        paddingVertical:2,
        marginTop:5,
        width:230
    },
    movieSubTitleContainer:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between"
    },
    movieSubTitle:{
        fontSize:12,
        
    },
    rowAndCenter:{
        flexDirection:'row',
        alignItems:"center"
    },
    imdbContainer:{
        flexDirection:'row',
        alignItems:"center",
        alignSelf:"flex-end",
        backgroundColor:COLORS.YELLOW,
        borderBottomLeftRadius:5,
        borderTopRightRadius:12,
        paddingVertical:3,
        
    },
    imbImage:{
        height:20,
        width:50,
        borderBottomLeftRadius:5
    },
    imdbRating:{
        color:COLORS.HEART,
        marginRight:5,
    }
})

export default MovieCard
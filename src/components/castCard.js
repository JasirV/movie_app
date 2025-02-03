import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { getPoster } from '../services/movieService'
import COLORS from '../constants/colors'

const CastCard = ({originalName,characterName,image}) => {
  return (
    <View style={style.container}>
        <Image style={style.image} source={{uri:getPoster(image)}} resizeMode='cover'/>
        <Text style={style.originalName} numberOfLines={2}>{originalName}</Text>
        <Text style={style.characterName} numberOfLines={2}>{characterName}</Text>
    </View>
  )
}
const style=StyleSheet.create({
    container:{
        flex:1,
        
    }, image: {
        height: 120,
        width: 80,
        borderRadius: 10,
      },
      originalName: {
        width: 80,
        color: COLORS.BLACK,
        fontSize: 12,
      },
      characterName: {
        width: 80,
        color: COLORS.LIGHTGRAY,
        fontSize: 10,
      },
})

export default CastCard
import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import COLOUR from "../constants/colors";

const {  width } = Dimensions.get("screen");
const setWidth =(w)=>(width/100)*w
const GenreCard = ({gonerName,active,onPress}) => {
  return (
    <TouchableOpacity onPress={()=>{onPress(gonerName)}} style={{...style.container,backgroundColor:active?COLOUR.ATCIVE:COLOUR.WHITE}} activeOpacity={0.5}>
      <Text style={{...style.gonertext,color:active?COLOUR.WHITE:COLOUR.BALCK}}>{gonerName}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems:'center',
    borderRadius:5,
    backgroundColor:COLOUR.WHITE,
    paddingVertical:8,
    elevation:3,
    marginVertical:2,
    width:setWidth(25)
  },
  gonertext:{
    fontSize:13,
    color:COLOUR.ATCIVE
  }
});

export default GenreCard;

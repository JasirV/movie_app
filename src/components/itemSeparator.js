import React from "react";
import { View } from "react-native";

function ItemSeparator({ height, width }) {
  return <View style={{ height, width }} ></View>;
}

ItemSeparator.defaultProps = {
  height: 0,
  width: 0,
};

export default ItemSeparator;

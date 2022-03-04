import { View, Text, Image } from "react-native";
import React from "react";
// import { Fonts , Colors } from "src/utils";
import { fonts } from "../Constants/Fonts";
import { Colors } from "../Constants/Colors";
import { wp } from "../Helpers/Responsiveness";
const toastConfig = {
    message: ({ props }) => (
    <View
      style={{
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
        borderLeftWidth:10,
        borderLeftColor: Colors.greenColor,
        justifyContent:"center",
        paddingVertical:20,
        marginBottom: 80,
        paddingHorizontal:15,
      }}
    >
      <Text
        style={{
          fontFamily: fonts.Poppins_Medium,
          fontSize:15,
          color:"#000"
        }}
      >
        {props.body}
      </Text>
    </View>
  ),
};
export default toastConfig
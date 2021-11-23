import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity, TextInput } from "react-native";

import { wp } from "../Helpers/Responsiveness"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from "../Constants/Fonts";
import { Colors } from "../Constants/Colors";
import { iconPath } from "../Constants/icon";

const InputField = (props) => {
    return (
        <View style={[styles.textInputStyle, props.shadow ? null : null, {
            marginTop: props.marginTopp ? props.marginTopp : wp(1), borderRadius: props.borderRadius ? props.borderRadius : 10,
            backgroundColor: props.backgroundColor
                ? props.backgroundColor
                : Colors.TextInputBackgroundColor,
                alignItems:"center"
        }]}>

            {props.leftIcon &&
                <Image source={props.leftIconName} style={{ width: wp(5), height: wp(5), marginLeft: wp(3) }} resizeMode={"contain"}></Image>
            }

            <TextInput
                {...props}
                // style={{fontFamily: fonts.LatoBold}}
                placeholder={props.placeholder}
                value={props.value}
                // caretHidden={true}
                // keyboardType="email-address"
                placeholderTextColor={props.placeholderTextColor ? props.placeholderTextColor : "#00000099"}
                // onChangeText={text => onChangeText(text)}
                style={{
                    flex: 1, height: props.height ? props.height : 50,
                    borderRadius: props.borderRadius ? props.borderRadius : 10,
                    paddingLeft: props.paddingLeft ? props.paddingLeft : 14,
                    backgroundColor: props.backgroundColor ? props.backgroundColor : Colors.TextInputBackgroundColor,
                    fontFamily: props.fontFamily ? props.fontFamily : fonts.Poppins,
                    fontSize: props.fontSize ? props.fontSize : 14,
                    color: props.color ? props.color : "#000", 
                    //  paddingTop:15
                }}
            />
            {props.secureText &&
                <TouchableOpacity style={{ paddingRight: wp(1.8), }} onPress={props.onPress}>
                    {props.RightImage ?
                    <Image source={props.secureTextEntry ? iconPath.passwordHide : iconPath.passwordUnhide} style={{ width: wp(6), height: wp(6) }} resizeMode={"contain"}/>
                    :
                     <Ionicons
                        size={wp(6)}
                        color={props.iconColor ? props.iconColor: "#00000099" }
                        name={props.iconName ? props.iconName :
                            props.secureTextEntry ? 'md-eye-off-outline' : 'md-eye-outline'}
                    /> }
                    {/* <Text style={{color: th}}>BNB</Text> */}
                </TouchableOpacity>
            }
            {props.RightText &&
                <Text style={{
                    color: props.textColor, marginRight: wp(3),
                    fontFamily: fonts.LatoRegular
                }}>{props.RightTextTitle}</Text>
            }

        </View>

    )
}
export default InputField;
const styles = StyleSheet.create({
    textInputStyle: {
        flexDirection: "row", alignItems: "center"
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5
    },
});

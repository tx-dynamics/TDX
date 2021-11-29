import React from 'react'
import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import { iconPath } from '../Constants/icon';

import { Colors } from '../Constants/Colors';
import Fonticon from '../Constants/FontIcon';
import { wp } from '../Helpers/Responsiveness';
import ResponsiveText from './RnText';
import { fonts } from '../Constants/Fonts';

const Header = (props) => {
    return (
        <View style={{ height: 50, alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
            {props.left &&
                <Pressable style={{ paddingLeft: wp(4) }} onPress={props.leftPress}>
                    {props.LeftImage ?
                        <Image source={props.ImageName} style={{ width: wp(6.5), height: wp(6.5), resizeMode: "contain" }} />
                        :
                        <Fonticon type={props.LeftIconType} name={props.LeftIconName} size={wp(7)} color={Colors.black} />}
                </Pressable>
            }
            {props.midImage &&
                <View style={{ position: "absolute", width: "100%", alignItems: "center" }}>
                    <Image source={iconPath.Logo} style={{ width: props.imageWidth ? props.imageWidth : wp(15), height: props.imageHeight ? props.imageHeight : wp(15), resizeMode: "contain" }} />
                </View>}
            {props.midtitle &&
                <View style={{ position: "absolute", width: "100%", alignItems: "center" }}>
                    <ResponsiveText size="header" fontFamily={fonts.Poppins_SemiBold}>{props.title}</ResponsiveText>
                </View>}
            {props.right &&
                <Pressable onPress={props.RightPress}
                    style={{ paddingRight: wp(4) }}>
                    <Fonticon type={props.RightIconType} name={props.RightIconName} size={wp(7)} color={Colors.black} />
                </Pressable>
            }
        </View>
    )
}
export default Header;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
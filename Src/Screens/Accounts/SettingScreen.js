import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';
import { ScrollView } from 'react-native-gesture-handler';

import ModalDropdown from 'react-native-modal-dropdown';


const SettingScreen = (props) => {

    const [DropDownItem, setDropDownItem] = useState('USD')

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Settings"}
                leftPress={() => props.navigation.goBack()} />
            <ScrollView>

                <View style={[styles.headingContainer, { flexDirection: "row", justifyContent: "space-between" }]}>
                    <ResponsiveText size="h8" >{"Contact Details"}</ResponsiveText>
                    <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium} >{"Edit Profile"}</ResponsiveText>
                </View>

                <View style={{ paddingHorizontal: wp(4), marginVertical: wp(4) }}>
                    <ResponsiveText size="h6" fontFamily={fonts.Poppins_SemiBold} >{"John Doe"}</ResponsiveText>
                    <ResponsiveText size="h8" margin={[-8, 0, 0, 0]} >{"ID: 107461 "}</ResponsiveText>
                </View>

                <View style={styles.headingContainer}>
                    <ResponsiveText size="h8" >{"Currency"}</ResponsiveText>
                </View>

                <View style={{ backgroundColor: "#F4F4F4", margin: wp(4), borderRadius: 5, flexDirection: "row", paddingHorizontal: wp(4), alignItems: "center" }}>

                    <ResponsiveText size="h8" color={"#6F7074"} fontFamily={fonts.Poppins_SemiBold} >{"GH₵"}</ResponsiveText>
                    <ModalDropdown options={['GHS', 'USD']}
                        defaultValue={DropDownItem}
                        style={styles.dropDown}
                        dropdownStyle={styles.dropDown_dropDownStyle}
                        dropdownTextStyle={styles.dropDown_textStyle}
                        textStyle={{ color: "#6F7074", marginLeft: 10, fontSize: wp(4), width: wp(69), fontFamily: fonts.Poppins }}
                        onSelect={(idx, DropDownItem) => setDropDownItem(DropDownItem)}
                        renderRightComponent={() => (<Image source={iconPath.DROPDOWN} style={styles.dropDownIcon} />)}
                    />

                </View>


                <View style={[styles.headingContainer]}>
                    <ResponsiveText size="h8" >{"App Settings"}</ResponsiveText>
                </View>

                <Pressable onPress={() => props.navigation.navigate("NotificationSettings")}
                    style={styles.containerStyle}>
                    <Image source={iconPath.notificationDull} style={{ width: wp(7), height: wp(7), resizeMode: "contain" }} />
                    <ResponsiveText size="h8" color={"#6F7074"} margin={[0, 0, 0, 8]}>{"Notification Settings"}</ResponsiveText>
                </Pressable>


                <View style={styles.headingContainer}>
                    <ResponsiveText size="h8" >{"Security Settings"}</ResponsiveText>
                </View>
                <Pressable onPress={() => props.navigation.navigate("ChangePassword")}
                    style={styles.containerStyle}>
                    <Image source={iconPath.changePassword} style={{ width: wp(7), height: wp(7), resizeMode: "contain" }} />
                    <ResponsiveText size="h8" color={"#6F7074"} margin={[0, 0, 0, 8]}>{"Change Password"}</ResponsiveText>
                </Pressable>
                <View style={styles.headingContainer}>
                    <ResponsiveText size="h8" >{"General Settings"}</ResponsiveText>
                </View>
                <View style={styles.containerStyle}>
                    <Image source={iconPath.HelpDull} style={{ width: wp(7), height: wp(7), resizeMode: "contain" }} />
                    <ResponsiveText size="h8" color={"#6F7074"} margin={[0, 0, 0, 8]}>{"Help"}</ResponsiveText>
                </View>

            </ScrollView>

            <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", paddingBottom: 5 }}>
                <ResponsiveText size="h7" color={"#868686"} margin={[0, 0, 0, 8]}>{"V 1.0"}</ResponsiveText>
            </View>

        </View>
    )
}
export default SettingScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.white,
        // justifyContent: "center",
        // alignItems: "center"
    },
    containerStyle: {
        backgroundColor: Colors.TextInputBackgroundColor, flexDirection: "row", marginVertical: wp(4),
        marginHorizontal: wp(4), padding: wp(4), borderRadius: 5, alignItems: "center"
    },
    headingContainer: { paddingHorizontal: wp(4), backgroundColor: Colors.TextInputBackgroundColor, paddingVertical: 4, justifyContent: "center" },

    dropDown_dropDownStyle: {
        width: wp(90),
        borderWidth: 0,
        marginLeft: wp(-12)

    },
    dropDown_textStyle: {
        fontSize: 15,
        color: "#6F7074",
        fontFamily: fonts.Poppins
    },
    dropDown: {
        height: 50,
        justifyContent: "center",
        borderRadius: 4,
        // backgroundColor: Colors.TextInputBackgroundColor
    },
    dropDownIcon: {
        width: wp(4.5),
        height: "100%",
        alignSelf: "flex-end",
        resizeMode: "contain",
        marginRight: 10,
        marginTop: wp(-8)
    }

})
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
import Button from '../../Components/Button';
import InputField from '../../Components/InputField';



const TradeScreen = (props) => {

    const [DropDownItem, setDropDownItem] = useState('')
    const [selectedBtn, setSelectedBtn] = useState("Buy")

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Trade"}
                leftPress={() => props.navigation.goBack()} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(4), marginTop: wp(2) }}>
                <View style={{ width: "47%", }}>
                    <Button
                        onPress={() => setSelectedBtn("Buy")}
                        Text={'Buy'}
                        backgroundColor={selectedBtn === "Buy" ? "#019146" : "#6FBF92"}
                    />
                </View>
                <View style={{ width: "47%" }}>
                    <Button
                        onPress={() => setSelectedBtn("Sell")}
                        Text={'Sell'}
                        backgroundColor={selectedBtn === "Sell" ? "#DB1222" : "#E6727F"}
                    />
                </View>
            </View>

            <View style={{ paddingHorizontal: wp(4), marginTop: 14 }}>


                <ResponsiveText size="h8" fontFamily={fonts.Poppins_Light} margin={[0, 0, 0, 0]}>{"Buy Order For :"}</ResponsiveText>
                <InputField
                // value={EmailAdd}
                // onChangeText={(EmailAdd) => setEmailAdd(EmailAdd)}
                />
                <ResponsiveText size="h8" fontFamily={fonts.Poppins_Light} margin={[15, 0, 0, 0]}>{"Commodity type :"}</ResponsiveText>
                <InputField />

                <ResponsiveText size="h8" fontFamily={fonts.Poppins_Light} margin={[15, 0, 5, 0]}>{"Order Type :"}</ResponsiveText>

                <View style={{
                    backgroundColor: Colors.TextInputBackgroundColor, alignItems: "center", alignSelf: "flex-start",
                    paddingHorizontal: wp(5), paddingVertical: wp(2), borderRadius: 15
                }}>
                    <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium} margin={[0, 0, 0, 0]}>{"Market"}</ResponsiveText>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <ResponsiveText size="h8" fontFamily={fonts.Poppins_Light} margin={[15, 0, 0, 0]}>{"quantity (MT) :"}</ResponsiveText>
                    <ResponsiveText size="h8" fontFamily={fonts.Poppins_Light} margin={[15, 0, 0, 0]}>{"Bags: 00"}</ResponsiveText>

                </View>
                <InputField />


                <ResponsiveText size="h8" fontFamily={fonts.Poppins_Light} textAlign={"center"} margin={[wp(10), 0, wp(10), 0]}>{"Advance Options"}</ResponsiveText>

            </View>


            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(10), marginTop: wp(2) }}>
                <View style={{ width: "45%", }}>
                    <Button
                        onPress={() => setSelectedBtn("Buy")}
                        Text={'Clear'}
                        fontFamily={fonts.Poppins_Medium}
                        fontSize={18}
                        TextColor={"#6D6D6D"}
                        backgroundColor={"transparent"}
                    />
                </View>
                <View style={{ width: "45%" }}>
                    <Button
                        Text={'Submit'}
                        fontFamily={fonts.Poppins_Medium}
                        fontSize={18}
                        backgroundColor={"#455154"}
                    />
                </View>
            </View>



        </View>
    )
}
export default TradeScreen;
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
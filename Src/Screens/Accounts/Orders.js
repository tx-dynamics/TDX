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

const DATA = [
    { date: "28/10/21", ticker: "GWAYM6", type: "Market/sell", price: "2000", qty: "32", status: "Pending" },
    { date: "28/10/21", ticker: "GWAYM6", type: "Market/sell", price: "2000", qty: "32", status: "Pending" },
    { date: "28/10/21", ticker: "GWAYM6", type: "Market/sell", price: "2000", qty: "32", status: "Pending" },
    { date: "28/10/21", ticker: "GWAYM6", type: "Market/sell", price: "2000", qty: "32", status: "Partial" },
]
const DATA1 = [
    { date: "28/10/21", ticker: "GWAYM6", type: "Market/sell", price: "2000", qty: "32", status: "Completed" },
    { date: "28/10/21", ticker: "GWAYM6", type: "Market/sell", price: "2000", qty: "32", status: "Completed" },
    { date: "28/10/21", ticker: "GWAYM6", type: "Market/sell", price: "2000", qty: "32", status: "Completed" },
    { date: "28/10/21", ticker: "GWAYM6", type: "Market/sell", price: "2000", qty: "32", status: "Completed" },
]


const Orders = (props) => {

    const [DropDownItem, setDropDownItem] = useState('')
    const [selectedBtn, setSelectedBtn] = useState("Open")

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Orders"}
                leftPress={() => props.navigation.goBack()} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(4), marginTop: wp(2) }}>
                <View style={{ width: "47%", }}>
                    <Button
                        onPress={() => setSelectedBtn("Open")}
                        Text={'Open'}
                        height={52}
                        backgroundColor={selectedBtn === "Open" ? "#979797" : "#BABABA"}
                    />
                </View>
                <View style={{ width: "47%" }}>
                    <Button
                        onPress={() => setSelectedBtn("History")}
                        Text={'History'}
                        height={52}
                        backgroundColor={selectedBtn === "Open" ? "#BABABA" : "#979797"}
                    />
                </View>
            </View>

            <View style={{ backgroundColor: "#979797", height: 46, marginTop: wp(4), flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(2) }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]} textAlign={"center"} color={"#fff"}>{"Date"}</ResponsiveText>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]} textAlign={"center"} color={"#fff"}>{"Ticker"}</ResponsiveText>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]} textAlign={"center"} color={"#fff"}>{"Order Type"}</ResponsiveText>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]} textAlign={"center"} color={"#fff"}>{"Price\n(MT)"}</ResponsiveText>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]} textAlign={"center"} color={"#fff"}>{"Qty\n(MT)"}</ResponsiveText>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]} textAlign={"center"} color={"#fff"}>{"Status"}</ResponsiveText>
                </View>

            </View>

            <FlatList
                data={selectedBtn === "Open" ? DATA : DATA1}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: wp(2) }}
                contentContainerStyle={{}}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, height: 50, paddingHorizontal: wp(2) }}>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium}  margin={[0, 0, 0, 0]} textAlign={"center"}>{item.date}</ResponsiveText>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium}  margin={[0, 0, 0, 0]} textAlign={"center"}>{item.ticker}</ResponsiveText>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium}  margin={[0, 0, 0, 0]} textAlign={"center"}>{item.type}</ResponsiveText>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium}  margin={[0, 0, 0, 0]} textAlign={"center"}>{item.price}</ResponsiveText>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium}  margin={[0, 0, 0, 0]} textAlign={"center"}>{item.qty}</ResponsiveText>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center", }}>
                                <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium} margin={[0, 0, 0, 0]} color={item.status === "Completed" ? "#019146" : item.status === "Pending" ? "#DB1222" : "#F4BB32"  } textAlign={"center"}>{item.status}</ResponsiveText>
                            </View>
                        </View>
                        <View style={{ backgroundColor: "#ECECEC", height: 2, width: wp(100), marginVertical:wp(2) }} />
                    </>


                )} />







        </View>
    )
}
export default Orders;
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
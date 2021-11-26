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

import ModalDropdown from 'react-native-modal-dropdown';

const NewsDATA = [
    { id: "1", Heading: "News Headings", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non, mauris egestas a..." },
    { id: "2", Heading: "News Headings", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non, mauris egestas a..." }
]

const DayDATA = [
    { id: "1", title: "1 D" },
    { id: "2", title: "1 w" },
    { id: "3", title: "1 M" },
    { id: "4", title: "3 M" },
    { id: "5", title: "6 M" },
    { id: "6", title: "1  Y" },
]

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const Greendata = {
    datasets: [
        {
            data: [
                10,
                8,
                10,
                8,
                15,
                10,
                15,
                10,
                15
            ]
        }
    ]
}


const AssetsDetails = (props) => {

    const [DropDownItem, setDropDownItem] = useState('USD')

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Assets"}
                leftPress={() => props.navigation.goBack()} />

            <ScrollView>


                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(4), marginTop: wp(3), alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image source={iconPath.coin1} style={{ width: wp(13), height: wp(13), resizeMode: "contain" }} />
                        <View style={{ marginLeft: 12 }}>
                            <ResponsiveText size="h5" margin={[0, 0, 0, 0]} fontFamily={fonts.Poppins_SemiBold}>{"Maize"}</ResponsiveText>
                            <ResponsiveText size="h6" margin={[-6, 0, 0, 0]}>{"Maize"}</ResponsiveText>
                        </View>
                    </View>
                    <Image source={iconPath.threeVerticalDot} style={{ width: wp(8), height: wp(8), resizeMode: "contain", marginRight: -5 }} />
                </View>


                <View style={{ backgroundColor: Colors.TextInputBackgroundColor, paddingVertical: wp(4), marginTop: wp(5) }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(4) }}>
                        <ResponsiveText size="h6" fontFamily={fonts.Poppins_SemiBold} margin={[0, 0, 0, 5]}>{"GWAYM1"}</ResponsiveText>
                        <View style={{ alignItems: "flex-end" }}>
                            <ResponsiveText size="h8" color={Colors.greenColor}>{"2000"}</ResponsiveText>
                            <ResponsiveText size="h9" color={Colors.greenColor} margin={[-4, 0, 0, 0]}>{"+10%"}</ResponsiveText>
                        </View>
                    </View>

                    <View style={{ width: "100%", alignItems: "center", marginTop: wp(5) }}>


                        <LineChart
                            data={Greendata}
                            width={wp(100)} // from react-native
                            height={140}
                            withHorizontalLabels={false}
                            flatColor={true}
                            chartConfig={{
                                backgroundGradientFromOpacity: 0,
                                backgroundGradientToOpacity: 0,
                                color: (opacity = 1) => Colors.greenColor,
                                propsForDots: { r: "0" },
                                propsForBackgroundLines: { stroke: "#CCCCCC33" }
                            }}
                            bezier
                            style={{ paddingRight: 0, paddingTop: 3, transform: [{ translateX: 15 }] }}
                        />
                    </View>

                    <View style={{ paddingHorizontal: wp(4) }}>
                        <ScrollView horizontal>
                            {DayDATA.map((item, index) =>
                                <Pressable style={{  marginLeft: index ===0 ? 0 : wp(4), backgroundColor: "#00000033", width: 41, alignItems: "center", height: 31, justifyContent: "center", borderRadius: 15 }}>
                                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{item.title}</ResponsiveText>
                                </Pressable>
                            )}

                        </ScrollView>

                    </View>
                </View>

                <View style={{
                    backgroundColor: Colors.TextInputBackgroundColor, paddingHorizontal: wp(4), justifyContent: "space-between",
                    marginVertical: wp(4), paddingVertical: wp(4), flexDirection: "row", alignItems: "center"
                }}>
                    <ResponsiveText size="h7" fontFamily={fonts.Poppins_Medium}>{"Your stock"}</ResponsiveText>

                    <View style={{ flexDirection: "row" }}>
                        <View style={{ alignItems: "center" }}>
                            <ResponsiveText size="h9" color={"#BEBEBE"}>{"Quantity (MT)"}</ResponsiveText>
                            <ResponsiveText size="h9" margin={[5, 0, 0, 0]}>{"10"}</ResponsiveText>
                        </View>
                        <View style={{ alignItems: "center", marginLeft: wp(9), marginRight: wp(4) }}>
                            <ResponsiveText size="h9" color={"#BEBEBE"}>{"Bags"}</ResponsiveText>
                            <ResponsiveText size="h9" margin={[5, 0, 0, 0]}>{"200"}</ResponsiveText>
                        </View>
                    </View>
                </View>


                <View style={{
                    backgroundColor: Colors.TextInputBackgroundColor, paddingHorizontal: wp(4),
                    paddingVertical: wp(4),
                }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <ResponsiveText size="h7" fontFamily={fonts.Poppins_Medium}>{"Commodity Information"}</ResponsiveText>
                        <ResponsiveText size="h7" fontFamily={fonts.Poppins_Medium}>{"Symbol"}</ResponsiveText>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wp(3), alignItems: "center" }}>
                        <View>
                            <ResponsiveText size="h9" color={"#BEBEBE"}>{"Country of origin"}</ResponsiveText>
                            <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium}>{"Ghana"}</ResponsiveText>
                        </View>
                        <ResponsiveText size="h7" fontFamily={fonts.Poppins_Medium}>{"G"}</ResponsiveText>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wp(1), alignItems: "center" }}>
                        <View>
                            <ResponsiveText size="h9" color={"#BEBEBE"}>{"Warehouse Location"}</ResponsiveText>
                            <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium}>{"W9"}</ResponsiveText>
                        </View>
                        <ResponsiveText size="h7" fontFamily={fonts.Poppins_Medium}>{"WA"}</ResponsiveText>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wp(1), alignItems: "center" }}>
                        <View>
                            <ResponsiveText size="h9" color={"#BEBEBE"}>{"Commodity Type"}</ResponsiveText>
                            <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium}>{"Yellow Soya Bean"}</ResponsiveText>
                        </View>
                        <ResponsiveText size="h7" fontFamily={fonts.Poppins_Medium}>{"YSB"}</ResponsiveText>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wp(1), alignItems: "center" }}>
                        <View>
                            <ResponsiveText size="h9" color={"#BEBEBE"}>{"Grade"}</ResponsiveText>
                            <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium}>{"1"}</ResponsiveText>
                        </View>
                        <ResponsiveText size="h7" fontFamily={fonts.Poppins_Medium}>{"1"}</ResponsiveText>
                    </View>

                    <Pressable style={{
                        backgroundColor: "#455154", paddingHorizontal: wp(5), paddingVertical: wp(2), alignSelf: "center",
                        borderRadius: 11, alignItems: "center"
                    }}>

                        <ResponsiveText size="h7" textAlign={"center"} color={"#F3BA2F"} >{"View Soya Bean \n Contract"}</ResponsiveText>



                    </Pressable>

                </View>


                <ResponsiveText size="h7" margin={[wp(4), 0, 0, wp(4)]} fontFamily={fonts.Poppins_Medium}>{"News"}</ResponsiveText>

                {NewsDATA.map((item) =>
                    <View style={{
                        backgroundColor: Colors.TextInputBackgroundColor, marginTop: wp(2), marginHorizontal: wp(4), paddingHorizontal: wp(4),
                        paddingVertical: wp(2), borderRadius: 16
                    }}>
                        <ResponsiveText size="h7" margin={[0, 0, 0, 0]} fontFamily={fonts.Poppins_Medium}>{item.Heading}</ResponsiveText>
                        <ResponsiveText size="h9" margin={[-2, 0, 0, 0]} color={"#6B6B6B"}>{item.desc}</ResponsiveText>
                    </View>
                )}

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(4), marginTop: wp(4), marginBottom: wp(10) }}>
                    <View style={{ width: "47%", }}>
                        <Button
                            onPress={() => setSelectedBtn("Buy")}
                            Text={'Buy'}
                            backgroundColor={"#019146"}
                        />
                    </View>
                    <View style={{ width: "47%" }}>
                        <Button
                            onPress={() => setSelectedBtn("Sell")}
                            Text={'Sell'}
                            backgroundColor={"#DB1222"}
                        />
                    </View>
                </View>


            </ScrollView>
        </View>
    )
}
export default AssetsDetails;
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
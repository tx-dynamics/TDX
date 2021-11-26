import React from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';

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
                15,
                10,
                15,
                10,
                15
            ]
        }
    ]
}
const Reddata = {
    datasets: [
        {
            data: [
                15,
                10,
                13,
                10,
                12,
                8,
                10
            ]
        }
    ]
}

const AssetsScreen = (props) => {

    const Navigatee = (id) => {
        if (id === "3") {
            props.navigation.navigate("Orders")
        } else if (id === "2") {
            props.navigation.navigate("Alerts")
        }
    }



    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.drawerIcon}
                midtitle title={"Assets"}
                leftPress={() => props.navigation.openDrawer()} />

            <View style={{
                backgroundColor: Colors.TextInputBackgroundColor, paddingHorizontal: wp(4), marginHorizontal: wp(4),
                paddingTop: wp(4), paddingBottom: wp(1), marginTop: wp(3), borderRadius: 14
            }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <ResponsiveText size="h6" fontFamily={fonts.Poppins_SemiBold} color={"#FDBD20"}>{"Cash Balance"}</ResponsiveText>
                        <ResponsiveText size="h9" margin={[0, 0, 0, 8]} color={"#000"}>{"(GH₵)"}</ResponsiveText>
                    </View>
                    <Fonticon type={"MaterialIcons"} name={"info"} size={wp(6)} color={"#000"} />
                </View>

                <ResponsiveText size="h6" fontFamily={fonts.Poppins_Bold} color={"#000"}>{"20,000"}</ResponsiveText>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: wp(5) }}>

                    <Pressable onPress={() => props.navigation.navigate("Deposite")}
                        style={{ alignItems: "center", justifyContent: "center" }}>
                        <View style={{ backgroundColor: "#fff", paddingVertical: wp(2), paddingHorizontal: wp(4), borderRadius: 5 }}>
                            <Image source={iconPath.Deposit} style={{ width: wp(6), height: wp(6), resizeMode: "contain" }} />
                        </View>
                        <ResponsiveText size="h9" margin={[3, 0, 0, 0]} color={"#000"}>{"Deposit"}</ResponsiveText>
                    </Pressable>

                    <Pressable onPress={() => props.navigation.navigate("Withdraw")}
                        style={{ marginLeft: wp(6), alignItems: "center" }}>
                        <View style={{ backgroundColor: "#fff", paddingVertical: wp(2), paddingHorizontal: wp(4), borderRadius: 5, }}>
                            <Image source={iconPath.Withdrawal} style={{ width: wp(6), height: wp(6), resizeMode: "contain" }} />
                        </View>
                        <ResponsiveText size="h9" margin={[3, 0, 0, 0]} color={"#000"}>{"Withdrawal"}</ResponsiveText>
                    </Pressable>

                </View>

            </View>


            <View style={{
                backgroundColor: Colors.TextInputBackgroundColor, flexDirection: "row", justifyContent: "space-between",
                marginVertical: wp(5), paddingVertical: wp(4), paddingHorizontal: wp(4), alignItems: "center"
            }}>
                <ResponsiveText size="h7" color={"#000"}>{"Total Stock"}</ResponsiveText>

                <View style={{ flexDirection: "row" }}>
                    <View style={{ alignItems: "center" }}>
                        <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium} color={"#000"}>{"Quantity (MT)"}</ResponsiveText>
                        <ResponsiveText size="h9" margin={[3, 0, 0, 0]} color={"#000"}>{"300"}</ResponsiveText>
                    </View>
                    <View style={{ alignItems: "center", marginLeft: wp(5) }}>
                        <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium} color={"#000"}>{"GH₵ Value"}</ResponsiveText>
                        <ResponsiveText size="h9" margin={[3, 0, 0, 0]} color={"#000"}>{"5000"}</ResponsiveText>
                    </View>
                </View>
            </View>




            <Pressable onPress={() => props.navigation.navigate("AssetsDetailss")}
                style={{ backgroundColor: "#CCCCCC33", paddingVertical: wp(4), paddingHorizontal: wp(3), paddingBottom: wp(2) }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row" }}>
                        <Image source={iconPath.coin1} style={{ width: wp(8), height: wp(8), resizeMode: "contain" }} />
                        <ResponsiveText size="h6" margin={[0, 0, 0, 5]} fontFamily={fonts.Poppins_SemiBold}>{"Soya Bean"}</ResponsiveText>
                    </View>
                </View>

                <View style={{ flexDirection: "row", marginTop: wp(6) }}>

                    <View style={{ flex: .19, alignItems: "flex-start" }}>
                        <ResponsiveText size="h9" margin={[0, 0, wp(6), 0]}>{"Ticker"}</ResponsiveText>
                        <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{"GWAYM1"}</ResponsiveText>
                        <ResponsiveText size="h8" margin={[wp(10), 0, 0, 0]}>{"GWAYM2"}</ResponsiveText>

                    </View>
                    <View style={{ flex: .26, alignItems: "center", }}>
                        <ResponsiveText size="h9" margin={[0, 0, wp(6), 0]}>{"Quantity (MT)"}</ResponsiveText>
                        <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{"40"}</ResponsiveText>
                        <ResponsiveText size="h8" margin={[wp(10), 0, 0, 0]}>{"70"}</ResponsiveText>

                    </View>
                    <View style={{ flex: .4, }}>
                        <ResponsiveText size="h9" margin={[0, 0, wp(5), 0]}>{""}</ResponsiveText>

                        <LineChart
                            data={Greendata}
                            width={wp(30)} // from react-native
                            height={wp(11)}
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
                            style={{ paddingRight: 0, paddingTop: 3, transform: [{ translateX: 7 }], alignSelf: "center" }}
                        />

                        <LineChart
                            data={Reddata}
                            width={wp(30)} // from react-native
                            height={wp(11)}
                            withHorizontalLabels={false}
                            flatColor={true}
                            chartConfig={{
                                backgroundGradientFromOpacity: 0,
                                backgroundGradientToOpacity: 0,
                                color: (opacity = 1) => "#DB1222",
                                propsForDots: { r: "0" },
                                propsForBackgroundLines: { stroke: "#CCCCCC33" }
                            }}
                            bezier
                            style={{ paddingRight: 0, paddingTop: 3, transform: [{ translateX: 7 }], alignSelf: "center", marginTop: wp(2) }}
                        />


                    </View>
                    <View style={{ flex: .15, alignItems: "flex-end", }}>
                        <ResponsiveText size="h9" margin={[0, 0, wp(5), 0]}>{"GH₵/MT"}</ResponsiveText>

                        <View style={{ alignItems: "flex-end" }}>
                            <ResponsiveText size="h6" color={Colors.greenColor}>{"2000"}</ResponsiveText>
                            <ResponsiveText size="h8" color={Colors.greenColor} margin={[-4, 0, 0, 0]}>{"+10%"}</ResponsiveText>
                        </View>

                        <View style={{ alignItems: "flex-end", marginTop: wp(2) }}>
                            <ResponsiveText size="h6" color={"#DB1222"}>{"1875"}</ResponsiveText>
                            <ResponsiveText size="h8" color={"#DB1222"} margin={[-4, 0, 0, 0]}>{"-3.8%"}</ResponsiveText>
                        </View>
                    </View>
                </View>

                <View style={{ backgroundColor: "#D8D8D8", height: 1.5, width: "90%", alignSelf: "center", marginVertical: 18 }} />
                <View style={{ flexDirection: "row", }}>

                    <View style={{ flex: .19, alignItems: "flex-start" }}>
                        <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium} margin={[0, 0, wp(6), 0]}>{"Total"}</ResponsiveText>

                    </View>
                    <View style={{ flex: .26, alignItems: "center" }}>
                        <ResponsiveText size="h9" margin={[0, 0, wp(5), 0]}>{"110"}</ResponsiveText>

                    </View>
                    <View style={{ flex: .3 }}>

                    </View>
                    <View style={{ flex: .25, alignItems: "flex-end" }}>
                        <ResponsiveText size="h9" margin={[0, 0, wp(5), 0]}>{"GH₵ 22000"}</ResponsiveText>

                    </View>

                </View>

            </Pressable>





        </View>
    )
}
export default AssetsScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.white,
        // justifyContent: "center",
        // alignItems: "center"
    }
})
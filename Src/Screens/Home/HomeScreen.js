import React from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList } from 'react-native'

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

const DATA = [
    { id: "1", coinName:"Maize", },
    { id: "2", coinName:"Soya Bean", },
    { id: "3", coinName:"Rice", },
    { id: "4", coinName:"Sesame", },
    { id: "5", coinName:"Sorghum", },
]

const HomeScreen = (props) => {
    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.drawerIcon}
                midImage right RightIconType={"Ionicons"} RightIconName={"search"}
                leftPress={() => props.navigation.openDrawer()} />
            <View style={{ paddingHorizontal: wp(4), marginTop: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={iconPath.marketIcon} style={{ width: wp(6), height: wp(6), resizeMode: "contain" }} />
                    <ResponsiveText size="h5" margin={[0, 0, 0, 10]} fontFamily={fonts.Poppins_SemiBold}>{"Markets"}</ResponsiveText>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: wp(5) }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ backgroundColor: "#CCCCCC", paddingHorizontal: wp(5), borderRadius: 20, height: wp(9), justifyContent: "center" }}>
                            <ResponsiveText size="h6" color={Colors.white} >{"Commodity"}</ResponsiveText>
                        </View>
                        <View style={{ backgroundColor: "#CCCCCC", paddingHorizontal: wp(5), borderRadius: 20, marginLeft: 8, height: wp(9), justifyContent: "center" }}>
                            <Image source={iconPath.greenEye} style={{ width: wp(6), height: wp(6), resizeMode: "contain" }} />
                        </View>
                    </View>
                    <Image source={iconPath.homeFilter} style={{ width: wp(8), height: wp(8), resizeMode: "contain" }} />
                </View>
            </View>

            <FlatList
                data={DATA}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: wp(5) }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (

                    <View style={{ backgroundColor: "#CCCCCC33", padding: wp(4), paddingBottom:wp(2) }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={iconPath.coin1} style={{ width: wp(8), height: wp(8), resizeMode: "contain" }} />
                                <ResponsiveText size="h5" margin={[0, 0, 0, 5]} fontFamily={fonts.Poppins_SemiBold}>{"Maize"}</ResponsiveText>
                            </View>
                            <ResponsiveText size="h7" margin={[0, 0, 0, 5]} fontFamily={fonts.Poppins_SemiBold}>{"GH₵/MT"}</ResponsiveText>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 7 }}>
                            <ResponsiveText size="h6" margin={[0, 0, 0, 5]}>{"GWAYM1"}</ResponsiveText>

                            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                                    style={{ paddingRight: 0, paddingTop: 3, transform: [{ translateX: -15 }] }}
                                />

                                <View style={{ alignItems: "flex-end" }}>
                                    <ResponsiveText size="h6" color={Colors.greenColor}>{"2000"}</ResponsiveText>
                                    <ResponsiveText size="h8" color={Colors.greenColor} margin={[-4, 0, 0, 0]}>{"+10%"}</ResponsiveText>
                                </View>
                            </View>

                        </View>


                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 7 }}>
                            <ResponsiveText size="h6" margin={[0, 0, 0, 5]}>{"GWAYM1"}</ResponsiveText>

                            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                                    style={{ paddingRight: 0, paddingTop: 3, transform: [{ translateX: -20 }] }}
                                />

                                <View style={{ alignItems: "flex-end" }}>
                                    <ResponsiveText size="h6" color={"#DB1222"}>{"1875"}</ResponsiveText>
                                    <ResponsiveText size="h8" color={"#DB1222"} margin={[-4, 0, 0, 0]}>{"-3.8%"}</ResponsiveText>
                                </View>
                            </View>

                        </View>

                        <View style={{backgroundColor:"#D8D8D8", height:1.5, width:"90%", alignSelf:"center", marginTop:18}}>
                        </View>
                    </View>


                )} />



        </View>
    )
}
export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.white,
        // justifyContent: "center",
        // alignItems: "center"
    }
})
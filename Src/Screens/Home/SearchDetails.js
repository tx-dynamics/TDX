import React, { useState, useEffect } from 'react'
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

import { useSelector, useDispatch } from 'react-redux';

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
    { id: "1", coinName: "GWAYM1", type: "green", value: "2000", percent: "+10%" },
    { id: "2", coinName: "GWAYM2", type: "red", value: "1875", percent: "-3.8%" },
    { id: "3", coinName: "GWAYM3", type: "green", value: "2000", percent: "+10%" },
    { id: "4", coinName: "GWAYM4", type: "red", value: "1875", percent: "-3.8%" },
    { id: "5", coinName: "GWAYM5", type: "green", value: "2000", percent: "+10%" },
    { id: "6", coinName: "GWAYM6", type: "green", value: "2000", percent: "+10%" },

]

const SearchDetails = (props) => {

    const dispatch = useDispatch();

    const [DropDownItem, setDropDownItem] = useState('')
    const [selectedBtn, setSelectedBtn] = useState("Open")
    const [searchedData, setSearchedData] = useState("Open")

    const current_currency_rate = useSelector(state => state.HomeReducer.current_currency_rate);


    useEffect(() => {
        // alert(JSON.stringify(props.route?.params?.allData[0].tickers))
        setSearchedData(props.route?.params?.allData[0])
    }, [])

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                right RightIconType={"Entypo"} RightIconName={"cross"}
                leftPress={() => props.navigation.goBack()}
                RightPress={() => props.navigation.goBack()} />


            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: wp(4), marginTop: wp(4) }}>
                <Image source={{ uri: props.route?.params?.allData[0]?.image_url }} style={{ width: wp(13), height: wp(13), resizeMode: "contain" }} />
                <View style={{ marginLeft: 5 }}>
                    <ResponsiveText size="h5" margin={[0, 0, 0, 0]} >{props.route?.params?.allData[0]?.title}</ResponsiveText>
                    {/* <ResponsiveText size="h7" margin={[-6, 0, 0, 0]}>{"Warehouse - W9"}</ResponsiveText> */}
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: Colors.TextInputBackgroundColor, marginTop: wp(6) }}>

                <View style={{ width: "100%", alignItems: "flex-end", marginTop: wp(3), paddingRight: wp(4) }}>
                    <ResponsiveText size="h8" fontFamily={fonts.Poppins_SemiBold} margin={[0, 0, 0, 0]}>{"Price/MT"}</ResponsiveText>
                </View>

                <FlatList
                    data={props.route?.params?.allData[0].tickers}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ marginTop: wp(0), backgroundColor: Colors.TextInputBackgroundColor }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (

                        <View style={{ padding: wp(4), paddingBottom: wp(2), backgroundColor: Colors.TextInputBackgroundColor, }}>

                            <Pressable onPress={() => props.navigation.navigate("AssetsDetails", { tickerId: item?.id, marketID: props.route?.params?.allData[0]?.id })}
                                style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 7 }}>
                                <ResponsiveText size="h8" margin={[0, 0, 0, 5]}>{item?.ticker}</ResponsiveText>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    {item?.chartData[0]?.price !== undefined &&
                                        <LineChart
                                            data={{
                                                datasets: [
                                                    {
                                                        data: item?.chartData?.map((itemm) => {
                                                            return (
                                                                parseInt(itemm?.price)
                                                            )
                                                        })
                                                    }
                                                ]
                                            }}
                                            width={wp(30)} // from react-native
                                            height={wp(11)}
                                            withHorizontalLabels={false}
                                            flatColor={true}
                                            chartConfig={{
                                                backgroundGradientFromOpacity: 0,
                                                backgroundGradientToOpacity: 0,
                                                color: (opacity = 1) => item?.trend >= 0 ? Colors.greenColor : Colors.redColor,
                                                propsForDots: { r: "0" },
                                                propsForBackgroundLines: { stroke: "#CCCCCC33" }
                                            }}
                                            bezier
                                            style={{ paddingRight: 0, paddingTop: 3, transform: [{ translateX: -15 }] }}
                                        />
                                    }

                                    <View style={{ alignItems: "flex-end" }}>
                                        <ResponsiveText size="h8" color={item?.trend >= 0 ? Colors.greenColor : Colors.redColor}>{parseFloat(item?.price * current_currency_rate).toFixed(1)}</ResponsiveText>
                                        <ResponsiveText size="h10" color={item?.trend >= 0 ? Colors.greenColor : Colors.redColor} margin={[-4, 0, 0, 0]}>{"" + item.trend + " %"}</ResponsiveText>
                                    </View>
                                </View>




                                {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <LineChart
                                        data={item.type === "green" ? Greendata : Reddata}
                                        width={wp(30)} // from react-native
                                        height={wp(11)}
                                        withHorizontalLabels={false}
                                        flatColor={true}
                                        chartConfig={{
                                            backgroundGradientFromOpacity: 0,
                                            backgroundGradientToOpacity: 0,
                                            color: (opacity = 1) => item.type === "green" ? Colors.greenColor : "#DB1222",
                                            propsForDots: { r: "0" },
                                            propsForBackgroundLines: { stroke: "#CCCCCC33" }
                                        }}
                                        bezier
                                        style={{ paddingRight: 0, paddingTop: 3, transform: [{ translateX: -15 }] }}
                                    />

                                    <View style={{ alignItems: "flex-end" }}>
                                        <ResponsiveText size="h8" color={item.type === "green" ? Colors.greenColor : "#DB1222"}>{item.value}</ResponsiveText>
                                        <ResponsiveText size="h10" color={item.type === "green" ? Colors.greenColor : "#DB1222"} margin={[-4, 0, 0, 0]}>{item.percent}</ResponsiveText>
                                    </View>
                                </View> */}

                            </Pressable>



                        </View>


                    )} />
            </View>

        </View>
    )
}
export default SearchDetails;
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
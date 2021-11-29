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
    { id: "1", coinName:"GWAYM1", type:"green" , value:"2000", percent:"+10%" },
    { id: "2", coinName:"GWAYM2", type:"red" , value:"1875", percent:"-3.8%" },
    { id: "3", coinName:"GWAYM3", type:"green" , value:"2000", percent:"+10%" },
    { id: "4", coinName:"GWAYM4", type:"red" , value:"1875", percent:"-3.8%" },
    { id: "5", coinName:"GWAYM5", type:"green" , value:"2000", percent:"+10%" },
    { id: "6", coinName:"GWAYM6", type:"green" , value:"2000", percent:"+10%" },

]



const Alerts = (props) => {

    const [DropDownItem, setDropDownItem] = useState('')
    const [selectedBtn, setSelectedBtn] = useState("Open")

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Alerts"}
                leftPress={() => props.navigation.goBack()} />


            <FlatList
                data={DATA}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: wp(5) }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (

                    <View style={{ padding: wp(4), paddingBottom: wp(2) }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 7 }}>
                            <ResponsiveText size="h8" margin={[0, 0, 0, 5]}>{item.coinName}</ResponsiveText>

                            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                                    <ResponsiveText size="h8" color={item.type === "green" ? Colors.greenColor : "#455154"}>{item.value}</ResponsiveText>
                                    <ResponsiveText size="h10" color={item.type === "green" ? Colors.greenColor : "#455154"} margin={[-4, 0, 0, 0]}>{item.percent}</ResponsiveText>
                                </View>
                            </View>

                        </View>


                     
                    </View>


                )} />
        </View>
    )
}
export default Alerts;
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
import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Modal, ScrollView, FlatList, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import InputField from '../../Components/InputField';

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
    { id: "1", coinName: "Maize", dot: true },
    { id: "2", coinName: "Soya Bean", dot: false },
    { id: "3", coinName: "Rice", dot: true },
    { id: "4", coinName: "Sesame", dot: false },
    { id: "5", coinName: "Sorghum", dot: false },
]

const FilterDate = [
    { id: "1", title: "Grade" },
    { id: "2", title: "commodity" },
    { id: "3", title: "Warehouse" },
]

const HomeScreen = (props) => {

    const [filterModal, setFilterModal] = useState(false)
    const [filterApply, setFilterApply] = useState('Grade')


    const applyFilter = async (item) => {
        await setFilterApply(item.title)
        if (item.title !== "commodity") {
            setFilterModal(false)
        }
    }

    const applyFilterCom = () => {
        setFilterApply("commodity")
        setFilterModal(false)
    }


    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.drawerIcon}
                midImage right RightIconType={"Ionicons"} RightIconName={"search"}
                leftPress={() => props.navigation.openDrawer()}
                RightPress={() => props.navigation.navigate("SearchScreen")}
                imageWidth={wp(13)}
                imageHeight={wp(13)}
            />
            <View style={{ paddingHorizontal: wp(4), marginTop: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={iconPath.marketIcon} style={{ width: wp(5), height: wp(5), resizeMode: "contain" }} />
                    <ResponsiveText size="h6" margin={[0, 0, 0, 10]} fontFamily={fonts.Poppins_SemiBold}>{"Markets"}</ResponsiveText>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: wp(3) }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ backgroundColor: "#CCCCCC", paddingHorizontal: wp(5), borderRadius: 20, height: wp(7), justifyContent: "center" }}>
                            <ResponsiveText size="h8" color={Colors.white} >{filterApply === "commodity" ? "Commodity" : "All"}</ResponsiveText>
                        </View>
                        <View style={{ backgroundColor: "#CCCCCC", paddingHorizontal: wp(5), borderRadius: 20, marginLeft: 8, height: wp(7), justifyContent: "center" }}>
                            <Image source={iconPath.greenEye} style={{ width: wp(4.5), height: wp(4.5), resizeMode: "contain" }} />
                        </View>
                    </View>
                    <Pressable onPress={() => setFilterModal(true)}>
                        <Image source={iconPath.homeFilter} style={{ width: wp(6.5), height: wp(6.5), resizeMode: "contain" }} />
                    </Pressable>
                </View>
            </View>

            <FlatList
                data={DATA}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: wp(3.5) }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (

                    <Pressable onPress={() => props.navigation.navigate("AssetsDetails")}
                        style={{ backgroundColor: "#CCCCCC33", padding: wp(4), paddingBottom: wp(2) }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={iconPath.coin1} style={{ width: wp(7), height: wp(7), resizeMode: "contain" }} />
                                <ResponsiveText size="h6" margin={[0, 0, 0, 5]} fontFamily={fonts.Poppins_SemiBold}>{"Maize"}</ResponsiveText>
                            </View>
                            <ResponsiveText size="h9" margin={[0, 0, 0, 5]} fontFamily={fonts.Poppins_SemiBold}>{"GH₵/MT"}</ResponsiveText>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 7 }}>
                            <ResponsiveText size="h8" margin={[0, 0, 0, 5]}>{"GWAYM1"}</ResponsiveText>

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
                                    <ResponsiveText size="h8" color={Colors.greenColor}>{"2000"}</ResponsiveText>
                                    <ResponsiveText size="h10" color={Colors.greenColor} margin={[-4, 0, 0, 0]}>{"+10%"}</ResponsiveText>
                                </View>
                            </View>

                        </View>


                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 7 }}>
                            <ResponsiveText size="h8" margin={[0, 0, 0, 5]}>{"GWAYM1"}</ResponsiveText>

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
                                    <ResponsiveText size="h8" color={"#DB1222"}>{"1875"}</ResponsiveText>
                                    <ResponsiveText size="h10" color={"#DB1222"} margin={[-4, 0, 0, 0]}>{"-3.8%"}</ResponsiveText>
                                </View>
                            </View>

                        </View>
                        {item.dot &&
                            <Image source={iconPath.threeHorizontalDots} style={{ width: wp(10), height: wp(8), resizeMode: "contain" }} />
                        }
                        {index === DATA.length - 1 ?
                            <View style={{ backgroundColor: "transparent", height: 1.5, width: "98%", alignSelf: "center", marginTop: 18 }}>
                            </View>
                            :
                            <View style={{ backgroundColor: "#D8D8D8", height: 1.5, width: "98%", alignSelf: "center", marginTop: 18 }}>
                            </View>}
                    </Pressable>
                )} />


            <Modal
                transparent={true}
                animationType={'none'}
                // visible={true}
                visible={filterModal}
                onRequestClose={() => { setFilterModal(false) }}>
                <Pressable
                    onPress={() => setFilterModal(false)}
                    style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium} padding={[0, 0, 0, wp(1)]}>{"Filters:"}</ResponsiveText>
                        <View style={{ marginTop: wp(5), paddingBottom: wp(6) }}>
                            <ScrollView horizontal>
                                {FilterDate.map((item, index) =>
                                    <Pressable onPress={() => applyFilter(item)}
                                        style={{
                                            backgroundColor: filterApply === "commodity" ? index === 1 ? "#fff" : "#CCCCCC" : "#CCCCCC", marginLeft: index === 0 ? wp(2) : wp(4), paddingVertical: wp(2), paddingHorizontal: wp(4), borderRadius: 7,
                                            borderColor: Colors.greenColor, borderWidth: filterApply === "commodity" ? index === 1 ? 1 : 0 : 0
                                        }}>
                                        <ResponsiveText size="h9" padding={[0, 0, 0, 0]}>{item.title}</ResponsiveText>
                                    </Pressable>
                                )}
                            </ScrollView>
                            {filterApply === "commodity" &&
                                <>
                                    <View style={{ paddingHorizontal: wp(2), paddingTop: wp(5), paddingBottom: wp(10) }}>
                                        <InputField
                                            placeholder={" + add commoditiy"}
                                            placeholderTextColor={"#D0D0D0"}
                                        // value={password}
                                        // onChangeText={(password) => setPassword(password)}
                                        />
                                    </View>
                                    <Pressable onPress={() => applyFilterCom()}
                                        style={{ backgroundColor: Colors.greenColor, paddingHorizontal: wp(7), paddingVertical: wp(2.5), borderRadius: 11, alignSelf: "flex-end", marginRight: wp(2) }}>
                                        <ResponsiveText size="h9" padding={[0, 0, 0, 0]} color={"#fff"}>{"Apply"}</ResponsiveText>
                                    </Pressable>
                                </>
                            }
                        </View>
                    </View>
                </Pressable>
            </Modal>


        </View>
    )
}
export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    anchorStyle: {
        backgroundColor: 'blue',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: '#CCCCCC90',
        paddingHorizontal: wp(4)
    },
    activityIndicatorWrapper: {
        backgroundColor: "white",
        // height: wp(40),
        width: "100%",
        borderRadius: 10,
        marginTop: wp(30),
        padding: 5
    }
})
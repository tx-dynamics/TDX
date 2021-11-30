import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Modal, FlatList, Pressable } from 'react-native'

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
    { id: "6", title: "1 Y" },
    { id: "7", title: "All" },
]
const DayDATA1 = [
    { id: "1", title: "1/10" },
    { id: "2", title: "2/10" },
    { id: "3", title: "3/10" },
    { id: "4", title: "4/10" },
    { id: "5", title: "5/10" },
    { id: "6", title: "6/10" },
    { id: "7", title: "7/10" },
    { id: "8", title: "8/10" },
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
    const [filterModal, setFilterModal] = useState(false)
    const [alertModal, setAlertModal] = useState(false)

    const openAlertModal = () => {
        setFilterModal(false)
        setAlertModal(true)
    }

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
                    <Pressable onPress={() => setFilterModal(true)}>
                        <Image source={iconPath.threeVerticalDot} style={{ width: wp(7), height: wp(7), resizeMode: "contain", marginRight: -5 }} />
                    </Pressable>
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

                    <View style={{ paddingHorizontal: wp(4), marginTop: wp(-4), marginBottom: wp(6) }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {DayDATA1.map((item, index) =>
                                <Pressable style={{ marginLeft: index === 0 ? 0 : wp(2), width: 41, }}>
                                    <ResponsiveText size="h9" margin={[0, 0, 0, 0]}>{item.title}</ResponsiveText>
                                </Pressable>
                            )}
                        </ScrollView>
                    </View>

                    <View style={{ paddingHorizontal: wp(4) }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {DayDATA.map((item, index) =>
                                <Pressable style={{ marginLeft: index === 0 ? 0 : wp(4), backgroundColor: "#00000033", width: 41, alignItems: "center", height: 31, justifyContent: "center", borderRadius: 15 }}>
                                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{item.title}</ResponsiveText>
                                </Pressable>
                            )}
                        </ScrollView>
                    </View>

                </View>

                <View style={{
                    backgroundColor: Colors.TextInputBackgroundColor, paddingHorizontal: wp(4), justifyContent: "space-between",
                    marginVertical: wp(6), paddingVertical: wp(4), flexDirection: "row", alignItems: "center"
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
                    <View style={{ width: "49%", }}>
                        <Button
                            onPress={() => props.navigation.navigate('TradeScreenn')}
                            Text={'BUY'}
                            height={45}
                            backgroundColor={"#019146"}
                        />
                    </View>
                    <View style={{ width: "49%" }}>
                        <Button
                            onPress={() => props.navigation.navigate('TradeScreenn')}
                            Text={'SELL'}
                            height={45}
                            backgroundColor={"#DB1222"}
                        />
                    </View>
                </View>

            </ScrollView>

            <Modal
                transparent={true}
                animationType={'none'}
                // visible={true}
                visible={filterModal}
                onRequestClose={() => { setFilterModal(false) }}>
                <Pressable
                    onPress={() => setFilterModal(false)}
                    style={styles.modalBackground}>
                    <View style={[styles.activityIndicatorWrapper, { padding: 0 }]}>
                        <Pressable onPress={() => setFilterModal(false)}
                            style={{ flexDirection: "row", paddingHorizontal: wp(3), marginLeft: 5 }}>
                            <Image source={iconPath.passwordUnhide} style={{ width: wp(5), height: wp(5), resizeMode: "contain" }} />
                            <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium} padding={[0, 0, 0, wp(2)]}>{"Add to watch list"}</ResponsiveText>
                        </Pressable>
                        <View style={{ height: .5, backgroundColor: "#000", marginVertical: wp(3) }} />
                        <Pressable onPress={() => openAlertModal()}
                            style={{ flexDirection: "row", paddingHorizontal: wp(3), marginLeft: 5 }}>
                            <Image source={iconPath.alerts} style={{ width: wp(4), height: wp(4), resizeMode: "contain" }} />
                            <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium} padding={[0, 0, 0, wp(2.5)]}>{"Set an alert"}</ResponsiveText>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>

            <Modal
                transparent={true}
                animationType={'none'}
                visible={alertModal}
                onRequestClose={() => { setAlertModal(false) }}>
                <Pressable
                    onPress={() => setAlertModal(false)}
                    style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <Pressable style={{ flexDirection: "row", paddingHorizontal: wp(3) }}>
                            <Image source={iconPath.alerts} style={{ width: wp(4), height: wp(4), resizeMode: "contain" }} />
                            <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium} padding={[0, 0, 0, wp(2.5)]}>{"Set an alert"}</ResponsiveText>
                        </Pressable>

                        <View style={{ paddingHorizontal: wp(2), paddingTop: wp(3), paddingBottom: wp(10), }}>
                            <View style={{ borderWidth: .8, borderColor: "#DADADA", borderRadius: 11 }}>
                                <InputField
                                    placeholder={"Set an alert price"}
                                    placeholderTextColor={"#CACACA"}
                                    backgroundColor={"#fff"}
                                />
                            </View>
                        </View>
                        <Pressable onPress={() => setAlertModal(false)}
                            style={{ backgroundColor: Colors.greenColor, paddingHorizontal: wp(7), paddingVertical: wp(2.5), borderRadius: 11, alignSelf: "flex-end", marginRight: wp(2) }}>
                            <ResponsiveText size="h9" padding={[0, 0, 0, 0]} color={"#fff"}>{"Apply"}</ResponsiveText>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>


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
        marginTop: wp(19),
        padding: 5,
        paddingVertical: wp(5)
    }

})
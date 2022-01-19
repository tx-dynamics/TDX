import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Modal, ScrollView, FlatList, Pressable } from 'react-native'

import { useFocusEffect } from '@react-navigation/native';
import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Loader from '../../Components/Loader';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import InputField from '../../Components/InputField';
import { MARKET_DATA_LOADING } from '../../Redux/Constants'
import { useSelector, useDispatch } from 'react-redux';
import { _getMarketData, _getAllWatchList, _sendPushNotification } from '../../Redux/Actions/Actions';

import { firebase } from '@react-native-firebase/messaging';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { _axiosPostAPI } from '../../Apis/Apis';

import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine } from "victory-native";

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
    { id: "2", title: "Commodity" },
    { id: "3", title: "Warehouse" },
]

const HomeScreen = (props) => {

    const dispatch = useDispatch();

    const [marketDataa, setMarketDataa] = useState([])
    const [expandedIndexes, setExpandedIndexes] = useState([])
    const [filterModal, setFilterModal] = useState(false)
    const [filterApply, setFilterApply] = useState('')
    const [filter_value, setFilter_value] = useState('')
    const [CommodityValue, setCommodityValue] = useState('')
    const [activeButton, setActiveButton] = useState('all')
    const [CommodityValueError, setCommodityValueError] = useState(false)
    const [GradeDropDownValue, setGradeDropDownValue] = useState('1')
    const [WarehouseDropDownValue, setWarehouseDropDownValue] = useState('W9')

    const userToken = useSelector(state => state.AuthReducer.userToken);
    const Market_Loading = useSelector(state => state.HomeReducer.Market_Loading);
    const marketData = useSelector(state => state.HomeReducer.marketData);
    const WatchListMarkets = useSelector(state => state.HomeReducer.WatchListMarkets);

    useEffect(() => {
        // dispatch({ type: MARKET_DATA_LOADING, payload: true });
        // console.log("Token::::: ", userToken)
        // getMarketData()
        setMarketDataa(marketData?.markets)
    }, [marketData])

    useEffect(() => {
        getWatchlistMarkets()
        Fcm()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            getMarketData()
        }, [])
    );

    const Fcm = async () => {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
        } else {
            try {
                await firebase.messaging().requestPermission();
            } catch (error) {
            }
        }
        const fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            console.log(userToken)
            let data = {}
            data["token"] = userToken;
            data["push_token"] = fcmToken;
            // console.log(data)
            dispatch(_sendPushNotification('store_push_token', data))
        } else {
            console.warn('no token');
        }
    }

    const getMarketData = async () => {

        let data = {}
        let data1 = {}
        data1["searching"] = false;
        data1["filtering"] = false;
        data["token"] = userToken;
        data["search"] = data1;
        data["limit"] = 30;
        data["page"] = 1;
        await dispatch(_getMarketData('get_markets', data))
        setActiveButton('all')
        // alert(JSON.stringify(marketData.more_available))
    }

    const setWatchListData = async () => {
        setMarketDataa(WatchListMarkets)
        setActiveButton('eye')
    }

    const getWatchlistMarkets = async () => {
        let data = {}
        data["token"] = userToken;
        await dispatch(_getAllWatchList('get_watchlist', data))
    }

    const getFilteredData = async (filter, filter_Value) => {
        let data = {}
        let data1 = {}

        data1["searching"] = true;
        data1["search_text"] = filter_Value;
        data1["filtering"] = false;
        data1["filter_type"] = '';
        data1["filter_value"] = '';
        data["token"] = userToken;
        data["search"] = data1;
        data["filters"] = [];
        data["selling"] = 0;
        data["limit"] = 30;
        data["page"] = 1;
        // console.log(data)
        await dispatch(_getMarketData('get_markets', data))
        setCommodityValue('')
    }

    const getFilteredDataFilter = async (filter) => {
        let data = {}
        let data1 = {}
        data1["searching"] = false;
        data1["filtering"] = false;
        data["token"] = userToken;
        data["search"] = data1;
        data["filters"] = [filter];
        data["limit"] = 30;
        data["page"] = 1;
        await dispatch(_getMarketData('get_markets', data))

        // alert(JSON.stringify(data))
    }

    const applyFilter = async (item) => {
        await setFilterApply(item.title)
        if (item.title !== "Commodity") {
            setFilterModal(false)
            getFilteredDataFilter(item.title)
        }
    }

    const applyFilterCom = () => {
        setCommodityValueError(false)
        if (CommodityValue === '') {
            setCommodityValueError(true)
        } else {
            getFilteredData("Commodity", CommodityValue)
            setFilterModal(false)
            setFilterApply('')
        }
    }

    const addIndexExpand = (index) => {
        var selectedIdss = [...expandedIndexes]
        selectedIdss.push(index)
        setExpandedIndexes(selectedIdss)
        // alert(selectedIdss)
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
                        {/* {filterApply === "Commodity" ?
                            <Pressable style={{ backgroundColor: "#CCCCCC", paddingHorizontal: wp(5), borderRadius: 20, height: wp(7), justifyContent: "center" }}>
                                <ResponsiveText size="h8" color={Colors.white} >{"Commodity"}</ResponsiveText>
                            </Pressable>
                            : */}
                            <Pressable onPress={() => getMarketData()}
                                style={{ backgroundColor: activeButton === 'all'? Colors.greenColor : "#CCCCCC", paddingHorizontal: wp(5), borderRadius: 20, height: wp(7), justifyContent: "center" }}>
                                <ResponsiveText size="h8" color={Colors.white} >{"All"}</ResponsiveText>
                            </Pressable>
                        {/* } */}

                        <Pressable onPress={() => { getWatchlistMarkets(), setWatchListData() }}
                            style={{ backgroundColor: activeButton === 'eye'? Colors.greenColor: "#CCCCCC", paddingHorizontal: wp(5), borderRadius: 20, marginLeft: 8, height: wp(7), justifyContent: "center" }}>
                            <Image source={activeButton === 'eye'? iconPath.whiteEye : iconPath.greenEye} style={{ width: wp(4.5), height: wp(4.5), resizeMode: "contain" }} />
                        </Pressable>
                    </View>
                    <Pressable onPress={() => setFilterModal(true)}>
                        <Image source={iconPath.homeFilter} style={{ width: wp(6.5), height: wp(6.5), resizeMode: "contain" }} />
                    </Pressable>
                </View>
            </View>

            <FlatList
                data={marketDataa}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: wp(3.5) }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ResponsiveText size="h6" fontFamily={fonts.Poppins_SemiBold} margin={[wp(5), 0, 0, 0]}>{"No Data Found"}</ResponsiveText>
                    </View>
                }
                renderItem={({ item, index }) => (

                    <Pressable style={{ backgroundColor: "#CCCCCC33", padding: wp(4), paddingBottom: wp(2) }}>

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={{ uri: item.image_url }} style={{ width: wp(7), height: wp(7), resizeMode: "contain" }} />
                                <ResponsiveText size="h6" margin={[0, 0, 0, 5]} fontFamily={fonts.Poppins_SemiBold}>{item.title}</ResponsiveText>
                            </View>
                            <ResponsiveText size="h9" margin={[0, 0, 0, 5]} fontFamily={fonts.Poppins_SemiBold}>{item.pair}</ResponsiveText>
                        </View>

                        {item?.tickers?.slice(0, expandedIndexes.includes(index) ? item?.tickers?.length : 2).map((cardData, indx) =>
                            <Pressable onPress={() => props.navigation.navigate("AssetsDetails", { tickerId: cardData.id, marketID: item.id })}
                                style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 7, }}>
                                <ResponsiveText size="h8" margin={[0, 0, 0, 5]}>{cardData.ticker}</ResponsiveText>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    {cardData?.chartData[0]?.price !== undefined &&
                                        <LineChart
                                            data={{
                                                datasets: [
                                                    {
                                                        data: cardData?.chartData?.map((itemm) => {
                                                            return (
                                                                parseInt(itemm.price)
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
                                                color: (opacity = 1) => cardData.trend >= 0 ? Colors.greenColor : Colors.redColor,
                                                propsForDots: { r: "0" },
                                                propsForBackgroundLines: { stroke: "#CCCCCC33" }
                                            }}
                                            bezier
                                            style={{ paddingRight: 0, paddingTop: 3, transform: [{ translateX: -15 }] }}
                                        />
                                    }

                                    <View style={{ alignItems: "flex-end" }}>
                                        <ResponsiveText size="h8" color={cardData.trend >= 0 ? Colors.greenColor : Colors.redColor}>{parseFloat(cardData.price).toFixed(1)}</ResponsiveText>
                                        <ResponsiveText size="h10" color={cardData.trend >= 0 ? Colors.greenColor : Colors.redColor} margin={[-4, 0, 0, 0]}>{"" + cardData.trend + " %"}</ResponsiveText>
                                    </View>
                                </View>
                            </Pressable>

                        )}
                        {!expandedIndexes.includes(index) &&
                            item?.tickers?.length > 2 &&
                            <Pressable
                                onPress={() => addIndexExpand(index)}
                            >
                                <Image source={iconPath.threeHorizontalDots} style={{ width: wp(10), height: wp(8), resizeMode: "contain" }} />
                            </Pressable>
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
                    <Pressable style={[styles.activityIndicatorWrapper]}>
                        <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium} padding={[0, 0, 0, wp(1)]}>{"Filters:"}</ResponsiveText>
                        <View style={{ marginTop: wp(5), paddingBottom: wp(6), }}>
                            <ScrollView horizontal>
                                {FilterDate.map((item, index) =>
                                    <Pressable onPress={() => applyFilter(item)}
                                        style={{
                                            backgroundColor: filterApply === "Commodity" ? index === 1 ? "#fff" : "#CCCCCC" : "#CCCCCC", marginLeft: index === 0 ? wp(2) : wp(4), paddingVertical: wp(2), paddingHorizontal: wp(4), borderRadius: 7,
                                            borderColor: Colors.greenColor, borderWidth: filterApply === "Commodity" ? index === 1 ? 1 : 0 : 0
                                        }}>
                                        <ResponsiveText size="h9" padding={[0, 0, 0, 0]}>{item.title}</ResponsiveText>
                                    </Pressable>
                                )}
                            </ScrollView>
                            {filterApply === "Commodity" &&
                                <>
                                    <View style={{ paddingHorizontal: wp(2), paddingTop: wp(5), paddingBottom: wp(10) }}>
                                        <InputField
                                            placeholder={" + add commoditiy"}
                                            placeholderTextColor={"#D0D0D0"}
                                            value={CommodityValue}
                                            onChangeText={(text) => setCommodityValue(text)}
                                        />
                                        {CommodityValueError ?
                                            <Text style={{ color: 'red', fontSize: 13, marginLeft: 12, textAlign: 'center', marginTop: 0, fontFamily: fonts.Poppins }}>
                                                {"Please Enter Commodity Name"}
                                            </Text>
                                            :
                                            <Text style={{ color: 'red', fontSize: 13, marginLeft: 12, textAlign: 'center', marginTop: 0, fontFamily: fonts.Poppins }}> {""}</Text>
                                        }
                                    </View>
                                    <Pressable onPress={() => applyFilterCom()}
                                        style={{ backgroundColor: Colors.greenColor, paddingHorizontal: wp(7), paddingVertical: wp(2.5), borderRadius: 11, alignSelf: "flex-end", marginRight: wp(2) }}>
                                        <ResponsiveText size="h9" padding={[0, 0, 0, 0]} color={"#fff"}>{"Apply"}</ResponsiveText>
                                    </Pressable>
                                </>
                            }

                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
            <Loader loading={Market_Loading} />

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
    },
    dropDown_dropDownStyle: {
        width: wp(85.2),
        borderWidth: 1,
        height: wp(26),

        // marginLeft: wp(0),
        borderRadius: 11,
        // paddingTop: 8,
        borderTopWidth: .1,
        elevation: .5,
        // height: wp(30),
    },
    dropDown_textStyle: {
        fontSize: 15,
        color: "#6F7074",
        fontFamily: fonts.Poppins,
        paddingLeft: wp(4),
        // backgroundColor: Colors.TextInputBackgroundColor

    },
    dropDown: {
        height: 50,
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: Colors.TextInputBackgroundColor
    },
})
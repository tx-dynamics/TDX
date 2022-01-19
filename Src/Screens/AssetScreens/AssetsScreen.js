import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';

import { useSelector, useDispatch } from 'react-redux';

import { _getAssets, _removeNotification } from '../../Redux/Actions/Actions';

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

    const dispatch = useDispatch();

    const [Notificationss, setNotificationss] = useState([])
    const [cash_balance, setCash_balance] = useState('')
    const [currency_iso, setCurrency_iso] = useState('')
    const [totalStock, setTotalStock] = useState('')
    const [totalQuantity, setTotalQuantity] = useState('')
    const [totalPrice, setTotalPrice] = useState('')
    const [AlertsState, setAlertsState] = useState([])
    const [TickersState, setTickersState] = useState([])
    const [StockMarkets, setStockMarkets] = useState([])


    const userToken = useSelector(state => state.AuthReducer.userToken);
    const AssetsDetails = useSelector(state => state.HomeReducer.AssetsDetails);
    const Alertss = useSelector(state => state.HomeReducer.Alertss);


    useEffect(() => {
        setAlertsState(Alertss)
    }, [Alertss])

    useEffect(() => {
        getUserAssets()
    }, [])

    useEffect(() => {
        if ((AssetsDetails !== "" || AssetsDetails !== undefined)) {
            setCash_balance(AssetsDetails?.cash_balance)
            setCurrency_iso(AssetsDetails?.currency_iso)
            setTotalStock(AssetsDetails?.total_stocks)
            setTickerValue()
            setTotalValues()
        }
    }, [AssetsDetails])

    const setTotalValues = async () => {
        let totalQuantity = []
        let totalPrice = []
        AssetsDetails?.stocks?.map((item) => {
            let PriceCount = 0
            let QtyCount = 0
            item?.tickers?.map((itemm) => {
                PriceCount = PriceCount + parseFloat(itemm?.price)
                QtyCount = QtyCount + parseFloat(itemm?.my_stocks?.qty)
            })
            totalPrice.push(PriceCount)
            totalQuantity.push(QtyCount)
        })
        setTotalQuantity(totalQuantity)
        setTotalPrice(totalPrice)
    }

    const setTickerValue = async () => {
        if (AssetsDetails?.stocks?.length !== undefined) {
            if (AssetsDetails?.stocks?.length > 0) {
                setStockMarkets(AssetsDetails?.stocks)
                // alert(JSON.stringify(checkUI[1]))
            }
        }
    }

    const getUserAssets = async () => {
        let data = {}
        data["token"] = userToken;
        await dispatch(_getAssets('get_assets', data))
    }

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

            <View style={styles.cashBalance}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <ResponsiveText size="h6" fontFamily={fonts.Poppins_SemiBold} color={"#FDBD20"}>{"Cash Balance"}</ResponsiveText>
                        <ResponsiveText size="h9" margin={[0, 0, 0, 8]} color={"#000"}>{currency_iso}</ResponsiveText>
                    </View>
                    {/* <Fonticon type={"MaterialIcons"} name={"info"} size={wp(6)} color={"#000"} /> */}
                </View>

                <ResponsiveText size="h6" fontFamily={fonts.Poppins_Bold} color={"#000"}>{cash_balance}</ResponsiveText>

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


            <View style={styles.totalStock}>
                <ResponsiveText size="h7" color={"#000"}>{"Total Stock"}</ResponsiveText>

                <View style={{ flexDirection: "row" }}>
                    <View style={{ alignItems: "center" }}>
                        <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium} color={"#000"}>{"Quantity (MT)"}</ResponsiveText>
                        <ResponsiveText size="h9" margin={[3, 0, 0, 0]} color={"#000"}>{totalStock}</ResponsiveText>
                    </View>
                    <View style={{ alignItems: "center", marginLeft: wp(5) }}>
                        <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium} color={"#000"}>{"GH₵ Value"}</ResponsiveText>
                        <ResponsiveText size="h9" margin={[3, 0, 0, 0]} color={"#000"}>{'0'}</ResponsiveText>
                    </View>
                </View>
            </View>
            {/* StockMarkets */}


            <FlatList
                data={StockMarkets}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: wp(3.5) }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ResponsiveText size="h6" fontFamily={fonts.Poppins_SemiBold} margin={[wp(5), 0, 0, 0]}>{"No Data Found"}</ResponsiveText>
                    </View>
                }
                renderItem={({ item, index }) => (

                    <Pressable
                        style={{ backgroundColor: "#CCCCCC33", paddingVertical: wp(4), paddingHorizontal: wp(3), paddingBottom: wp(2), marginBottom: 20 }}>


                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={{ uri: item?.market?.image_url }} style={{ width: wp(8), height: wp(8), resizeMode: "contain" }} />
                                <ResponsiveText size="h6" margin={[0, 0, 0, 5]} fontFamily={fonts.Poppins_SemiBold}>{item?.market?.title}</ResponsiveText>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: wp(6), }}>
                            <View style={{ flex: .19, alignItems: "flex-start" }}>
                                <ResponsiveText size="h9">{"Ticker"}</ResponsiveText>
                            </View>
                            <View style={{ flex: .26, alignItems: "center" }}>
                                <ResponsiveText size="h9">{"Quantity (MT)"}</ResponsiveText>
                            </View>
                            <View style={{ flex: .3 }}>
                            </View>
                            <View style={{ flex: .25, alignItems: "flex-end" }}>
                                <ResponsiveText size="h9">{"GH₵/MT"}</ResponsiveText>
                            </View>
                        </View>

                        {item?.tickers?.reverse()?.map((cardData) =>
                            <Pressable onPress={() => props.navigation.navigate("AssetsDetails", { tickerId: cardData.id, marketID: item.id })}
                                style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 7, }}>
                                {/* <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{cardData.ticker}</ResponsiveText> */}
                                <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{cardData?.ticker}</ResponsiveText>
                                <ResponsiveText size="h8" margin={[0, 0, 0, wp(-12)]}>{cardData?.my_stocks?.qty}</ResponsiveText>

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

                        <View style={{ backgroundColor: "#D8D8D8", height: 1.5, width: "60%", alignSelf: "center", marginVertical: 18 }} />
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: .19, alignItems: "flex-start" }}>
                                <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium} margin={[0, 0, wp(6), 0]}>{"Total"}</ResponsiveText>
                            </View>
                            <View style={{ flex: .26, alignItems: "center" }}>
                                <ResponsiveText size="h9" margin={[0, 0, wp(5), 0]}>{parseFloat(totalQuantity[index]).toFixed(2)}</ResponsiveText>
                            </View>
                            <View style={{ flex: .3 }}>
                            </View>
                            <View style={{ flex: .25, alignItems: "flex-end" }}>
                                <ResponsiveText size="h9" margin={[0, 0, wp(5), 0]}>{parseFloat(totalPrice[index]).toFixed(1)}</ResponsiveText>
                            </View>
                        </View>
                    </Pressable>
                )} />


            {/* <Pressable onPress={() => props.navigation.navigate("AssetsDetailss")}
                style={{ backgroundColor: "#CCCCCC33", paddingVertical: wp(4), paddingHorizontal: wp(3), paddingBottom: wp(2) }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row" }}>
                        <Image source={iconPath.coin1} style={{ width: wp(8), height: wp(8), resizeMode: "contain" }} />
                        <ResponsiveText size="h6" margin={[0, 0, 0, 5]} fontFamily={fonts.Poppins_SemiBold}>{"Soya Bean"}</ResponsiveText>
                    </View>
                </View>


                <View style={{ flexDirection: "row", marginTop: wp(6),  }}>

                    <View style={{ flex: .19, alignItems: "flex-start" }}>
                        <ResponsiveText size="h9">{"Ticker"}</ResponsiveText>
                    </View>
                    <View style={{ flex: .26, alignItems: "center" }}>
                        <ResponsiveText size="h9">{"Quantity (MT)"}</ResponsiveText>
                    </View>
                    <View style={{ flex: .3 }}>
                    </View>
                    <View style={{ flex: .25, alignItems: "flex-end" }}>
                        <ResponsiveText size="h9">{"GH₵/MT"}</ResponsiveText>
                    </View>

                </View>


                <FlatList
                    data={TickersState}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ marginTop: wp(0), }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (

                        <View style={{ paddingBottom: wp(2) }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 7 }}>
                                <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{item?.ticker}</ResponsiveText>
                                <ResponsiveText size="h8" margin={[0, 0, 0, wp(-12)]}>{item?.my_stocks?.qty}</ResponsiveText>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    {item?.chartData[0]?.price !== undefined &&
                                        <LineChart
                                            data={{
                                                datasets: [
                                                    {
                                                        data: item?.chartData?.map((itemm) => {
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
                                                color: (opacity = 1) => item.trend >= 0 ? Colors.greenColor : Colors.redColor,
                                                propsForDots: { r: "0" },
                                                propsForBackgroundLines: { stroke: "#CCCCCC33" }
                                            }}
                                            bezier
                                            style={{ paddingRight: 0, paddingTop: 3, transform: [{ translateX: -15 }] }}
                                        />
                                    }

                                    <View style={{ alignItems: "flex-end" }}>
                                        <ResponsiveText size="h8" color={item?.trend >= 0 ? Colors.greenColor : Colors.redColor}>{parseFloat(item?.price).toFixed(1)}</ResponsiveText>
                                        <ResponsiveText size="h10" color={item?.trend >= 0 ? Colors.greenColor : Colors.redColor} margin={[-4, 0, 0, 0]}>{"" + item?.trend + " %"}</ResponsiveText>
                                    </View>
                                </View>

                            </View>
                        </View>
                    )} />

                <View style={{ backgroundColor: "#D8D8D8", height: 1.5, width: "60%", alignSelf: "center", marginVertical: 18 }} />
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: .19, alignItems: "flex-start" }}>
                        <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium} margin={[0, 0, wp(6), 0]}>{"Total"}</ResponsiveText>
                    </View>
                    <View style={{ flex: .26, alignItems: "center" }}>
                        <ResponsiveText size="h9" margin={[0, 0, wp(5), 0]}>{parseFloat(totalQuantity).toFixed(2)}</ResponsiveText>
                    </View>
                    <View style={{ flex: .3 }}>
                    </View>
                    <View style={{ flex: .25, alignItems: "flex-end" }}>
                        <ResponsiveText size="h9" margin={[0, 0, wp(5), 0]}>{parseFloat(totalPrice).toFixed(1)}</ResponsiveText>
                    </View>
                </View>
            </Pressable> */}





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
    },
    totalStock: {
        backgroundColor: Colors.TextInputBackgroundColor, flexDirection: "row", justifyContent: "space-between",
        marginVertical: wp(5), paddingVertical: wp(4), paddingHorizontal: wp(4), alignItems: "center"
    },
    cashBalance:{
        backgroundColor: Colors.TextInputBackgroundColor, paddingHorizontal: wp(4), marginHorizontal: wp(4),
        paddingTop: wp(4), paddingBottom: wp(1), marginTop: wp(3), borderRadius: 14
    }
})
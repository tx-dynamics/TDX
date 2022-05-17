import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, RefreshControl, FlatList, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import { fonts } from '../../Constants/Fonts';
import { useSelector, useDispatch } from 'react-redux';
import { _getAssets, _removeNotification } from '../../Redux/Actions/Actions';
import { _axiosPostAPI } from '../../Apis/Apis';
import { ASSETS_DATA_LOADING } from '../../Redux/Constants';

import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import { useFocusEffect } from '@react-navigation/native';

const AssetsScreen = (props) => {

    const dispatch = useDispatch();

    const [cash_balance, setCash_balance] = useState('')
    const [currency_iso, setCurrency_iso] = useState('')
    const [totalStock, setTotalStock] = useState('')
    const [totalValue, setTotalValue] = useState('')
    const [totalQuantity, setTotalQuantity] = useState('')
    const [totalAllQuantity, setTotalAllQuantity] = useState('')
    const [totalPrice, setTotalPrice] = useState('')
    const [AlertsState, setAlertsState] = useState([])
    const [TickersState, setTickersState] = useState([])
    const [StockMarkets, setStockMarkets] = useState([])
    const [refreshLoading, setRefreshLoading] = useState(false)

    const userToken = useSelector(state => state.AuthReducer.userToken);
    const AssetsDetails = useSelector(state => state.HomeReducer.AssetsDetails);
    const Alertss = useSelector(state => state.HomeReducer.Alertss);
    const current_currency_rate = useSelector(state => state.HomeReducer.current_currency_rate);
    const userInfo = useSelector(state => state.AuthReducer.userInfo);
    const Assets_Loading = useSelector(state => state.HomeReducer.Assets_Loading);

    useEffect(() => {
        setAlertsState(Alertss)
    }, [Alertss])

    useEffect(() => {
        dispatch({ type: ASSETS_DATA_LOADING, payload: true });
    }, [])
    useEffect(() => {
        setTickerDetails()
    }, [AssetsDetails])

    useFocusEffect(
        React.useCallback(() => {
            getUserAssets()
            setTickerDetails()
        }, [])
    );

    const refreshScreen = () => {
        setRefreshLoading(true)
        getUserAssets()
        setTickerDetails()
        setTimeout(() => {
            setRefreshLoading(false)
        }, 600);
    }

    useEffect(() => {
        if ((AssetsDetails !== "" || AssetsDetails !== undefined)) {
            setCash_balance(AssetsDetails?.cash_balance)
            setCurrency_iso(AssetsDetails?.currency_iso)
            setTotalStock(AssetsDetails?.total_stocks)
        }
    }, [AssetsDetails])

    const setTickerDetails = async () => {
        // console.log(JSON.stringify(AssetsDetails))
        let totalTickersData = AssetsDetails
        totalTickersData?.stocks?.forEach(async (item, index) => {

            // alert(JSON.stringify(item.id))
            let data = {}
            data["token"] = userToken;
            data["id"] = item?.id;
            await _axiosPostAPI('get_ticker', data)
                .then(async (response) => {
                    if (response.action === "success") {
                        item.chartData = response?.data?.ticker?.chartData
                    } else {
                        alert(JSON.stringify(response.error))
                    }
                })
                .catch((err) => {
                    console.log(JSON.stringify(err))
                })
            if (index === totalTickersData?.stocks?.length - 1) {
                setTickersState(totalTickersData)
                groupByFun(totalTickersData?.stocks)
            }
        })
    }

    function groupByFun(list) {

        let allKeys = [];
        AssetsDetails?.stocks?.forEach(async (item, index) => {
            if (!allKeys.includes(item?.groupBy)) {
                allKeys.push(item?.groupBy)
            }
        })

        // console.log(JSON.stringify(allKeys)); 

        let result = [];
        let newArray = [];
        list.forEach(r => {
            if (!result[r.groupBy]) {
                result[r.groupBy] = [];
            }
            result[r.groupBy].push(r);
        }
        );
        allKeys.map((item) =>
            newArray.push(result[item])
            // console.log(JSON.stringify(result[item])) 
        )
        let arr1d = [].concat(...newArray);
        // console.log(JSON.stringify(newArray[0])) 
        setTimeout(() => {
            setStockMarkets(newArray)
        }, 500);

        let totalQuantity = []
        let totalPrice = []
        let totalPriceAll = 0
        let totalAllQuantity = 0

        newArray.map((item, index) => {
            let PriceCount = 0
            let QtyCount = 0
            item.map((itemm) => {
                PriceCount = PriceCount + (parseFloat(itemm?.price) * parseFloat(itemm?.my_stocks?.qty))
                totalPriceAll = totalPriceAll + PriceCount
                QtyCount = QtyCount + parseFloat(itemm?.my_stocks?.qty)
                totalAllQuantity = totalAllQuantity + QtyCount
            })

            totalPrice.push(PriceCount)
            totalQuantity.push(QtyCount)
        })

        // alert(JSON.stringify(totalAllQuantity))
        setTotalAllQuantity(totalAllQuantity)
        setTotalQuantity(totalQuantity)
        setTotalPrice(totalPrice)
        setTotalValue(totalPriceAll)
        // console.log(JSON.stringify(totalPriceAll)); 

    }

    const getUserAssets = async () => {
        let data = {}
        data["token"] = userToken;
        dispatch(_getAssets('get_assets', data))
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
                        <ResponsiveText size="h9" margin={[0, 0, 0, 8]} color={"#000"}>{userInfo?.currency_iso}</ResponsiveText>
                    </View>
                    {/* <Fonticon type={"MaterialIcons"} name={"info"} size={wp(6)} color={"#000"} /> */}
                </View>

                <ResponsiveText size="h6" fontFamily={fonts.Poppins_Bold} color={"#000"}>{(cash_balance * current_currency_rate)?.toFixed(2)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ResponsiveText>

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
                        <ResponsiveText size="h9" margin={[3, 0, 0, 0]} color={"#000"}>{totalAllQuantity}</ResponsiveText>
                    </View>
                    <View style={{ alignItems: "center", marginLeft: wp(5) }}>
                        <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium} color={"#000"}>{userInfo?.currency_iso + " Value"}</ResponsiveText>
                        <ResponsiveText size="h9" margin={[3, 0, 0, 0]} color={"#000"}>{parseFloat(totalValue * current_currency_rate).toFixed(2)}</ResponsiveText>
                    </View>
                </View>
            </View>
            {/* StockMarkets */}

            {StockMarkets?.length > 0 ?
                <FlatList
                    data={StockMarkets}
                    extraData={StockMarkets}
                    onRefresh={() => refreshScreen()}
                    refreshing={refreshLoading}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ marginTop: wp(3.5) }}
                    showsVerticalScrollIndicator={false}
                    // ListEmptyComponent={
                    //     // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    //     //     <ResponsiveText size="h6" fontFamily={fonts.Poppins_SemiBold} margin={[wp(5), 0, 0, 0]}>{"No Data Found"}</ResponsiveText>
                    //     // </View>
                    // }
                    renderItem={({ item, index }) => (
                        <Pressable style={{ backgroundColor: "#CCCCCC33", paddingVertical: wp(4), paddingHorizontal: wp(3), paddingBottom: wp(2), marginBottom: 20 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image source={{ uri: item[0]?.market?.image_url }} style={{ width: wp(8), height: wp(8), resizeMode: "contain" }} />
                                    <ResponsiveText size="h6" margin={[0, 0, 0, 5]} fontFamily={fonts.Poppins_SemiBold}>{item[0]?.market?.title}</ResponsiveText>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: wp(6), }}>
                                <View style={{ flex: .25, alignItems: "flex-start" }}>
                                    <ResponsiveText size="h9">{"Ticker"}</ResponsiveText>
                                </View>
                                <View style={{ flex: .25, alignItems: "center" }}>
                                    <ResponsiveText size="h9">{"Quantity (MT)"}</ResponsiveText>
                                </View>
                                <View style={{ flex: .25, alignItems: "flex-end" }}>
                                    <ResponsiveText size="h9">{userInfo?.currency_iso + "/MT"}</ResponsiveText>
                                </View>
                                <View style={{ flex: .25, alignItems: "flex-end" }}>
                                    <ResponsiveText size="h9">{userInfo?.currency_iso + " Value"}</ResponsiveText>
                                </View>
                            </View>

                            {/* <Text>{JSON.stringify(item?.length)}</Text> */}

                            {item?.map((itemm) =>

                                <Pressable 
                                // onPress={() => alert(JSON.stringify(itemm.market.id))}
                                onPress={() => props.navigation.navigate("AssetsDetailsss", { tickerId: itemm.id, marketID: itemm?.market?.id })}
                                    style={{ flexDirection: "row", marginTop: wp(5), }}>
                                    <View style={{ flex: .25, alignItems: "flex-start" }}>
                                        <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{itemm?.ticker}</ResponsiveText>
                                    </View>
                                    <View style={{ flex: .25, alignItems: "center" }}>
                                        <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{itemm?.my_stocks?.qty}</ResponsiveText>
                                    </View>
                                    <View style={{ flex: .25, alignItems: "flex-end" }}>
                                        <View style={{ alignItems: "flex-end" }}>
                                            <ResponsiveText size="h8" color={itemm?.trend >= 0 ? Colors.greenColor : Colors.redColor}>{parseFloat(itemm?.price * current_currency_rate).toFixed(1)}</ResponsiveText>
                                            <ResponsiveText size="h10" color={itemm?.trend >= 0 ? Colors.greenColor : Colors.redColor} margin={[-4, 0, 0, 0]}>{"" + itemm?.trend + " %"}</ResponsiveText>
                                        </View>
                                    </View>
                                    <View style={{ flex: .25, alignItems: "flex-end" }}>
                                        <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{(parseFloat(itemm?.price * current_currency_rate) * parseFloat(itemm?.my_stocks?.qty)).toFixed(1)}</ResponsiveText>
                                    </View>
                                </Pressable>
                            )}


                            <View style={{ backgroundColor: "#D8D8D8", height: 1.5, width: "60%", alignSelf: "center", marginVertical: 18 }} />
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: .25, alignItems: "flex-start" }}>
                                    <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium} margin={[0, 0, wp(6), 0]}>{"Total"}</ResponsiveText>
                                </View>
                                <View style={{ flex: .25, alignItems: "center" }}>
                                    <ResponsiveText size="h9" margin={[0, 0, wp(5), 0]}>{parseFloat(totalQuantity[index]).toFixed(2)}</ResponsiveText>
                                </View>
                                <View style={{ flex: .25 }}>
                                </View>
                                <View style={{ flex: .25, alignItems: "flex-end" }}>
                                    <ResponsiveText size="h9" margin={[0, 0, wp(5), 0]}>{parseFloat(totalPrice[index] * current_currency_rate).toFixed(1)}</ResponsiveText>
                                </View>
                            </View>
                        </Pressable>
                    )} />
                :
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ResponsiveText size="h6" fontFamily={fonts.Poppins_SemiBold} margin={[wp(5), 0, 0, 0]}>{"No Data Found"}</ResponsiveText>
                </View>
            }

            <Loader loading={Assets_Loading} />

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
    cashBalance: {
        backgroundColor: Colors.TextInputBackgroundColor, paddingHorizontal: wp(4), marginHorizontal: wp(4),
        paddingTop: wp(4), paddingBottom: wp(1), marginTop: wp(3), borderRadius: 14
    }
})
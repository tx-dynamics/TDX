import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
    View, Text, StyleSheet, Image, StatusBar,
    Modal, FlatList, Pressable, Dimensions, Linking
} from 'react-native'

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
import moment from 'moment';
// import Toast from 'react-native-toast-message';

import { useSelector, useDispatch } from 'react-redux';
import { _getTickerData, _getNewsData, _addToWishList, _getAllWatchList, _addAlert, _getGraphData } from '../../Redux/Actions/Actions';
import { ADD_ALERT_ORDER } from '../../Redux/Constants';

const DayDATA = [
    { id: "2", title: "1 w" },
    { id: "3", title: "1 M" },
    { id: "4", title: "3 M" },
    { id: "5", title: "6 M" },
    { id: "6", title: "1 Y" },
    { id: "7", title: "All" },
]
import { LineChart } from "react-native-chart-kit";
import Toast, { DURATION } from 'react-native-easy-toast'
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data11 = [];

const rand = 300;
for (let i = 0; i < 7; i++) {
    let d = {
        year: 2000 + i,
        value: Math.random() * (rand + 50) + 100
    };

    data11.push(d);
}

const AssetsDetails = (props) => {

    const dispatch = useDispatch();
    // const toastRef = useRef(null)
    const toastRef = React.createRef(Toast)
    const toastReff = React.createRef(Toast)

    const [DropDownItem, setDropDownItem] = useState('USD')
    const [filterModal, setFilterModal] = useState(false)
    const [alertModal, setAlertModal] = useState(false)
    const [allWatchLists, setAllWatchLists] = useState([])
    const [blogsPosts, setBlogsPosts] = useState([])
    const [isThisWatchList, setIsThisWatchList] = useState(false)
    const [alertPrice, setAlertPrice] = useState('')
    const [dataSetArray, setDataSetArray] = useState([])
    const [selectedId, setselectedId] = useState("2")
    const [datesLabel, setDatesLabel] = useState([])
   
    const userToken = useSelector(state => state.AuthReducer.userToken);
    const tickerData = useSelector(state => state.HomeReducer.tickerData);
    const newsData = useSelector(state => state.HomeReducer.newsData);
    const WatchListMarkets = useSelector(state => state.HomeReducer.WatchListMarkets);
    const add_Alert_Created = useSelector(state => state.HomeReducer.add_Alert_Created);
    const graphDataSet = useSelector(state => state.HomeReducer.graphDataSet);
    const current_currency_rate = useSelector(state => state.HomeReducer.current_currency_rate);
    const userInfo = useSelector(state => state.AuthReducer.userInfo);

    useEffect(() => {
        // alert( props?.route?.params?.tickerId)
        getTickerData()
        getWatchlistMarkets()
    }, [])

    useEffect(() => {
        let payload = newsData.blogs?.map((item) => {
            return {
                ...item,
                seeMore: false,
                isLinesLarger: item?.description?.length > 121 ? true : false
            }
        })
        setBlogsPosts(payload)
    }, [newsData])

    useEffect(() => {
        if (WatchListMarkets !== undefined) {
            setAllWatchLists(WatchListMarkets)
            CheckIsWatchList()
        }
    }, [WatchListMarkets])

    useEffect(() => {
        setGraphData()
    }, [graphDataSet])

    const setGraphData = () => {
        setDataSetArray(graphDataSet)

        if (selectedId == "2") {

           let labels = graphDataSet?.map((itemm) => {
                return (
                    itemm.date.split('T')[0].split('-')[2] + "/" + itemm.date.split('-')[1]
                )
            })
            setDatesLabel(labels)
            // alert(JSON.stringify(labels))
        }
        else if (selectedId == "3") {
            let labels = graphDataSet?.map((itemm) => {
                return (
                    itemm.date.split('T')[0].split('-')[2] + "/" + itemm.date.split('-')[1]
                )
            })
            let labels1 = [labels[0], labels[5], labels[10], labels[15], labels[20], labels[25], labels[labels.length -1] ]
            setDatesLabel(labels1)
            // alert(JSON.stringify(labels1))
        }
        else if (selectedId == "4") {
            let labels = graphDataSet?.map((itemm) => {
                return (
                    itemm.date.split('T')[0].split('-')[2] + "/" + itemm.date.split('-')[1]
                )
            })
            let labels1 = [labels[0], labels[15], labels[30], labels[45], labels[60], labels[75], labels[labels.length -1] ]
            setDatesLabel(labels1)
            // alert(JSON.stringify(labels1))

        }
        else if (selectedId == "5") {

            let labels = graphDataSet?.map((itemm) => {
                return (
                    itemm.date.split('T')[0].split('-')[2] + "/" + itemm.date.split('-')[1]
                )
            })
            let labels1 = [labels[0], labels[30], labels[60], labels[90], labels[120], labels[150], labels[labels.length -1] ]
            setDatesLabel(labels1)
            // alert(JSON.stringify(labels1))
        }
        else if (selectedId == "6") {

            let labels = graphDataSet?.map((itemm) => {
                return (
                    itemm.date.split('T')[0].split('-')[2] + "/" + itemm.date.split('-')[1]
                )
            })
            let labels1 = [labels[0], labels[60], labels[120], labels[180], labels[240], labels[300], labels[labels.length -1] ]
            setDatesLabel(labels1)
            // alert(JSON.stringify(labels1))

        }
        else if (selectedId == "7") {

            let labels = graphDataSet?.map((itemm) => {
                return (
                    itemm.date.split('T')[0].split('-')[2] + "/" + itemm.date.split('-')[1]
                )
            })
            let labels1 = [labels[0], labels[120], labels[240], labels[360], labels[480], labels[600], labels[labels.length -1] ]
            setDatesLabel(labels1)
            // alert(JSON.stringify(labels1))

        }

    }

    const CheckIsWatchList = () => {
        if (WatchListMarkets?.length > 0) {
            WatchListMarkets.map((item) => {
                if (item?.id === props?.route?.params?.marketID) {
                    setIsThisWatchList(true)
                } else {
                    setIsThisWatchList(false)
                }
            })
        }
        else {
            setIsThisWatchList(false)
        }
    }

    const getTickerData = async () => {
        // alert(props.route.params.tickerId)
        let data = {}
        data["token"] = userToken;
        data["id"] = props?.route?.params?.tickerId;
        dispatch(_getTickerData('get_ticker', data))
        let data1 = {}
        data1["token"] = userToken;
        data1["tickers"] = [props.route.params.tickerId];
        dispatch(_getNewsData('get_blogs', data1))

        let fromDate = createDate(7, 0, 0)
        // let fromDate = createDate(0, 3, 0)
        let data2 = {}
        data2["token"] = userToken;
        data2["id"] = props?.route?.params?.tickerId;
        data2["from_date"] = moment(fromDate).format("yyyy-MM-DD");
        data2["to_date"] = moment(new Date()).format("yyyy-MM-DD");
        dispatch(_getGraphData('get_chart_v3', data2))
    }

    const getWatchlistMarkets = async () => {
        let data = {}
        data["token"] = userToken;
        dispatch(_getAllWatchList('get_watchlist', data))
    }

    const openAlertModal = () => {
        setFilterModal(false)
        setAlertModal(true)
    }

    const AddToWashList = async () => {
        let data = {}
        data["token"] = userToken;
        data["id"] = props.route.params.tickerId;

        if (isThisWatchList) {
            dispatch(_addToWishList('remove_watchlist', data, userToken))
        } else {
            dispatch(_addToWishList('add_watchlist', data, userToken))
        }
        setFilterModal(false)
    }

    const AddAlert = async () => {
        if (alertPrice === '') {
            toastReff.current.show('Please Enter Price', 2500);
        } else {

            let data = {}
            data["token"] = userToken;
            data["ticker_id"] = props.route.params.tickerId;
            data["price"] = alertPrice;
            dispatch(_addAlert('set_alert', data))
            setAlertModal(false)
        }
    }

    const showMoreClick = (indx, isShowMore) => {
        let payload = newsData.blogs?.map((item, index) => {
            if (indx === index) {
                return {
                    ...item,
                    seeMore: !isShowMore,
                    isLinesLarger: item?.description?.length > 121 ? true : false
                }
            } else {
                return {
                    ...item,
                    seeMore: false,
                    isLinesLarger: item?.description?.length > 121 ? true : false
                }

            }
        })
        setBlogsPosts(payload)
    }

    const changeDataset = (item) => {
            setselectedId(item?.id)
        let fromDate = item?.id === "2" ? createDate(7, 0, 0) : item?.id === "3" ? createDate(0, 1, 0) : item?.id === "4" ? createDate(0, 3, 0) : item?.id === "5" ? createDate(0, 6, 0) : item?.id === "6" ? createDate(0, 0, 1) : item?.id == "7" ? createDate(0, 0, 2) : createDate(7, 0, 0)

        let data = {}
        data["token"] = userToken;
        data["id"] = props?.route?.params?.tickerId;
        data["from_date"] = moment(fromDate).format("yyyy-MM-DD");
        data["to_date"] = moment(new Date()).format("yyyy-MM-DD");
        dispatch(_getGraphData('get_chart_v3', data))
        //    alert(JSON.stringify(data))
    }

    function createDate(days, months, years) {
        var date = new Date();
        date.setDate(date.getDate() - days);
        date.setMonth(date.getMonth() - months);
        date.setFullYear(date.getFullYear() - years);
        return date;
    }

    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    const openLink = (link) => {
        let check = validURL(link)
        if (check) {
            Linking.openURL(link.includes("http")? link : "https://"+link)
        } else {
            toastReff.current.show('Please Enter Price', 2500);
            // Toast.show({ type: "message", position: "bottom", props: { body: "Link is not Valid" } })  
        }
    }

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={""}
                leftPress={() => props.navigation.goBack()} />

            <ScrollView>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(4), marginTop: wp(3), alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image source={{ uri: tickerData?.ticker?.market?.image_url }} style={{ width: wp(13), height: wp(13), resizeMode: "contain" }} />
                        <View style={{ marginLeft: 12 }}>
                            <ResponsiveText size="h5" margin={[0, 0, 0, 0]} fontFamily={fonts.Poppins_SemiBold}>{tickerData?.ticker?.market?.title}</ResponsiveText>
                            <ResponsiveText size="h6" margin={[-6, 0, 0, 0]}>{tickerData?.ticker?.title}</ResponsiveText>
                        </View>
                    </View>
                    <Pressable onPress={() => setFilterModal(true)}>
                        <Image source={iconPath.threeVerticalDot} style={{ width: wp(7), height: wp(7), resizeMode: "contain", marginRight: -5 }} />
                    </Pressable>
                </View>

                <View style={{ backgroundColor: Colors.TextInputBackgroundColor, paddingVertical: wp(4), marginTop: wp(5) }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(4) }}>
                        <ResponsiveText size="h6" fontFamily={fonts.Poppins_SemiBold} margin={[0, 0, 0, 5]}>{tickerData?.ticker?.ticker}</ResponsiveText>
                        <View style={{ alignItems: "flex-end" }}>
                            <View style={{ flexDirection: "row" }}>
                                <ResponsiveText size="h8" color={"#000"}>{userInfo?.currency + "  "}</ResponsiveText>
                                <ResponsiveText size="h8" color={tickerData?.ticker?.trend >= 0 ? Colors.greenColor : Colors.redColor}>{parseFloat(tickerData?.ticker?.price * current_currency_rate).toFixed(1)}</ResponsiveText>
                            </View>
                            <ResponsiveText size="h9" color={tickerData?.ticker?.trend >= 0 ? Colors.greenColor : Colors.redColor} margin={[-4, 0, 0, 0]}>{tickerData?.ticker?.trend + " %"}</ResponsiveText>
                        </View>
                    </View>

                    <View style={{ width: "100%", alignItems: "center", marginTop: wp(5), }}>

                        {dataSetArray?.length > 0 &&
                            <LineChart
                                data={{
                                    labels: datesLabel,
                                    datasets: [
                                        {
                                            data: dataSetArray?.map((itemm) => {
                                                return (
                                                    parseInt(itemm?.price * current_currency_rate)
                                                )
                                            })
                                        }
                                    ]
                                }}
                                width={Dimensions.get("window").width - 7} // from react-native
                                height={160}
                                // yAxisLabel={userInfo?.currency}
                                xAxisLabel={""}
                                // yAxisSuffix="k"
                                // yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundGradientFromOpacity: 0,
                                    backgroundGradientToOpacity: 0,
                                    decimalPlaces: 1,
                                    color: (opacity = 1) => tickerData?.ticker?.trend >= 0 ? Colors.greenColor : Colors.redColor,
                                    labelColor: (opacity = 1) => Colors.black,
                                    propsForDots: { r: "0" },
                                    propsForBackgroundLines: { stroke: "#CCCCCC33" },

                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    transform: [{ translateX: 3 }],
                                }}
                            />
                        }
                    </View>
                    <View style={{ paddingHorizontal: wp(4), alignItems: "center" }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {DayDATA.map((item, index) =>
                                <Pressable onPress={() => changeDataset(item)}
                                    style={{ marginLeft: index === 0 ? 0 : wp(6), backgroundColor: selectedId === item?.id ? Colors.greenColor : "#00000033", width: 41, alignItems: "center", height: 31, justifyContent: "center", borderRadius: 15 }}>
                                    <ResponsiveText color={selectedId === item?.id ? "#fff" : "#000"} size="h8" margin={[0, 0, 0, 0]}>{item?.title}</ResponsiveText>
                                </Pressable>
                            )}
                        </ScrollView>
                    </View>

                </View>

                <View style={{
                    backgroundColor: Colors.TextInputBackgroundColor, paddingHorizontal: wp(4), justifyContent: "space-between",
                    marginVertical: wp(6), paddingVertical: wp(4), flexDirection: "row", alignItems: "center"
                }}>
                    <Pressable >
                        <ResponsiveText size="h7" fontFamily={fonts.Poppins_Medium}>{"Your stock"}</ResponsiveText>
                    </Pressable>

                    <View style={{ flexDirection: "row" }}>
                        <View style={{ alignItems: "center" }}>
                            <ResponsiveText size="h9" color={"#BEBEBE"}>{"Quantity (" + tickerData?.ticker?.my_stocks?.qty_symbol + ")"}</ResponsiveText>
                            {tickerData?.ticker?.my_stocks?.qty === null ?
                                <ResponsiveText size="h9" margin={[5, 0, 0, 0]}>{"0"}</ResponsiveText>
                                :
                                <ResponsiveText size="h9" margin={[5, 0, 0, 0]}>{tickerData?.ticker?.my_stocks?.qty}</ResponsiveText>
                            }
                        </View>
                        <View style={{ alignItems: "center", marginLeft: wp(9), marginRight: wp(4) }}>
                            <ResponsiveText size="h9" color={"#BEBEBE"}>{"Bags"}</ResponsiveText>
                            <ResponsiveText size="h9" margin={[5, 0, 0, 0]}>{tickerData?.ticker?.my_stocks?.bags}</ResponsiveText>
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
                            <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium}>{tickerData?.ticker?.commudity?.country}</ResponsiveText>
                        </View>
                        <ResponsiveText size="h7" fontFamily={fonts.Poppins_Medium}>{tickerData?.ticker?.commudity?.country_symbol}</ResponsiveText>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wp(1), alignItems: "center" }}>
                        <View>
                            <ResponsiveText size="h9" color={"#BEBEBE"}>{"Warehouse Location"}</ResponsiveText>
                            <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium}>{tickerData?.ticker?.commudity?.warehouse}</ResponsiveText>
                        </View>
                        <ResponsiveText size="h7" fontFamily={fonts.Poppins_Medium}>{tickerData?.ticker?.commudity?.warehouse_symbol}</ResponsiveText>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wp(1), alignItems: "center" }}>
                        <View>
                            <ResponsiveText size="h9" color={"#BEBEBE"}>{"Commodity Type"}</ResponsiveText>
                            <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium}>{tickerData?.ticker?.commudity?.commudity}</ResponsiveText>
                        </View>
                        <ResponsiveText size="h7" fontFamily={fonts.Poppins_Medium}>{tickerData?.ticker?.commudity?.commudity_symbol}</ResponsiveText>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wp(1), alignItems: "center" }}>
                        <View>
                            <ResponsiveText size="h9" color={"#BEBEBE"}>{"Grade"}</ResponsiveText>
                            <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium}>{tickerData?.ticker?.commudity?.grade}</ResponsiveText>
                        </View>
                        <ResponsiveText size="h7" fontFamily={fonts.Poppins_Medium}>{tickerData?.ticker?.commudity?.grade_symbol}</ResponsiveText>
                    </View>

                    <Pressable
                        // onPress={() => setSeeMore(!seeMore)}
                        onPress={() => Linking.openURL(tickerData?.ticker?.contract_link)}
                        style={{
                            backgroundColor: "#455154", paddingHorizontal: wp(5), paddingVertical: wp(2), alignSelf: "center",
                            borderRadius: 11, alignItems: "center"
                        }}>
                        <ResponsiveText size="h7" textAlign={"center"} color={"#F3BA2F"} >{"View Contract"}</ResponsiveText>
                    </Pressable>
                </View>

                <ResponsiveText size="h7" margin={[wp(4), 0, 0, wp(4)]} fontFamily={fonts.Poppins_Medium}>{"News"}</ResponsiveText>

                {/* seeMore: true, */}
                {/* isLinesLarger: true */}
                {blogsPosts?.map((item, index) =>
                    <Pressable onPress={() => openLink(item.link)}
                    style={{
                        backgroundColor: Colors.TextInputBackgroundColor, marginTop: wp(2), marginHorizontal: wp(4), paddingHorizontal: wp(4),
                        paddingVertical: wp(2), borderRadius: 16,
                    }}>
                        <ResponsiveText size="h10" textAlign={"right"} margin={[0, 0, 0, 0]} fontFamily={fonts.Poppins}>{moment(item?.created_at).format('DD MMM YYYY')}</ResponsiveText>
                        <ResponsiveText size="h7" margin={[0, 0, 0, 0]} fontFamily={fonts.Poppins_Medium}>{item?.title}</ResponsiveText>
                        {/* <HTMLView
                            value={item?.description}
                        // styles={{fontSize:19}}
                        /> */}
                        <View style={{
                            height: item?.seeMore ? undefined : wp(17),
                            flexDirection: "row",
                        }}>
                            <Text
                                numberOfLines={item?.seeMore ? undefined : 3}
                                style={{ color: "#6B6B6B", fontFamily: fonts.Poppins }}>
                                {item?.description?.slice(0, item?.seeMore ? item?.description.length : 121).replace(/<\/?[^>]+(>|$)/g, "")}
                                <Text onPress={() => showMoreClick(index, item?.seeMore)} style={{ color: "blue" }}>{item?.isLinesLarger ? item?.seeMore ? " See less" : " See more..." : ""} </Text>
                                {/* {isLargeNumberLines ? " Yes Show more" : ""} */}
                            </Text>
                        </View>
                    </Pressable>
                )}

            </ScrollView>


            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(4), marginTop: wp(2), marginBottom: wp(3) }}>
                <View style={{ width: "49%", }}>
                    <Button
                        onPress={() => props.navigation.navigate('TradeScreenTicker', { tickerId: props?.route?.params?.tickerId, marketID: props?.route?.params?.marketID, btnType: "Buy" })}
                        Text={'BUY'}
                        height={45}
                        backgroundColor={"#019146"}
                    />
                </View>
                <View style={{ width: "49%" }}>
                    <Button
                        onPress={() => props.navigation.navigate('TradeScreenTicker', { tickerId: props?.route?.params?.tickerId, marketID: props?.route?.params?.marketID, btnType: "Sell" })}
                        Text={'SELL'}
                        height={45}
                        backgroundColor={"#DB1222"}
                    />
                </View>
            </View>

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
                        <Pressable onPress={() => AddToWashList()}
                            style={{ flexDirection: "row", paddingHorizontal: wp(3), marginLeft: 5 }}>
                            <Image source={iconPath.passwordUnhide} style={{ width: wp(5), height: wp(5), resizeMode: "contain" }} />
                            <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium} padding={[0, 0, 0, wp(2)]}>{isThisWatchList ? "Remove from watch list" : "Add to watch list"}</ResponsiveText>
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
                                    value={alertPrice}
                                    onChangeText={txt => setAlertPrice(txt)}
                                />
                            </View>
                        </View>
                        <Pressable onPress={() => AddAlert()}
                            style={{ backgroundColor: Colors.greenColor, paddingHorizontal: wp(7), paddingVertical: wp(2.5), borderRadius: 11, alignSelf: "flex-end", marginRight: wp(2) }}>
                            <ResponsiveText size="h9" padding={[0, 0, 0, 0]} color={"#fff"}>{"Apply"}</ResponsiveText>
                        </Pressable>
                    </View>

                    <Toast
                        ref={toastReff}
                        style={{ backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30 }}
                        position='bottom'
                        positionValue={150}
                        opacity={0.9}
                        textStyle={{ color: 'black' }}
                    />

                </Pressable>
            </Modal>

            <Modal
                style={{ flex: 1 }}
                animationType="slide"
                transparent={true}
                // visible={true}
                visible={add_Alert_Created}
                onRequestClose={() => { dispatch({ type: ADD_ALERT_ORDER, payload: false }) }}>
                <Pressable onPress={() => dispatch({ type: ADD_ALERT_ORDER, payload: false })}
                    style={{ width: '100%', height: '100%', justifyContent: 'center', alignSelf: 'center', borderRadius: 15, backgroundColor: "rgba(240, 244, 244, 0.4)", }}>
                    <View style={[styles.boxWithShadow, styles.inputContainer]}>
                        <View style={{ backgroundColor: "#fff", marginTop: -2, borderRadius: 20, width: wp(80) }}>
                            <Fonticon type={"Entypo"} name={"cross"} size={wp(4)} color={Colors.black} style={{ alignSelf: "flex-end", margin: 5 }}
                                onPress={() => dispatch({ type: ADD_ALERT_ORDER, payload: false })}
                            />
                            <Fonticon type={"Feather"} name={"check-circle"} size={wp(22)} color={Colors.greenColor} style={{ alignSelf: "center" }} />
                            <ResponsiveText size="h3" fontFamily={fonts.Poppins_Bold} textAlign={"center"} margin={[wp(1), 0, 0, 0]}>{"Success!"}</ResponsiveText>
                            <Text style={{ color: "#000", textAlign: "center", marginTop: wp(1), width: wp(80), alignSelf: "center", fontFamily: fonts.Poppins, fontSize: 13 }}>Your alert has been successfully created</Text>
                            <View style={{ width: wp(20), marginTop: wp(5), alignSelf: "center" }}>
                                <Button
                                    onPress={() => dispatch({ type: ADD_ALERT_ORDER, payload: false })}
                                    Text={'Okay'}
                                    fontFamily={fonts.Poppins_Medium}
                                    fontSize={16}
                                    TextColor={"rgb(180,180,180)"}
                                    backgroundColor={"transparent"}
                                />
                            </View>
                        </View>

                    </View>
                </Pressable>

            </Modal>

            <Toast
                ref={toastRef}
                style={{ backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30 }}
                position='bottom'
                positionValue={150}
                opacity={0.9}
                textStyle={{ color: 'black' }}
            />


        </View>
    )
}
export default AssetsDetails;
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    inputContainer: {
        alignSelf: 'center',
        borderRadius: 18,
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: "#fff"
    },

})
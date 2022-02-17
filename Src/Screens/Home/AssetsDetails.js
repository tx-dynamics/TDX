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
import HTMLView from 'react-native-htmlview';
import ViewMoreText from 'react-native-view-more-text';
import HTML from 'react-native-render-html';
import SeeMore from 'react-native-see-more-inline';

import { useSelector, useDispatch } from 'react-redux';
import {
    _getTickerData, _getNewsData, _addToWishList,
    _getAllWatchList, _addAlert
} from '../../Redux/Actions/Actions';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine } from "victory-native";


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
]

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import Toast, { DURATION } from 'react-native-easy-toast'


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
    const [seeMore, setSeeMore] = useState(false)
    const [isLargeNumberLines, setIsLargeNumberLines] = useState(true)

    const userToken = useSelector(state => state.AuthReducer.userToken);
    const tickerData = useSelector(state => state.HomeReducer.tickerData);
    const newsData = useSelector(state => state.HomeReducer.newsData);
    const WatchListMarkets = useSelector(state => state.HomeReducer.WatchListMarkets);

    useEffect(() => {
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
        // alert(JSON.stringify(newsData.blogs[0].created_at))

    }, [newsData])

    useEffect(() => {
        if (WatchListMarkets !== undefined) {
            setAllWatchLists(WatchListMarkets)
            CheckIsWatchList()
        }
    }, [WatchListMarkets])

    const CheckIsWatchList = () => {
        if (WatchListMarkets?.length > 0) {
            WatchListMarkets.map((item) => {
                if (item?.id === props.route.params.marketID) {
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
        let data = {}
        data["token"] = userToken;
        data["id"] = props.route.params.tickerId;
        dispatch(_getTickerData('get_ticker', data))
        let data1 = {}
        data1["token"] = userToken;
        data1["tickers"] = [props.route.params.tickerId];
        dispatch(_getNewsData('get_blogs', data1))
        // alert(JSON.stringify(tickerData))
    }

    const getWatchlistMarkets = async () => {
        let data = {}
        data["token"] = userToken;
        await dispatch(_getAllWatchList('get_watchlist', data))
        // alert(JSON.stringify(tickerData))
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
        // alert(JSON.stringify(isShowMore))
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
    };



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
                            <ResponsiveText size="h8" color={tickerData?.ticker?.trend >= 0 ? Colors.greenColor : Colors.redColor}>{parseFloat(tickerData?.ticker?.price).toFixed(1)}</ResponsiveText>
                            <ResponsiveText size="h9" color={tickerData?.ticker?.trend >= 0 ? Colors.greenColor : Colors.redColor} margin={[-4, 0, 0, 0]}>{tickerData?.ticker?.trend + " %"}</ResponsiveText>
                        </View>
                    </View>

                    <View style={{ width: "100%", alignItems: "center", marginTop: wp(5) }}>

                        {tickerData?.ticker?.chartData !== undefined &&
                            <LineChart
                                data={{
                                    labels: tickerData?.ticker?.chartData.map((itemm) => {
                                        return (
                                            itemm.date.split('T')[0].split('-')[2] + "/" + itemm.date.split('-')[1]
                                        )
                                    }),
                                    datasets: [
                                        {
                                            data: tickerData?.ticker?.chartData?.map((itemm) => {
                                                return (
                                                    parseInt(itemm.price)
                                                )
                                            })
                                        }
                                    ]
                                }}
                                width={Dimensions.get("window").width} // from react-native
                                height={160}
                                yAxisLabel="$"
                                // yAxisSuffix="k"
                                // yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundGradientFromOpacity: 0,
                                    backgroundGradientToOpacity: 0,
                                    decimalPlaces: 2,
                                    color: (opacity = 1) => tickerData?.ticker?.trend >= 0 ? Colors.greenColor : Colors.redColor,
                                    labelColor: (opacity = 1) => Colors.black,
                                    propsForDots: { r: "0" },
                                    propsForBackgroundLines: { stroke: "#CCCCCC33" },

                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    transform: [{ translateX: 10 }]
                                }}
                            />
                        }
                    </View>


                    <View style={{ paddingHorizontal: wp(4) }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {DayDATA.map((item, index) =>
                                <Pressable style={{ marginLeft: index === 0 ? 0 : wp(4), backgroundColor: "#00000033", width: 41, alignItems: "center", height: 31, justifyContent: "center", borderRadius: 15 }}>
                                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{item?.title}</ResponsiveText>
                                </Pressable>
                            )}
                        </ScrollView>
                    </View>

                </View>

                <View style={{
                    backgroundColor: Colors.TextInputBackgroundColor, paddingHorizontal: wp(4), justifyContent: "space-between",
                    marginVertical: wp(6), paddingVertical: wp(4), flexDirection: "row", alignItems: "center"
                }}>
                    <Pressable onPress={() => alert(JSON.stringify(newsData))}>
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
                    <View style={{
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



                    </View>
                )}

            </ScrollView>


            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(4), marginTop: wp(2), marginBottom: wp(3) }}>
                <View style={{ width: "49%", }}>
                    <Button
                        onPress={() => props.navigation.navigate('TradeScreenTicker')}
                        Text={'BUY'}
                        height={45}
                        backgroundColor={"#019146"}
                    />
                </View>
                <View style={{ width: "49%" }}>
                    <Button
                        onPress={() => props.navigation.navigate('TradeScreenTicker')}
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
    }

})
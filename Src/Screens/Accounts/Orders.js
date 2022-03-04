import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Modal, Dimensions, FlatList, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../Components/Button';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../Components/Loader';


import { useSelector, useDispatch } from 'react-redux';
import { _getOrders, _getOrdersHistory, _cancelOrder } from '../../Redux/Actions/Actions';


const Orders = (props) => {

    const dispatch = useDispatch();

    const [DropDownItem, setDropDownItem] = useState('')
    const [selectedBtn, setSelectedBtn] = useState("Open")
    const [cancelOrderModal, setCancelOrderModal] = useState(false)
    const [cancelOrderId, setCancelOrderId] = useState("")

    const Order_List = useSelector(state => state.HomeReducer.Order_List);
    const Order_List_History = useSelector(state => state.HomeReducer.Order_List_History);
    const Order_Loading = useSelector(state => state.HomeReducer.Order_Loading);
    const userToken = useSelector(state => state.AuthReducer.userToken);
    const current_currency_rate = useSelector(state => state.HomeReducer.current_currency_rate);

    useEffect(() => {
        console.log(userToken)
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            getTickerData("open")
            getTickerDataHistory("history")
        }, [])
    );

    const getTickerData = async (type) => {
        let data = {}
        data["token"] = userToken;
        data["type"] = type.toLowerCase();
        // data["page"] = 1;
        // data["limit"] = 10;
        // alert(JSON.stringify(data))
        dispatch(_getOrders('get_orders', data))
    }
    const getTickerDataHistory = async (type) => {
        let data = {}
        data["token"] = userToken;
        data["type"] = type.toLowerCase();
        data["page"] = 1;
        data["limit"] = 50;
        await dispatch(_getOrdersHistory('get_orders', data))
        // alert(JSON.stringify(Order_List))
    }
    const setTickerData = async (type) => {
        getTickerData(type)
        setSelectedBtn(type)
    }
    const setTickerDataHistory = async (type) => {
        getTickerDataHistory(type)
        setSelectedBtn(type)
    }
    const cancelOrder = (item) => {
        if (item?.status === 0) {
            setCancelOrderId(item?.id)
            setTimeout(() => {
                setCancelOrderModal(true)
            }, 300);
        }
    }

    const cancelOrderApi = () => {
        setCancelOrderModal(false)
        let data = {}
        data["token"] = userToken;
        data["order_id"] = cancelOrderId;

        // alert(JSON.stringify(cancelOrderId))
        dispatch(_cancelOrder('cancel_pending_order', data, userToken))
    }


    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Orders"}
                leftPress={() => props.navigation.goBack()} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(4), marginTop: wp(2) }}>
                <View style={{ width: "47%", }}>
                    <Button
                        onPress={() => setTickerData("Open")}
                        Text={'Open'}
                        height={52}
                        TextColor={selectedBtn === "Open" ? "#fff" : "rgba(255, 255, 255, 0.5)"}
                        backgroundColor={selectedBtn === "Open" ? "#979797" : "#BABABA"}
                    />
                </View>
                <View style={{ width: "47%" }}>
                    <Button
                        onPress={() => setTickerDataHistory("History")}
                        Text={'History'}
                        height={52}
                        TextColor={selectedBtn === "Open" ? "rgba(255, 255, 255, 0.5)" : "#fff"}
                        backgroundColor={selectedBtn === "Open" ? "#BABABA" : "#979797"}
                    />
                </View>
            </View>

            <View style={{ backgroundColor: "#979797", height: 46, marginTop: wp(4), flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(2) }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]} textAlign={"center"} color={"#fff"}>{"Date"}</ResponsiveText>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]} textAlign={"center"} color={"#fff"}>{"Ticker"}</ResponsiveText>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]} textAlign={"center"} color={"#fff"}>{"Order Type"}</ResponsiveText>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]} textAlign={"center"} color={"#fff"}>{"Price\n(MT)"}</ResponsiveText>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]} textAlign={"center"} color={"#fff"}>{"Qty\n(MT)"}</ResponsiveText>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]} textAlign={"center"} color={"#fff"}>{"Status"}</ResponsiveText>
                </View>

            </View>

            <FlatList
                data={selectedBtn === "Open" ? Order_List : Order_List_History}
                extraData={Order_List}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: wp(2) }}
                contentContainerStyle={{}}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <>
                        <Pressable onLongPress={() => cancelOrder(item)}
                            style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, height: 50, paddingHorizontal: wp(2) }}>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <ResponsiveText size="h10" fontFamily={fonts.Poppins_Medium} margin={[0, 0, 0, 0]} textAlign={"center"}>{item?.date?.split('T')[0]}</ResponsiveText>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <ResponsiveText size="h10" fontFamily={fonts.Poppins_Medium} margin={[0, 0, 0, 0]} textAlign={"center"}>{item?.ticker}</ResponsiveText>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <ResponsiveText size="h10" fontFamily={fonts.Poppins_Medium} margin={[0, 0, 0, 0]} textAlign={"center"}>{item?.type}</ResponsiveText>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <ResponsiveText size="h10" fontFamily={fonts.Poppins_Medium} margin={[0, 0, 0, 0]} textAlign={"center"}>{(item?.price * current_currency_rate).toFixed(1)}</ResponsiveText>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <ResponsiveText size="h10" fontFamily={fonts.Poppins_Medium} margin={[0, 0, 0, 0]} textAlign={"center"}>{item?.qty}</ResponsiveText>
                            </View>
                            <View style={{ flex: 1, alignItems: "center", flexDirection: "row", justifyContent: "center" }}>

                                <ResponsiveText size="h10" fontFamily={fonts.Poppins_Medium} color={item?.status === 0 ? "#DB1222" : item?.status === 1 ? "#F4BB32" : item?.status === 2 ? "#019146" : item?.status === 3 && "red"} textAlign={"center"}>{item?.status === 0 ? "Pending" : item?.status === 1 ? "Partial" : item?.status === 2 ? "Completed" : item?.status === 3 && "Rejected"}</ResponsiveText>
                                {selectedBtn === "Open" ?
                                    item?.status === 0 ?
                                        <Fonticon type={"Entypo"} name={"circle-with-cross"} size={18} color={Colors.black}
                                            style={{ marginLeft: 5 }}
                                            onPress={() => cancelOrder(item)}
                                        /> : null
                                    : null
                                }
                            </View>
                        </Pressable>
                        <View style={{ backgroundColor: "#ECECEC", height: 2, width: wp(100), marginVertical: wp(2) }} />
                    </>


                )} />


            <Modal
                style={{ flex: 1, }}
                animationType="slide"
                transparent={true}
                // visible={true}
                visible={cancelOrderModal}
                onRequestClose={() => { setCancelOrderModal(false) }}>
                <Pressable
                    style={{ width: '100%', height: '100%', justifyContent: 'center', alignSelf: 'center', borderRadius: 15, backgroundColor: "rgba(240, 244, 244, 0.4)", }}>
                    <View style={[styles.boxWithShadow, styles.inputContainer]}>
                        <View style={{ backgroundColor: "#fff", marginTop: -2, borderRadius: 20, width: wp(80) }}>
                            <Fonticon type={"Entypo"} name={"cross"} size={wp(4)} color={Colors.black} style={{ alignSelf: "flex-end", margin: 5 }}
                                onPress={() => setCancelOrderModal(false)}
                            />
                            <Fonticon type={"Entypo"} name={"circle-with-cross"} size={wp(22)} color={"red"} style={{ alignSelf: "center" }} />
                            {/* <ResponsiveText size="h3" fontFamily={fonts.Poppins_Bold} textAlign={"center"} margin={[wp(1), 0, 0, 0]}>{"Order Cancel!"}</ResponsiveText> */}
                            <Text style={{ color: "#000", textAlign: "center", marginTop: wp(1), width: wp(80), alignSelf: "center", fontFamily: fonts.Poppins, fontSize: 16 }}>Do you want to cancel Order</Text>
                            <View style={{ width: wp(20), marginTop: wp(5), flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
                                <Button
                                    onPress={() => setCancelOrderModal(false)}
                                    Text={'No'}
                                    fontFamily={fonts.Poppins_Medium}
                                    fontSize={16}
                                    TextColor={"rgb(180,180,180)"}
                                    backgroundColor={"transparent"}
                                />
                                <Button
                                    onPress={() => cancelOrderApi()}
                                    Text={'Yes'}
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

            <Loader loading={Order_Loading} />

        </View>
    )
}
export default Orders;
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
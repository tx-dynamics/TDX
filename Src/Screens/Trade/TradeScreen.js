import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Pressable, Modal } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../Components/Button';
import InputField from '../../Components/InputField';
import Loader from '../../Components/Loader';

import TradeHeading from './TradeHeading'
import ModalDropdown from 'react-native-modal-dropdown';
import {
    CREATE_ORDER,
} from '../../Redux/Constants'
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

import { useFocusEffect } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';
import {
    _getMarketList, _getSingleMarketData, _createOrder,
    _getOrdersHistory
} from '../../Redux/Actions/Actions';

const OrderType = [
    { id: "1", value: "Market" },
    { id: "2", value: "Limit" },
]
const OrderValidity = [
    { id: "1", value: "Day" },
    { id: "2", value: "GTC" },
    { id: "3", value: "GTD" },
]
const FullType = [
    { id: "1", value: "Partial" },
    { id: "2", value: "All Or None" },
    { id: "3", value: "Fill OR Kill" },
]

const TradeScreen = (props) => {

    const dispatch = useDispatch();

    const symbolDropDownRef = React.createRef(ModalDropdown);
    const marketDropDownRef = React.createRef(ModalDropdown);
    const harvestDropDownRef = React.createRef(ModalDropdown);
    const seasonDropDownRef = React.createRef(ModalDropdown);


    const [DateModal, setDateModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const [minDate, setMinDate] = useState('')
    const [callDate, setCallDate] = useState('')

    const [HarvestYear, setHarvestYear] = useState('')
    const [price, setPrice] = useState('')
    const [Season, setSeason] = useState('')
    const [DropDownItem1, setDropDownItem1] = useState('')
    const [DropDownItem, setDropDownItem] = useState('')
    const [orderFor, setOrderFor] = useState([])
    const [symbolData, setSymbolData] = useState([])
    const [selectedBtn, setSelectedBtn] = useState("Buy")
    const [orderTypeValue, setOrderTypeValue] = useState("Market")
    const [OrderValidityValue, setOrderValidityValue] = useState("Day")
    const [FullTypeValue, setFullTypeValue] = useState("Partial")
    const [AdvanceOptions, setAdvanceOptions] = useState(false)

    const [assetsDropdownShow, setAssetsDropdownShow] = useState(false)
    const [DropDownItemm, setDropDownItemm] = useState('')
    const [DropDownItemOrder, setDropDownItemOrder] = useState('')

    const [withdrawDropdownShow, setwithdrawDropdownShow] = useState(false)

    const [SuccessfulModal, setSuccessfulModal] = useState(false);
    const [wareHouseName, setWareHouseName] = useState('');
    const [wareHouseId, setWareHouseId] = useState('');
    const [marketId, setMarketId] = useState('');
    const [tickerId, setTickerId] = useState('');
    const [tickerSymbol, setTickerSymbol] = useState('');
    const [tickerTitle, setTickerTitle] = useState('');

    const [Quantity, setQuantity] = useState('');
    const [Bags, setBags] = useState("0");

    const [IsQuantityError, setIsQuantityError] = useState(false);
    const [sellOrdersList, setSellOrdersList] = useState([]);
    const [sellOrdersQtyList, setSellOrdersQtyList] = useState([]);

    const marketList = useSelector(state => state.HomeReducer.marketList);
    const singleMarketData = useSelector(state => state.HomeReducer.singleMarketData);
    const userToken = useSelector(state => state.AuthReducer.userToken);
    const orderCreated = useSelector(state => state.HomeReducer.orderCreated);
    const OrderLoading = useSelector(state => state.HomeReducer.OrderLoading);
    const Order_List_History = useSelector(state => state.HomeReducer.Order_List_History);


    useEffect(() => {
        var tomorrow = new Date();

        getMarketData()
        setMinDate(tomorrow.toISOString().split('T')[0])
        getSellOrderList()
        // alert(JSON.stringify(Order_List_History))
    }, [])

    const getSellOrderList = async () => {
        if (Order_List_History?.length > 0) {
            let Arr = []
            let Arr1 = []
            Order_List_History.map((item) =>
                Arr.push(item.ticker)
            )
            Order_List_History.map((item) =>
                Arr1.push(item.qty)
            )
            setSellOrdersList(Arr)
            setSellOrdersQtyList(Arr1)
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            getTickerDataHistory("history")
        }, [])
    );
    useEffect(() => {
        setMarkets()
    }, [marketList])
    useEffect(() => {
        setTickers()
    }, [singleMarketData])
    useEffect(() => {
        clearData()
    }, [OrderLoading])

    const clearData = async () => {
        setOrderTypeValue('Market')
        setMarketId('')
        setTickerId('')
        setTickerSymbol('')
        setWareHouseId('')
        setWareHouseName('')
        setQuantity('')
        setPrice('')
        setFullTypeValue("Partial")
        setOrderValidityValue("Day")
        setSelectedBtn("Buy")
        symbolDropDownRef.current.select(-1)
        marketDropDownRef.current.select(-1)
        harvestDropDownRef.current.select(-1)
        seasonDropDownRef.current.select(-1)
    }
    const getSingleMarketData = async (id) => {
        let data = {}
        let data1 = {}
        data1["searching"] = false;
        data1["filtering"] = false;
        data["token"] = userToken;
        data["search"] = data1;
        data["id"] = id;
        data["limit"] = 50;
        data["page"] = 1;
        await dispatch(_getSingleMarketData('get_markets', data))

        // alert(JSON.stringify(marketData.more_available))
    }
    const getMarketData = async () => {
        let data1 = {}
        await dispatch(_getMarketList('get_buy_sell_order_for_list', data1))

        // alert(JSON.stringify(marketList.markets))
        setOrderFor(marketList?.markets)
        // alert(JSON.stringify(tickerData))
    }
    const setTickers = async () => {
        setSymbolData(singleMarketData?.markets[0]?.tickers)
    }
    const setMarkets = async () => {
        setOrderFor(marketList.markets)
    }
    const renderButtonText = (rowData) => {
        const { id, title, pair } = rowData;
        return <View><Text style={styles.dropDown_textStyle}>{title}</Text></View>;
    }
    const renderDropDownList = (rowData) => {
        const { id, title, pair } = rowData;
        return (
            <View style={{ backgroundColor: "#fff" }}>
                <TouchableOpacity
                    // activeOpacity={.1}
                    activeOpacity={0.4}
                    underlayColor="#ffffff00"
                    //  underlayColor="gray" 
                    style={{ marginVertical: 10, }}>
                    <Text style={[{ fontSize: 15, color: "#000", fontFamily: fonts.Poppins }]}>{title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const OnOrderSelect = (item) => {
        getSingleMarketData(item.id)
        setMarketId(item.id)
        setDropDownItemOrder(DropDownItem)
        ClearSymbolSelect()
        let data = {}
        data["symbol"] = "";
        renderButtonText1(data)
        setSymbolData(["", ""])
        symbolDropDownRef.current.select(-1)
    }
    const ClearSymbolSelect = () => {
        setWareHouseName('')
        setWareHouseId('')
        setDropDownItem1('')
        setTickerId('')
        setTickerSymbol('')
        // alert("hello2")
    }
    const onSymbolSelect = (item) => {
        setWareHouseName(item?.warehouse?.title)
        setWareHouseId(item?.warehouse?.id)
        setDropDownItem1(DropDownItem)
        setTickerId(item?.id)
        setTickerSymbol(item?.symbol)
        setTickerTitle(item?.ticker)
        // alert(JSON.stringify(item?.ticker))
        // alert("hello2")
    }
    const renderButtonText1 = (rowData) => {
        const { symbol } = rowData;
        return <View><Text style={styles.dropDown_textStyle}>{symbol}</Text></View>;
    }
    const renderDropDownList1 = (rowData) => {
        const { id, symbol } = rowData;
        return (
            <View style={{ backgroundColor: "#fff" }}>
                <TouchableOpacity
                    // activeOpacity={.1}
                    activeOpacity={0.4}
                    underlayColor="#ffffff00"
                    //  underlayColor="gray" 
                    style={{ marginVertical: 10, }}>
                    <Text style={[{ fontSize: 15, color: "#000", fontFamily: fonts.Poppins }]}>{symbol}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const CreateOrderApi = async () => {

        if (marketId === '') {
            alert("Please Select Order")
        }
        else if (tickerId === '') {
            alert("Please Select Symbol")
        }
        else if (HarvestYear === '') {
            alert("Please Select Harvest Year")
        }
        else if (Season === '') {
            alert("Please Select Season")
        }
        else if ((Quantity === '' || IsQuantityError === true)) {
            setIsQuantityError(true)
        }
        else if ((orderTypeValue === 'Limit' && price === '')) {
            alert("Please Enter Price")
        }
        else {

            let data = {}
            data["token"] = userToken;
            data["type"] = selectedBtn.toLowerCase();
            data["order_type"] = orderTypeValue.toLowerCase();
            data["full_type"] = FullTypeValue.toLowerCase();
            data["order_validity"] = OrderValidityValue.toLowerCase();
            data["market_id"] = marketId;
            data["ticker_id"] = tickerId;
            data["price"] = price;
            data["qty"] = Quantity;
            data["symbol"] = tickerSymbol;
            data["harvest_year"] = HarvestYear;
            data["season"] = Season;
            data["warehouse_id"] = wareHouseId;
            data["gtd_date"] = callDate;
            data["advanced"] = 1;
            // alert(JSON.stringify(data))
            await dispatch(_createOrder('create_order', data))
        }
    }
    const CreateOrderApiBasic = async () => {
        // alert(selectedBtn.toLowerCase())
        setIsQuantityError(false)

        if (marketId === '') {
            alert("Please Select Order")
        }
        else if (tickerId === '') {
            alert("Please Select Commodity type")
        }
        else if ((Quantity === '' || IsQuantityError === true)) {
            setIsQuantityError(true)
        }
        else {
            let data = {}

            data["token"] = userToken;
            data["type"] = selectedBtn.toLowerCase();
            data["order_type"] = "market";
            data["full_type"] = FullTypeValue.toLowerCase();
            data["order_validity"] = OrderValidityValue.toLowerCase();
            data["market_id"] = marketId;
            data["ticker_id"] = tickerId;
            data["qty"] = Quantity;
            data["symbol"] = tickerSymbol;
            data["harvest_year"] = HarvestYear;
            data["season"] = Season;
            data["warehouse_id"] = wareHouseId;
            data["gtd_date"] = callDate;
            data["advanced"] = 0;

            // alert(JSON.stringify(data))
            await dispatch(_createOrder('create_order', data))

        }

    }
    const SellOrderApi = async () => {

        if (tickerTitle !== '') {
            var holder = {};
            Order_List_History?.forEach(function (d) {
                if (d?.type.includes("buy")) {
                    if (holder.hasOwnProperty(d?.ticker)) {
                        holder[d?.ticker] = holder[d.ticker] + parseFloat(d?.qty);
                    } else {
                        holder[d?.ticker] = parseFloat(d?.qty);
                    }
                }
            });
            var obj2 = [];
            for (var prop in holder) {
                obj2?.push({ name: prop, value: holder[prop] });
            }
            let newArr = []
            obj2.map((item) =>
                newArr.push(item?.name)
            )
            let index = newArr?.indexOf(tickerTitle);
            var totalQty = obj2[index]?.value;
        }

        if (marketId === '') {
            alert("Please Select Order")
        }
        else if (tickerId === '') {
            alert("Please Select Symbol")
        }
        else if (!sellOrdersList?.includes(tickerTitle)) {
            alert("You Can't Place Order for '" + tickerSymbol + "'")
        }
        else if (HarvestYear === '') {
            alert("Please Select Harvest Year")
        }
        else if (Season === '') {
            alert("Please Select Season")
        }
        else if ((Quantity === '' || IsQuantityError === true)) {
            setIsQuantityError(true)
        }
        else if (Quantity > totalQty) {
            setIsQuantityError(true)
        }
        else if ((orderTypeValue === 'Limit' && price === '')) {
            alert("Please Enter Price")
        }
        else {

            let data = {}
            data["token"] = userToken;
            data["type"] = selectedBtn.toLowerCase();
            data["order_type"] = orderTypeValue.toLowerCase();
            data["price"] = price;
            data["full_type"] = FullTypeValue.toLowerCase();
            data["order_validity"] = OrderValidityValue.toLowerCase();
            data["market_id"] = marketId;
            data["ticker_id"] = tickerId;
            data["qty"] = Quantity;
            data["symbol"] = tickerSymbol;
            data["harvest_year"] = HarvestYear;
            data["season"] = Season;
            data["warehouse_id"] = wareHouseId;
            data["gtd_date"] = callDate;
            data["advanced"] = 1;
            // alert(JSON.stringify(orderTypeValue))
            // alert(JSON.stringify(data))
            await dispatch(_createOrder('create_order', data))
        }
    }
    const SellOrderApiBasic = async () => {
        // alert(selectedBtn.toLowerCase())
        setIsQuantityError(false)

        if (tickerTitle !== '') {
            var holder = {};
            Order_List_History?.forEach(function (d) {
                if (d?.type.includes("buy")) {
                    if (holder.hasOwnProperty(d?.ticker)) {
                        holder[d?.ticker] = holder[d.ticker] + parseFloat(d?.qty);
                    } else {
                        holder[d?.ticker] = parseFloat(d?.qty);
                    }
                }
            });
            var obj2 = [];
            for (var prop in holder) {
                obj2?.push({ name: prop, value: holder[prop] });
            }
            let newArr = []
            obj2.map((item) =>
                newArr.push(item?.name)
            )
            let index = newArr?.indexOf(tickerTitle);
            var totalQty = obj2[index]?.value;
        }

        if (marketId === '') {
            alert("Please Select Order")
        }
        else if (tickerId === '') {
            alert("Please Select Commodity type")
        }
        else if (!sellOrdersList?.includes(tickerTitle)) {
            alert("You Can't Place Order for '" + tickerSymbol + "'")
            return
        }
        else if ((Quantity === '' || IsQuantityError === true)) {
            setIsQuantityError(true)
        }
        else if (Quantity > totalQty) {
            setIsQuantityError(true)
        }
        else {
            let data = {}

            data["token"] = userToken;
            data["type"] = selectedBtn.toLowerCase();
            data["order_type"] = "market";
            data["full_type"] = FullTypeValue.toLowerCase();
            data["order_validity"] = OrderValidityValue.toLowerCase();
            data["market_id"] = marketId;
            data["ticker_id"] = tickerId;
            data["qty"] = Quantity;
            data["symbol"] = tickerSymbol;
            data["harvest_year"] = HarvestYear;
            data["season"] = Season;
            data["warehouse_id"] = wareHouseId;
            data["gtd_date"] = callDate;
            data["advanced"] = 0;

            await dispatch(_createOrder('create_order', data))
        }

    }
    const setQuantityFun = (text) => {
        setIsQuantityError(false)
        setQuantity(text)
        let kilo = parseFloat(text) * 1000;
        let bag = kilo / 50;
        if (!isNaN(bag)) {
            setBags(bag)
            if (!Number.isInteger(bag)) {
                setIsQuantityError(true)
            }
        } else {
            setBags("0")
        }
        if (bag < 20) {
            setIsQuantityError(true)
        }
    }
    const dateSelect = async (day) => {
        // alert(JSON.stringify(day.dateString))
        setSelectedDate({ [day.dateString]: { selected: true, selectedColor: "#000" } })
        setDateModal(false)
        await setCallDate(day.dateString)

    }
    const selectOrderValidity = async (mode) => {
        setOrderValidityValue(mode)

        if (mode === "GTD") {
            setDateModal(true)
        }
    }
    const getTickerDataHistory = async (type) => {
        let data = {}
        data["token"] = userToken;
        data["type"] = type.toLowerCase();
        data["page"] = 1;
        data["limit"] = 50;
        await dispatch(_getOrdersHistory('get_orders', data))
    }


    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Trade"}
                leftPress={() => props.navigation.goBack()} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(4), marginTop: wp(2) }}>
                <View style={{ width: "47%", }}>
                    <Button
                        onPress={() => setSelectedBtn("Buy")}
                        Text={'Buy'}
                        TextColor={selectedBtn === "Buy" ? "#fff" : "rgba(255, 255, 255, 0.5)"}
                        backgroundColor={selectedBtn === "Buy" ? "#019146" : "#6FBF92"}
                    />
                </View>
                <View style={{ width: "47%" }}>
                    <Button
                        onPress={() => setSelectedBtn("Sell")}
                        Text={'Sell'}
                        TextColor={selectedBtn === "Sell" ? "#fff" : "rgba(255, 255, 255, 0.5)"}
                        backgroundColor={selectedBtn === "Sell" ? "#DB1222" : "#E6727F"}
                    />
                </View>
            </View>

            <ScrollView style={{ paddingHorizontal: wp(6), marginTop: 14 }}>

                <TradeHeading title={selectedBtn === "Buy" ? "Buy Order For :" : "Sell Order For :"} />

                <ModalDropdown options={orderFor}
                    // defaultValue={DropDownItemOrder}
                    ref={marketDropDownRef}
                    style={[styles.dropDown, { backgroundColor: assetsDropdownShow ? "#fff" : Colors.TextInputBackgroundColor, elevation: assetsDropdownShow ? 1 : 0 }]}
                    dropdownStyle={styles.dropDown_dropDownStyle1}
                    dropdownTextStyle={styles.dropDown_textStyle}
                    onDropdownWillShow={() => setAssetsDropdownShow(true)}
                    onDropdownWillHide={() => setAssetsDropdownShow(false)}
                    renderRow={(rowData, rowID) => renderDropDownList(rowData, rowID)}
                    renderButtonText={(rowData) => renderButtonText(rowData)}
                    textStyle={{ color: assetsDropdownShow ? "#fff" : "#000", marginLeft: 10, fontSize: wp(4), width: wp(78), fontFamily: fonts.Poppins, borderRadius: 11 }}
                    onSelect={(idx, DropDownItem) => OnOrderSelect(DropDownItem)}
                    renderRightComponent={() => (<Fonticon type={"AntDesign"} name={assetsDropdownShow ? "caretup" : "caretdown"} size={wp(4)} color={Colors.black} />)}
                />

                <TradeHeading title={AdvanceOptions ? "Symbol :" : "Commodity type :"} top={15} />

                <ModalDropdown options={symbolData}
                    ref={symbolDropDownRef}
                    style={[styles.dropDown, { backgroundColor: withdrawDropdownShow ? "#fff" : Colors.TextInputBackgroundColor, elevation: withdrawDropdownShow ? 1 : 0 }]}
                    dropdownStyle={[styles.dropDown_dropDownStyle1, { height: wp(40) }]}
                    dropdownTextStyle={styles.dropDown_textStyle}
                    onDropdownWillShow={() => setwithdrawDropdownShow(true)}
                    onDropdownWillHide={() => setwithdrawDropdownShow(false)}
                    renderRow={(rowData, rowID) => renderDropDownList1(rowData, rowID)}
                    renderButtonText={(rowData) => renderButtonText1(rowData)}
                    textStyle={{ color: withdrawDropdownShow ? "#fff" : "#000", marginLeft: 10, fontSize: wp(4), width: wp(78), fontFamily: fonts.Poppins }}
                    onSelect={(idx, DropDownItem) => onSymbolSelect(DropDownItem)}
                    renderRightComponent={() => (<Fonticon type={"AntDesign"} name={withdrawDropdownShow ? "caretup" : "caretdown"} size={wp(4)} color={Colors.black} />)}
                />



                {AdvanceOptions &&
                    <>


                        <TradeHeading title={"Warehouse :"} top={15} />
                        <InputField value={wareHouseName} editable={false} height={60} />

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View>
                                <TradeHeading title={"Harvest Year :"} top={15} />

                                <ModalDropdown options={['2022', '2021', '2020', '2019', '2018']}
                                    ref={harvestDropDownRef}
                                    style={styles.dropDown}
                                    defaultValue={'Any'}
                                    dropdownStyle={styles.dropDown_dropDownStyle}
                                    dropdownTextStyle={styles.dropDown_textStyle}
                                    textStyle={{ color: "#000", marginLeft: 10, fontSize: wp(4), width: wp(33), fontFamily: fonts.Poppins }}
                                    onSelect={(idx, DropDownItem) => setHarvestYear(DropDownItem)}
                                    renderRightComponent={() => (<Fonticon type={"AntDesign"} name={"caretdown"} size={wp(4)} color={Colors.black} style={styles.dropDownIcon} />)}
                                />
                            </View>

                            <View style={{ marginLeft: 10 }}>
                                <TradeHeading title={"Season :"} top={15} />

                                <ModalDropdown options={['1', '2', '3', '4']}
                                    ref={seasonDropDownRef}
                                    style={styles.dropDown}
                                    defaultValue={''}
                                    dropdownStyle={styles.dropDown_dropDownStyle}
                                    dropdownTextStyle={styles.dropDown_textStyle}
                                    textStyle={{ color: "#000", marginLeft: 10, fontSize: wp(4), width: wp(33), fontFamily: fonts.Poppins }}
                                    onSelect={(idx, DropDownItem) => setSeason(DropDownItem)}
                                    renderRightComponent={() => (<Fonticon type={"AntDesign"} name={"caretdown"} size={wp(4)} color={Colors.black} style={styles.dropDownIcon} />)}
                                />

                            </View>

                        </View>


                        <TradeHeading title={"Order Type :"} top={15} bottom={5} />
                        <View style={{ flexDirection: "row" }}>
                            {OrderType.map((item, index) =>
                                <Pressable onPress={() => setOrderTypeValue(item.value)}
                                    style={[styles.selectedStyle, {
                                        backgroundColor: orderTypeValue === item.value ? Colors.TextInputBackgroundColor : 'transparent',
                                        marginLeft: index !== 0 ? wp(10) : 0
                                    }]}>
                                    <Image source={orderTypeValue === item.value ? iconPath.greenRadioBtn : iconPath.darkRadioBtn} style={{ width: wp(4.5), height: wp(4.5), resizeMode: "contain" }} />
                                    <ResponsiveText size="h8" color={orderTypeValue === item.value ? "#000" : "#616161"} margin={[0, 0, 0, 6]}>{item.value}</ResponsiveText>
                                </Pressable>
                            )}
                        </View>
                    </>
                }

                {!AdvanceOptions &&
                    <>
                        <TradeHeading title={"Order Type :"} top={15} bottom={5} />
                        <View style={{
                            backgroundColor: Colors.TextInputBackgroundColor, alignItems: "center", alignSelf: "flex-start",
                            paddingHorizontal: wp(5), paddingVertical: wp(2), borderRadius: 15
                        }}>
                            <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium} margin={[0, 0, 0, 0]}>{"Market"}</ResponsiveText>
                        </View>
                    </>
                }

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                    <TradeHeading title={"Quantity (MT) :"} />
                    <TradeHeading title={"Bags: " + Bags} />
                </View>
                <InputField height={60}
                    value={Quantity}
                    onChangeText={text => setQuantityFun(text)}
                    keyboardType="number-pad"
                // onChangeText={text => setQuantity(text)}
                />

                {IsQuantityError ?
                    <Text style={{ color: 'red', fontSize: 13, marginLeft: 12, textAlign: 'center', marginTop: 1, fontFamily: fonts.Poppins }}>{"Please Enter Valid Quantity"}</Text>
                    :
                    <Text style={{ color: 'red', fontSize: 13, marginLeft: 12, textAlign: 'center', marginTop: 1, fontFamily: fonts.Poppins }}> {""}</Text>
                }



                {AdvanceOptions &&
                    <>
                        <TradeHeading title={"Price :"} top={0} />
                        <InputField height={60}
                            editable={orderTypeValue === "Market" ? false : true}
                            value={price}
                            onChangeText={(txt) => setPrice(txt)}
                        />

                        <TradeHeading title={"Order Validity :"} top={15} bottom={5} />
                        <View style={{ flexDirection: "row", }}>
                            {OrderValidity.map((item, index) =>
                                <Pressable onPress={() => selectOrderValidity(item.value)}
                                    style={[styles.selectedStyle, {
                                        backgroundColor: OrderValidityValue === item.value ? Colors.TextInputBackgroundColor : 'transparent',
                                        marginLeft: index !== 0 ? wp(9) : 0
                                    }]}>
                                    <Image source={OrderValidityValue === item.value ? iconPath.greenRadioBtn : iconPath.darkRadioBtn} style={{ width: wp(4.5), height: wp(4.5), resizeMode: "contain" }} />
                                    <ResponsiveText size="h8" color={OrderValidityValue === item.value ? "#000" : "#616161"} margin={[0, 0, 0, 6]}>{item.value}</ResponsiveText>
                                </Pressable>
                            )}
                        </View>

                        <TradeHeading title={"Fill Type :"} top={15} bottom={5} />
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            {FullType.map((item, index) =>
                                <Pressable onPress={() => setFullTypeValue(item.value)}
                                    style={[styles.selectedStyle, {
                                        backgroundColor: FullTypeValue === item.value ? Colors.TextInputBackgroundColor : 'transparent',
                                    }]}>
                                    <Image source={FullTypeValue === item.value ? iconPath.greenRadioBtn : iconPath.darkRadioBtn} style={{ width: wp(4.5), height: wp(4.5), resizeMode: "contain" }} />
                                    <ResponsiveText size="h8" color={FullTypeValue === item.value ? "#000" : "#616161"} margin={[0, 0, 0, 6]}>{item.value}</ResponsiveText>
                                </Pressable>
                            )}
                        </View>

                    </>
                }
                {!AdvanceOptions ?
                    <Pressable onPress={() => setAdvanceOptions(true)}>
                        <ResponsiveText size="h8" fontFamily={fonts.Poppins_Light} textAlign={"center"} margin={[wp(10), 0, wp(10), 0]}>{"Advance Options"}</ResponsiveText>
                    </Pressable>
                    :
                    <Pressable onPress={() => setAdvanceOptions(false)}>
                        <ResponsiveText size="h8" fontFamily={fonts.Poppins_Light} textAlign={"center"} margin={[wp(10), 0, wp(10), 0]}>{"Basic Options"}</ResponsiveText>
                    </Pressable>
                }

                {selectedBtn === "Buy" ?

                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(10), marginTop: wp(2), marginVertical: 20 }}>
                        <View style={{ width: "45%", }}>
                            <Button
                                onPress={() => { clearData() }}
                                Text={'Clear'}
                                fontFamily={fonts.Poppins_Medium}
                                fontSize={16}
                                height={44}
                                TextColor={"#6D6D6D"}
                                backgroundColor={"transparent"}
                            />
                        </View>
                        <View style={{ width: "45%" }}>
                            <Button
                                onPress={() => { AdvanceOptions ? CreateOrderApi() : CreateOrderApiBasic() }}
                                Text={'Submit'}
                                fontFamily={fonts.Poppins_Medium}
                                fontSize={16}
                                height={44}
                                backgroundColor={"#455154"}
                            />
                        </View>
                    </View>
                    :

                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(10), marginTop: wp(2), marginVertical: 20 }}>
                        <View style={{ width: "45%", }}>
                            <Button
                                onPress={() => clearData()}
                                Text={'Clear'}
                                fontFamily={fonts.Poppins_Medium}
                                fontSize={16}
                                height={44}
                                TextColor={"#6D6D6D"}
                                backgroundColor={"transparent"}
                            />
                        </View>
                        <View style={{ width: "45%" }}>
                            <Button
                                onPress={() => { AdvanceOptions ? SellOrderApi() : SellOrderApiBasic() }}
                                Text={'Submit'}
                                fontFamily={fonts.Poppins_Medium}
                                fontSize={16}
                                height={44}
                                backgroundColor={"#455154"}
                            />
                        </View>
                    </View>
                }

            </ScrollView>

            <Loader loading={OrderLoading} />


            <Modal
                transparent={true}
                animationType={'none'}
                visible={DateModal}
                onRequestClose={() => { console.log('close modal') }}>
                <Pressable
                    onPress={() => setDateModal(false)}
                    style={styles.modalBackground}>
                    <Pressable style={styles.activityIndicatorWrapper}>

                        <Calendar
                            onDayPress={(day) => dateSelect(day)}
                            current={new Date().toISOString().split('T')[0]}
                            // current={minDate}
                            markedDates={selectedDate}
                            minDate={minDate}
                            dayComponent={({ accessibilityLabel, date, state }) => {
                                return (
                                    (state) ?
                                        <Pressable>
                                            <Text style={{ color: "#858585", fontSize: 14, fontFamily: fonts.Poppins, padding: wp(2) }}>{date.day}</Text>
                                        </Pressable>
                                        :
                                        <Pressable onPress={() => dateSelect(date)}>
                                            <Text style={{
                                                color: date.dateString === callDate ? "#fff" : "#000",
                                                backgroundColor: date.dateString === callDate ? "#000" : "#fff",
                                                borderRadius: 50,
                                                paddingHorizontal: 12,
                                                paddingVertical: 5,
                                                fontSize: 14, fontFamily: fonts.Poppins, padding: wp(2),
                                            }}>{date.day}</Text>
                                        </Pressable>
                                );
                            }}
                            hideExtraDays={true}
                            style={{ width: wp(90) }}
                            theme={{
                                backgroundColor: 'transparent',
                                calendarBackground: 'transparent',
                                textSectionTitleColor: "gray",
                                // selectedDayBackgroundColor: 'green',
                                selectedDayTextColor: '#fff',
                                todayTextColor: '#00adf5',
                                dayTextColor: 'white',
                                textDisabledColor: '#858585',
                                textDayStyle: {
                                    color: "#000",
                                    fontSize: 14,
                                    fontFamily: fonts.Poppins,
                                },
                            }}
                            enableSwipeMonths={true}
                            pastScrollRange={1}
                        />
                    </Pressable>
                </Pressable>
            </Modal>

            <Modal
                style={{ flex: 1, }}
                animationType="slide"
                transparent={true}
                // visible={false}
                visible={orderCreated}
                onRequestClose={() => { dispatch({ type: CREATE_ORDER, payload: false }) }}>
                <Pressable onPress={() => dispatch({ type: CREATE_ORDER, payload: false })}
                    style={{ width: '100%', height: '100%', justifyContent: 'center', alignSelf: 'center', borderRadius: 15, backgroundColor: "rgba(240, 244, 244, 0.4)", }}>
                    <View style={[styles.boxWithShadow, styles.inputContainer]}>
                        <Image source={iconPath.WithdrawSuccess} style={{ width: wp(87), height: wp(40), borderTopRightRadius: 20, borderTopLeftRadius: 20 }}></Image>

                        <View style={{ backgroundColor: "#fff", marginTop: -2, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, width: wp(87), paddingBottom: 15 }}>
                            <ResponsiveText size="h5" fontFamily={fonts.Poppins_Bold} textAlign={"center"} margin={[wp(5), 0, 0, 0]}>{"Sucessfully order submitted"}</ResponsiveText>
                            <Text style={{ color: "#000", textAlign: "center", marginTop: wp(4), width: wp(80), alignSelf: "center", fontFamily: fonts.Poppins, fontSize: 13 }}>Your order request has been successfully submitted</Text>
                            <View style={{ paddingHorizontal: wp(5), marginTop: wp(8) }}>
                                <Button
                                    onPress={() => dispatch({ type: CREATE_ORDER, payload: false })}
                                    Text={'Done'}
                                    fontFamily={fonts.Poppins_Medium}
                                    fontSize={16}
                                />
                            </View>
                        </View>

                    </View>
                </Pressable>

            </Modal>

        </View>
    )
}
export default TradeScreen;
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
    selectedStyle: {
        alignItems: "center", paddingHorizontal: wp(3), paddingVertical: wp(2), borderRadius: 11,
        flexDirection: "row",
    },
    headingContainer: {
        paddingHorizontal: wp(4),
        backgroundColor: Colors.TextInputBackgroundColor,
        paddingVertical: 4,
        justifyContent: "center"
    },
    dropDown_dropDownStyle: {
        width: wp(42),
        borderWidth: 0,
        marginRight: wp(0.5)
    },
    dropDown_dropDownStyle1: {
        width: wp(88),
        borderWidth: 0,
        marginLeft: wp(0),
        borderRadius: 11,
        // paddingTop: 8,
        borderTopWidth: .1,
        elevation: .5,
        height: wp(30),
    },
    dropDown_textStyle: {
        fontSize: 15,
        color: "#000",
        fontFamily: fonts.Poppins
    },
    dropDown: {
        height: 60,
        justifyContent: "center",
        borderRadius: 4,
        backgroundColor: Colors.TextInputBackgroundColor,
        borderRadius: 10
    },
    dropDownIcon: {
        // width: wp(4.5),
        // height: "100%",
        // alignSelf: "flex-end",
        resizeMode: "contain",
        marginRight: 10,
        // marginTop: wp(-8)
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
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
        paddingHorizontal: wp(4)
    },
    activityIndicatorWrapper: {
        backgroundColor: "white",
        height: wp(120),
        width: "100%",
        borderRadius: 10,
        // display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        // paddingVertical:wp(6)
    }
})
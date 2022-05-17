import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Modal, Image, TouchableOpacity, Dimensions, FlatList, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';

import ModalDropdown from 'react-native-modal-dropdown';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../Components/Loader';
import Toast, { DURATION } from 'react-native-easy-toast'
import { _postTransaction, _getSingleMarketData } from '../../Redux/Actions/Actions';
import { DEPOSITE_WITHDRAW_ORDER } from '../../Redux/Constants';

const Withdraw = (props) => {

    const dispatch = useDispatch();

    const toastRef = React.createRef(Toast)
    const symbolDropDownRef = React.createRef(ModalDropdown);


    const userToken = useSelector(state => state.AuthReducer.userToken);
    const ChangePasswordLoading = useSelector(state => state.HomeReducer.ChangePasswordLoading);
    const AssetsDetails = useSelector(state => state.HomeReducer.AssetsDetails);
    const singleMarketData = useSelector(state => state.HomeReducer.singleMarketData);
    const Deposite_Withdraw_Created = useSelector(state => state.HomeReducer.Deposite_Withdraw_Created);

    const [DropDownItem, setDropDownItem] = useState('Cash')
    const [DropDownItemm, setDropDownItemm] = useState('Bank Account')
    const [DropDownItemmm, setDropDownItemmm] = useState('')
    const [MaxSellQuantity, setMaxSellQuantity] = useState(0);
    const [tickerId, setTickerId] = useState('');
    const [tickerTitle, setTickerTitle] = useState("");
    const [assetsDropdownShow, setAssetsDropdownShow] = useState(false)
    const [TickerDropdownShow, setTickerDropdownShow] = useState(false)
    const [withdrawDropdownShow, setwithdrawDropdownShow] = useState(false)

    const [DateModal, setDateModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const [minDate, setMinDate] = useState('')
    const [callDate, setCallDate] = useState('')

    const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState('')
    const [quantity, setQuantity] = useState('')
    const [tickerData, setTickerData] = useState([])
    const [selectedCashWithdrawType, setSelectedCashWithdrawType] = useState(false)

    const [IsQuantityError, setIsQuantityError] = useState(false);

    useEffect(() => {
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setMinDate(tomorrow.toISOString().split('T')[0])
        setCallDate(tomorrow.toISOString().split('T')[0])
        setSelectedDate({ [tomorrow.toISOString().split('T')[0]]: { selected: true, selectedColor: "#000" } })
        // setTickerValue()
        getSingleMarketData()
        // alert(new Date().toISOString().split('T')[0])
    }, [])

    useEffect(() => {
        // alert(JSON.stringify(singleMarketData))
        setTickerValuee()
    }, [singleMarketData])

    useEffect(() => {
        if (ChangePasswordLoading !== undefined) {
            setLoading(ChangePasswordLoading)
        } else {
            setLoading(false)
        }
    }, [ChangePasswordLoading])

    const getSingleMarketData = async () => {
        let data = {}
        let data1 = {}
        data1["searching"] = false;
        data1["filtering"] = false;
        data["token"] = userToken;
        data["search"] = data1;
        data["selling"] = 1;
        dispatch(_getSingleMarketData('get_markets', data))
        // alert(JSON.stringify(marketData.more_available))
    }

    const setTickerValuee = async () => {
        // alert(JSON.stringify(singleMarketData?.markets[0]?.tickers))
        if (singleMarketData?.markets?.length !== undefined) {
            if (singleMarketData?.markets?.length > 0) {
                let Tickerss = []
                singleMarketData?.markets.map((item) => {
                    item?.tickers?.map((itemm) =>
                        Tickerss.push(itemm)
                    )
                })
                // alert(JSON.stringify(Tickerss))
                setTickerData(Tickerss)
            }
        }
    }

    const renderDropDownList1 = (rowData) => {
        const { id, symbol, title, ticker } = rowData;
        return (
            <View style={{ backgroundColor: "#fff" }}>
                <View
                    // activeOpacity={.1}
                    activeOpacity={0.4}
                    underlayColor="#ffffff00"
                    //  underlayColor="gray" 
                    style={{ marginVertical: 10, }}>
                    <Text style={[{ fontSize: 15, color: "#000", fontFamily: fonts.Poppins }]}>{ticker}</Text>
                </View>
            </View>
        )
    }

    const renderButtonText1 = (rowData) => {
        const { symbol, ticker } = rowData;
        return <View><Text style={styles.dropDown_textStyle}>{ticker}</Text></View>;
    }

    const setTickerValue = async () => {
        if (AssetsDetails?.stocks?.length !== undefined) {
            if (AssetsDetails?.stocks?.length > 0) {
                let Tickerss = []
                AssetsDetails?.stocks[0]?.tickers?.map((item) =>
                    Tickerss.push(item?.ticker)
                )
                setTickerData(Tickerss)
            }
        }
    }

    const dateSelect = (day) => {
        setSelectedDate({ [day.dateString]: { selected: true, selectedColor: "#000" } })
        setDateModal(false)
        setCallDate(day.dateString)
    }

    const WithDrawFun = async () => {
        if (DropDownItem === 'Cash') {
            CashWithdraw()
        } else {
            CommodityWithdraw()
        }
    }

    const CommodityWithdraw = async () => {
        if (tickerTitle === "") {
            toastRef.current.show('Please Select Ticker', 2500);
        }
        else if ((quantity === '' || IsQuantityError === true)) {
            setIsQuantityError(true)
        }
        else if (quantity > MaxSellQuantity) {
            setIsQuantityError(true)
        }
        else {
            setSelectedCashWithdrawType(false)
            let data = {}
            data["token"] = userToken
            data["amount"] = quantity
            data["side"] = "withdraw"
            data["type"] = ''
            data["proof_id"] = ''
            data["image"] = ''
            data["withdraw_type"] = "commodity"
            data["withdraw_date"] = callDate
            data["ticker"] = tickerTitle
            data["ticker_id"] = tickerId
            data["notes"] = ""
            // alert(JSON.stringify(data))
            dispatch(_postTransaction('new_transaction', data))
            setAmount('')
            setQuantity('')
            symbolDropDownRef.current.select(-1)
            // alert(JSON.stringify(data))
        }
    }

    const CashWithdraw = async () => {

        if (amount === '') {
            toastRef.current.show('Please Enter Amount', 2500);
        } else {
            setSelectedCashWithdrawType(true)
            let data = {}
            data["token"] = userToken
            data["amount"] = amount
            data["side"] = "withdraw"
            data["type"] = DropDownItemm
            data["proof_id"] = ''
            data["image"] = ''
            data["withdraw_type"] = DropDownItem
            data["withdraw_date"] = ''
            data["ticker"] = ''
            data["ticker_id"] = ''
            dispatch(_postTransaction('new_transaction', data))
            setAmount('')
            // alert(JSON.stringify(data))
        }
    }

    const setTickerDataaa = (item) => {
        setTickerTitle(item?.ticker)
        setTickerId(item?.id)
        if (item?.my_stocks?.qty === null) {
            setMaxSellQuantity(0)
        } else {
            setMaxSellQuantity(parseFloat(item?.my_stocks?.qty))
        }
        // setDropDownItemmm(item)
    }

    const setQuantityFunSell = (text) => {
        setIsQuantityError(false)
        setQuantity(text)
        let kilo = parseFloat(text) * 1000;
        let bag = kilo / 50;
        if (!isNaN(bag)) {
            if (!Number.isInteger(bag)) {
                setIsQuantityError(true)
            }
        } else {
        }
        if (bag < 20) {
            setIsQuantityError(true)
        }
        // alert(text+"  "+MaxSellQuantity)
        if (text > MaxSellQuantity) {
            setIsQuantityError(true)
        }
    }


    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Withdrawal"}
                leftPress={() => props.navigation.goBack()} />
                <ScrollView>
            <View style={{ paddingHorizontal: wp(4), marginTop: wp(5), flex: 1 }}>
                <ResponsiveText size="h8" color={"#616161"} margin={[0, 0, 5, 0]}>{"Choose Asset :"}</ResponsiveText>
                <ModalDropdown options={['Cash', 'Commodity']}
                    defaultValue={DropDownItem}
                    style={[styles.dropDown, { backgroundColor: assetsDropdownShow ? "#fff" : Colors.TextInputBackgroundColor, elevation: assetsDropdownShow ? 1 : 0 }]}
                    dropdownStyle={styles.dropDown_dropDownStyle}
                    dropdownTextStyle={styles.dropDown_textStyle}
                    onDropdownWillShow={() => setAssetsDropdownShow(true)}
                    onDropdownWillHide={() => setAssetsDropdownShow(false)}
                    textStyle={{ color: assetsDropdownShow ? "#fff" : "#000", marginLeft: 10, fontSize: wp(4), width: wp(80), fontFamily: fonts.Poppins, borderRadius: 11 }}
                    onSelect={(idx, DropDownItem) => setDropDownItem(DropDownItem)}
                    renderRightComponent={() => (<Fonticon type={"AntDesign"} name={assetsDropdownShow ? "caretup" : "caretdown"} size={wp(4)} color={Colors.black} />)}
                />
                {DropDownItem === 'Cash' ?
                    <>
                        <ResponsiveText size="h8" color={"#616161"} margin={[15, 0, 5, 0]}>{"Enter Amount :"}</ResponsiveText>

                        <View style={{
                            backgroundColor: Colors.TextInputBackgroundColor, borderRadius: 5, flexDirection: "row",
                            paddingHorizontal: wp(4), alignItems: "center", borderRadius: 11
                        }}>

                            <ResponsiveText size="h8" color={"#000"} fontFamily={fonts.Poppins_SemiBold} >{DropDownItem === "Wire Transfer" ? "USD" : "GH₵"}</ResponsiveText>
                            <View style={{ backgroundColor: "#65656B", width: 1, height: 50, marginHorizontal: wp(2.5) }}></View>

                            <View style={{ width: "85%" }}>
                                <InputField
                                    backgroundColor={"transparent"}
                                    height={60}
                                    value={amount}
                                    onChangeText={txt => setAmount(txt)}
                                />
                            </View>
                        </View>


                        <ResponsiveText size="h8" color={"#616161"} margin={[15, 0, 5, 0]}>{"Withdrawl to :"}</ResponsiveText>
                        <ModalDropdown options={['Bank Account', 'MTN Mobile money', 'Wire Transfer']}
                            defaultValue={DropDownItemm}
                            style={[styles.dropDown, { backgroundColor: withdrawDropdownShow ? "#fff" : Colors.TextInputBackgroundColor, elevation: withdrawDropdownShow ? 1 : 0 }]}
                            dropdownStyle={[styles.dropDown_dropDownStyle, { height: wp(40) }]}
                            dropdownTextStyle={styles.dropDown_textStyle}
                            onDropdownWillShow={() => setwithdrawDropdownShow(true)}
                            onDropdownWillHide={() => setwithdrawDropdownShow(false)}
                            textStyle={{ color: withdrawDropdownShow ? "#fff" : "#000", marginLeft: 10, fontSize: wp(4), width: wp(80), fontFamily: fonts.Poppins }}
                            onSelect={(idx, DropDownItem) => setDropDownItemm(DropDownItem)}
                            renderRightComponent={() => (<Fonticon type={"AntDesign"} name={withdrawDropdownShow ? "caretup" : "caretdown"} size={wp(4)} color={Colors.black} />)}
                        />
                    </>

                    :
                    <>
                        <ResponsiveText size="h8" color={"#616161"} margin={[15, 0, 5, 0]}>{"Choose Ticker :"}</ResponsiveText>
                        <ModalDropdown options={tickerData}
                            ref={symbolDropDownRef}
                            defaultValue={DropDownItemmm}
                            style={[styles.dropDown, { backgroundColor: TickerDropdownShow ? "#fff" : Colors.TextInputBackgroundColor, elevation: TickerDropdownShow ? 1 : 0 }]}
                            dropdownStyle={[styles.dropDown_dropDownStyle, { height: wp(42) }]}
                            dropdownTextStyle={styles.dropDown_textStyle}
                            renderRow={(rowData, rowID) => renderDropDownList1(rowData, rowID)}
                            renderButtonText={(rowData) => renderButtonText1(rowData)}
                            onDropdownWillShow={() => setTickerDropdownShow(true)}
                            onDropdownWillHide={() => setTickerDropdownShow(false)}
                            textStyle={{ color: TickerDropdownShow ? "#fff" : "#000", marginLeft: 10, fontSize: wp(4), width: wp(80), fontFamily: fonts.Poppins }}
                            onSelect={(idx, DropDownItem) => setTickerDataaa(DropDownItem)}
                            renderRightComponent={() => (<Fonticon type={"AntDesign"} name={TickerDropdownShow ? "caretup" : "caretdown"} size={wp(4)} color={Colors.black} />)}
                        />

                        <ResponsiveText size="h8" color={"#616161"} margin={[15, 0, 5, 0]}>{"Enter Quantity (MT):"}</ResponsiveText>
                        <InputField
                            height={60}
                            value={quantity}
                            onChangeText={text => setQuantityFunSell(text)}
                        />

                        <View style={{ alignItems: "flex-end" }}>
                            <ResponsiveText size="h8" color={"#616161"} margin={[5, 0, 0, 0]}>{"Available Quantity: " + MaxSellQuantity}</ResponsiveText>
                        </View>
                        {IsQuantityError ?
                            <Text style={{ color: 'red', fontSize: 13, marginLeft: 12, textAlign: 'center', marginTop: 1, fontFamily: fonts.Poppins }}>{"Insufficent Stock Balance"}</Text>
                            :null
                        }

                        <ResponsiveText size="h8" color={"#616161"} margin={[5, 0, 5, 0]}>{"Choose Date of Withdrawal"}</ResponsiveText>
                        <Pressable onPress={() => setDateModal(true)}>
                            <InputField
                                height={60}
                                onPress={() => setDateModal(true)}
                                value={callDate}
                                secureText
                                RightImage
                                newImage={iconPath.calender}
                                editable={false} />
                        </Pressable>

                    </>
                }


                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(10), marginTop: wp(30), marginVertical: 20, }}>
                    <View style={{ width: "45%", }}>
                        <Button
                            onPress={() => props.navigation.goBack()}
                            Text={'Cancel'}
                            fontFamily={fonts.Poppins_Medium}
                            fontSize={16}
                            height={44}
                            TextColor={"#FFFFFF"}
                            backgroundColor={"#00000066"}
                        />
                    </View>
                    <View style={{ width: "45%" }}>
                        <Button
                            onPress={() => WithDrawFun()}
                            Text={'Submit'}
                            fontFamily={fonts.Poppins_Medium}
                            fontSize={16}
                            height={44}
                            backgroundColor={"#455154"}
                        />
                    </View>
                </View>
            </View>
            </ScrollView>

            <Modal
                transparent={true}
                animationType={'none'}
                visible={DateModal}
                onRequestClose={() => { console.log('close modal') }}>
                <Pressable
                    onPress={() => setDateModal(false)}
                    style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>

                        <Calendar
                            onDayPress={(day) => dateSelect(day)}
                            current={new Date().toISOString().split('T')[0]}
                            // current={minDate}
                            markedDates={selectedDate}
                            minDate={minDate}
                            hideExtraDays={true}
                            style={{ width: wp(90) }}
                            theme={styles.calenderTheme}
                            enableSwipeMonths={true}
                            pastScrollRange={1}
                        />

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
            <Loader loading={loading} />

            <Modal
                style={{ flex: 1 }}
                animationType="slide"
                transparent={true}
                // visible={true}
                visible={Deposite_Withdraw_Created}
                onRequestClose={() => { dispatch({ type: DEPOSITE_WITHDRAW_ORDER, payload: false }) }}>
                <Pressable onPress={() => dispatch({ type: DEPOSITE_WITHDRAW_ORDER, payload: false })}
                    style={{ width: '100%', height: '100%', justifyContent: 'center', alignSelf: 'center', borderRadius: 15, backgroundColor: "rgba(240, 244, 244, 0.4)", }}>
                    <View style={[styles.boxWithShadow1, styles.inputContainer1]}>
                        <View style={{ backgroundColor: "#fff", marginTop: -2, borderRadius: 20, width: wp(80) }}>
                            <Fonticon type={"Entypo"} name={"cross"} size={wp(4)} color={Colors.black} style={{ alignSelf: "flex-end", margin: 5 }}
                                onPress={() => dispatch({ type: DEPOSITE_WITHDRAW_ORDER, payload: false })}
                            />
                            <Fonticon type={"Feather"} name={"check-circle"} size={wp(22)} color={Colors.greenColor} style={{ alignSelf: "center" }} />
                            <ResponsiveText size="h3" fontFamily={fonts.Poppins_Bold} textAlign={"center"} margin={[wp(1), 0, 0, 0]}>{"Success!"}</ResponsiveText>
                            <Text style={{ color: "#000", textAlign: "center", marginTop: wp(1), width: wp(80), alignSelf: "center", fontFamily: fonts.Poppins, fontSize: 13 }}>{selectedCashWithdrawType === true ? "Withdrawals may be subject to bank charges.":"Your request has been successfully submitted"  }</Text>
                            <View style={{ width: wp(20), marginTop: wp(5), alignSelf: "center" }}>
                                <Button
                                    onPress={() => dispatch({ type: DEPOSITE_WITHDRAW_ORDER, payload: false })}
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

        </View>
    )
}
export default Withdraw;
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
        width: wp(92),
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
        fontFamily: fonts.Poppins,
    },
    dropDown: {
        height: 60,
        justifyContent: "center",
        borderRadius: 4,
        backgroundColor: Colors.TextInputBackgroundColor,
        borderRadius: 11,
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
    },
    calenderTheme: {
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
    },
    inputContainer1: {
        alignSelf: 'center',
        borderRadius: 18,
    },
    boxWithShadow1: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: "#fff"
    },

})
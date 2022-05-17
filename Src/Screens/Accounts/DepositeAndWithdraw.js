import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import Header from '../../Components/Header';
import { iconPath } from '../../Constants/icon';
import Button from '../../Components/Button';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import { fonts } from '../../Constants/Fonts';
import moment from 'moment';
import Loader from '../../Components/Loader';

import { useSelector, useDispatch } from 'react-redux';
import { _getDepositeWithdraw } from '../../Redux/Actions/Actions';


export default function DepositeAndWithdraw(props) {

    const dispatch = useDispatch();

    const [selectedBtn, setSelectedBtn] = useState("Deposit")
    const [depositHistory, setDepositHistory] = useState([])
    const [withdrawHistory, setWithdrawHistory] = useState([])

    const userToken = useSelector(state => state.AuthReducer.userToken);
    const TransationHistory = useSelector(state => state.HomeReducer.TransationHistory);
    const Transaction_Loading = useSelector(state => state.HomeReducer.Transaction_Loading);
    const current_currency_rate = useSelector(state => state.HomeReducer.current_currency_rate);
    const userInfo = useSelector(state => state.AuthReducer.userInfo);

    useEffect(() => {
        GetHistory()
    }, [])
    useEffect(() => {
        seperateTransaction()
    }, [TransationHistory])

    const seperateTransaction = async () => {
        let deposite = []
        let withdraw = []
        TransationHistory.map((item) => {
            if (item?.side === "deposit") {
                deposite.push(item)
            } else {
                withdraw.push(item)
            }
        })
        setDepositHistory(deposite)
        setWithdrawHistory(withdraw)
    }

    const GetHistory = async () => {
        let data = {}
        data["token"] = userToken;
        dispatch(_getDepositeWithdraw('get_transactions', data))
    }

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Deposits & Withdrawals"}
                leftPress={() => props.navigation.goBack()} />

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(4), marginTop: wp(2) }}>
                <View style={{ width: "47%", }}>
                    <Button
                        // onPress={() => setTickerData("Deposit")}
                        onPress={() => setSelectedBtn("Deposit")}
                        Text={'Deposits'}
                        height={52}
                        TextColor={selectedBtn === "Deposit" ? "#fff" : "rgba(255, 255, 255, 0.5)"}
                        backgroundColor={selectedBtn === "Deposit" ? "#979797" : "#BABABA"}
                    />
                </View>
                <View style={{ width: "47%" }}>
                    <Button
                        // onPress={() => setTickerDataHistory("Withdraw")}
                        onPress={() => setSelectedBtn("Withdraw")}
                        Text={'Withdrawals'}
                        height={52}
                        TextColor={selectedBtn === "Deposit" ? "rgba(255, 255, 255, 0.5)" : "#fff"}
                        backgroundColor={selectedBtn === "Deposit" ? "#BABABA" : "#979797"}
                    />
                </View>
            </View>

            <FlatList
                data={selectedBtn === "Deposit" ? depositHistory : withdrawHistory}
                // extraData={Order_List}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: wp(3) }}
                contentContainerStyle={{ paddingHorizontal: wp(5) }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <>
                        {/* 0 ? "#DB1222" : item?.status === 1 ? "#F4BB32" : item?.status === 2 ? "#019146" : */}
                        <View style={styles.notification}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                {selectedBtn === "Deposit" ?
                                    <ResponsiveText size="h8" margin={[0, 0, 0, 5]}>{item?.type}</ResponsiveText>
                                    :
                                    <ResponsiveText size="h8" margin={[0, 0, 0, 5]}>{item.type === "Bank Account"? item.type  + " " + item.withdraw_type: item.withdraw_type + " " + item.ticker}</ResponsiveText>
                                }
                                <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium} color={item?.status === 0 ? "#F4BB32" : item?.status === 1 ? "#019146" : item?.status === 2 && "#DB1222"} textAlign={"center"}>{item?.status_text}</ResponsiveText>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: wp(2) }}>
                                <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium} margin={[10, 0, 0, 5]}>{item?.withdraw_type.toLowerCase() === "commodity" ? "Quantity (MT):" : `${"Amount (GH₵)"}` }</ResponsiveText>
                                <ResponsiveText size="h8" margin={[10, 0, 0, 8]}>{item?.amount?.toFixed(1)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ResponsiveText>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                <View style={{ flexDirection: "row" }}>
                                    <ResponsiveText size="h11" margin={[10, 0, 0, 5]}>{"Requested Date:"}</ResponsiveText>
                                    <ResponsiveText size="h11" margin={[10, 0, 0, 8]}>{moment(item?.created_at).format('DD MMM YYYY')}</ResponsiveText>
                                </View>
                                {item?.withdraw_date !== "" ?
                                    <View style={{ flexDirection: "row" }}>
                                        <ResponsiveText size="h11" margin={[10, 0, 0, 5]}>{"Withrawal date"}</ResponsiveText>
                                        <ResponsiveText size="h11" margin={[10, 0, 0, 8]}>{moment(item?.withdraw_date).format('DD MMM YYYY')}</ResponsiveText>
                                    </View> : null}
                            </View>
                        </View>
                    </>
                )} />

            <Loader loading={Transaction_Loading} />

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    notification: {
        backgroundColor: "#EEEEEE", paddingHorizontal: wp(4), paddingVertical: wp(3), borderRadius: 8, marginBottom: 12
    }
})

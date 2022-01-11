import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import Header from '../../Components/Header';
import { iconPath } from '../../Constants/icon';
import Button from '../../Components/Button';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import { fonts } from '../../Constants/Fonts';

import { useSelector, useDispatch } from 'react-redux';
import { _getDepositeWithdraw } from '../../Redux/Actions/Actions';


export default function DepositeAndWithdraw(props) {

    const dispatch = useDispatch();

    const [selectedBtn, setSelectedBtn] = useState("Open")
    const [depositHistory, setDepositHistory] = useState([])
    const [withdrawHistory, setWithdrawHistory] = useState([])

    const userToken = useSelector(state => state.AuthReducer.userToken);
    const TransationHistory = useSelector(state => state.HomeReducer.TransationHistory);

    useEffect(() => {
        GetHistory()
    }, [])
    useEffect(() => {
        seperateTransaction()
        // alert(JSON.stringify(TransationHistory))
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
        // alert(JSON.stringify(deposite[0]))
    }

    const GetHistory = async () => {
        let data = {}
        data["token"] = userToken;
        await dispatch(_getDepositeWithdraw('get_transactions', data))
    }

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Deposite & Withdraw"}
                leftPress={() => props.navigation.goBack()} />

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(4), marginTop: wp(2) }}>
                <View style={{ width: "47%", }}>
                    <Button
                        // onPress={() => setTickerData("Deposit")}
                        onPress={() => setSelectedBtn("Deposit")}
                        Text={'Deposit'}
                        height={52}
                        TextColor={selectedBtn === "Deposit" ? "#fff" : "rgba(255, 255, 255, 0.5)"}
                        backgroundColor={selectedBtn === "Deposit" ? "#979797" : "#BABABA"}
                    />
                </View>
                <View style={{ width: "47%" }}>
                    <Button
                        // onPress={() => setTickerDataHistory("Withdraw")}
                        onPress={() => setSelectedBtn("Withdraw")}
                        Text={'Withdraw'}
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
                        <View style={styles.notification}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                <ResponsiveText size="h8" margin={[0, 0, 0, 5]}>{item?.type}</ResponsiveText>
                                <ResponsiveText size="h9" fontFamily={fonts.Poppins_Medium} color={item?.status === 0 ? "#DB1222" : item?.status === 1 ? "#F4BB32" : item?.status === 2 ? "#019146" : item?.status === 3 && "red"} textAlign={"center"}>{item?.status === 0 ? "Pending" : item?.status === 1 ? "Partial" : item?.status === 2 ? "Completed" : item?.status === 3 && "Rejected"}</ResponsiveText>
                            </View>
                            <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium} margin={[10, 0, 0, 5]}>{"Amount:"}</ResponsiveText>
                            <ResponsiveText size="h8" margin={[-3, 0, 0, 5]}>{item?.amount}</ResponsiveText>
                        </View>

                    </>
                )} />

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

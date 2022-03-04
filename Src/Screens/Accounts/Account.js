import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';

import { useSelector, useDispatch } from 'react-redux';
import { _getLatestAlerts } from '../../Redux/Actions/Actions';
import { useFocusEffect } from '@react-navigation/native';

const DATA = [
    {
        id: '1',
        title: 'Notifications',
        imgName: iconPath.notification,
        unread: false,
        unreadCount: "99+"
    },
    {
        id: '2',
        title: 'Alerts',
        imgName: iconPath.alerts,
        unread: true,
        unreadCount: "6"
    },
    {
        id: '3',
        title: 'Orders',
        imgName: iconPath.orders,
        unread: false

    },
    {
        id: '4',
        title: 'Deposit & Withdrawals',
        imgName: iconPath.depositeWithdraw,
        unread: false

    },
];

const Account = (props) => {
    const dispatch = useDispatch();

    const userToken = useSelector(state => state.AuthReducer.userToken);
    const userInfo = useSelector(state => state.AuthReducer.userInfo);
    const AlertsCount = useSelector(state => state.HomeReducer.AlertsCount);

    useFocusEffect(
        React.useCallback(() => {
            getAllAlerts()
        }, [])
    );

    const getAllAlerts = async () => {
        let data = {}
        data["token"] = userToken;
        dispatch(_getLatestAlerts('get_alerts_unread_count', data))
    }

    const Navigatee = (id) => {
        if (id === "3") {
            props.navigation.navigate("Orders")
        } else if (id === "2") {
            props.navigation.navigate("Alerts")
        } else if (id === "1") {
            props.navigation.navigate("Notifications")
        } else if (id === "4") {
            props.navigation.navigate("DepositeAndWithdraw")
        }
    }

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.drawerIcon}
                midtitle title={"Account"}
                leftPress={() => props.navigation.openDrawer()} />

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(4), marginTop: 13, alignItems: "center" }}>
                <View>
                    <ResponsiveText size="h4" fontFamily={fonts.Poppins_SemiBold} >{userInfo?.name}</ResponsiveText>
                    <ResponsiveText size="h8" margin={[-8, 0, 0, 0]} >{"ID: " + userInfo?.id}</ResponsiveText>
                </View>
                <Pressable onPress={() => props.navigation.navigate("SettingScreen")}>
                    {/* <Pressable onPress={() => alert("jhhhjj")}> */}
                    <Image source={iconPath.Drawer1} style={{ width: wp(6.3), height: wp(6.3), resizeMode: "contain" }} />
                </Pressable>
            </View>

            <FlatList
                data={DATA}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: wp(9) }}
                contentContainerStyle={{ paddingHorizontal: wp(5) }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <Pressable style={{
                        flexDirection: "row", backgroundColor: "#EEEEEE", paddingHorizontal: wp(4), justifyContent: "space-between",
                        alignItems: "center", paddingVertical: wp(6), borderRadius: 12, marginTop: 12
                    }}
                        onPress={() => Navigatee(item.id)}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image source={item.imgName} style={{ width: wp(5.6), height: wp(5.6), resizeMode: "contain" }} />
                            <ResponsiveText size="h8" margin={[0, 0, 0, 5]}>{item.title}</ResponsiveText>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {AlertsCount === 1 ?
                                item.unread &&
                                <View style={{ backgroundColor: "#DB1222", justifyContent: "center", paddingHorizontal: 6, borderRadius: 25, paddingVertical: 4 }}>
                                    <ResponsiveText size="h10" color={"#fff"} margin={[-5, 0, -5, 0]}>{""}</ResponsiveText>
                                </View> : null}
                            <Fonticon type={"MaterialIcons"} name={"navigate-next"} size={wp(7)} color={Colors.black} />
                        </View>

                    </Pressable>
                )} />

        </View>
    )
}
export default Account;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.white,
        // justifyContent: "center",
        // alignItems: "center"
    }
})
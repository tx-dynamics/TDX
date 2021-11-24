import React from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';

const DATA = [
    {
        id: '1',
        title: 'Notifications',
        imgName: iconPath.notification,
        unread: true,
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
                midtitle title={"Account"}
                leftPress={() => props.navigation.openDrawer()} />

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(4), marginTop: 13 }}>
                <View>
                    <ResponsiveText size="h4" fontFamily={fonts.Poppins_SemiBold} >{"John Doe"}</ResponsiveText>
                    <ResponsiveText size="h7" margin={[-8, 0, 0, 0]} >{"ID: 107461 "}</ResponsiveText>
                </View>
                <Pressable onPress={() => props.navigation.navigate("SettingScreen")}>
                    <Image source={iconPath.Drawer1} style={{ width: wp(7), height: wp(7), resizeMode: "contain" }} />
                </Pressable>
            </View>

            <FlatList
                data={DATA}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: wp(5) }}
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
                            <Image source={item.imgName} style={{ width: wp(7), height: wp(7), resizeMode: "contain" }} />
                            <ResponsiveText size="h7" margin={[0, 0, 0, 5]}>{item.title}</ResponsiveText>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {item.unread &&
                                <View style={{ backgroundColor: "#DB1222", justifyContent: "center", paddingHorizontal: 8, borderRadius: 25, paddingVertical: 7 }}>
                                    <ResponsiveText size="h9" color={"#fff"} margin={[-5, 0, -5, 0]}>{item.unreadCount}</ResponsiveText>
                                </View>}
                            <Fonticon type={"MaterialIcons"} name={"navigate-next"} size={wp(8)} color={Colors.black} />
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
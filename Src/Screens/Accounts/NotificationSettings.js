import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Switch, Dimensions, FlatList, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../../Components/Loader';


import { useSelector, useDispatch } from 'react-redux';
import { _updateNotificaion } from '../../Redux/Actions/Actions';

const NotificationSettings = (props) => {

    const dispatch = useDispatch();

    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const [isEnabled3, setIsEnabled3] = useState(false);

    const userInfo = useSelector(state => state.AuthReducer.userInfo);
    const userToken = useSelector(state => state.AuthReducer.userToken);
    const Notification_Loading = useSelector(state => state.HomeReducer.Notification_Loading);

    
    useEffect(() => {
        SetValues()
    }, [userInfo])

    const SetValues = () => {
        if (userInfo?.notif_deposits === 1) {
            setIsEnabled(true)
        } else {
            setIsEnabled(false)
        }
        if (userInfo?.notif_orders === 1) {
            setIsEnabled1(true)
        } else {
            setIsEnabled1(false)
        }
        if (userInfo?.notif_news === 1) {
            setIsEnabled2(true)
        } else {
            setIsEnabled2(false)
        }
        if (userInfo?.notif_apps === 1) {
            setIsEnabled3(true)
        } else {
            setIsEnabled3(false)
        }

    }
    
    const toggleSwitch = (val) => {
        // setIsEnabled(val);
        updateSetting(val)
    }
    const toggleSwitch1 = (val) => {
        // setIsEnabled1(val)
        updateSetting1(val)
    }
    const toggleSwitch2 = (val) => {
        // setIsEnabled2(val)
        updateSetting2(val)
    }
    const toggleSwitch3 = (val) => {
        // setIsEnabled3(val)
        updateSetting3(val)
    }

    const updateSetting = async (value) => {
        let data = {}
        data["token"] = userToken;
            if (value === true) {
                data["notif_deposits"] = 1;
            } else {
                data["notif_deposits"] = 0;
            }
            if (isEnabled1 === true) {
                data["notif_orders"] = 1;
            } else {
                data["notif_orders"] = 0;
            }
            if (isEnabled2 === true) {
                data["notif_news"] = 1;
            } else {
                data["notif_news"] = 0;
            }
            if (isEnabled3 === true) {
                data["notif_apps"] = 1;
            } else {
                data["notif_apps"] = 0;
            }
        // alert(JSON.stringify(data))
        await dispatch(_updateNotificaion('notification_settings', data, userToken))
    }
    const updateSetting1 = async (value) => {
        let data = {}
        data["token"] = userToken;
            if (isEnabled === true) {
                data["notif_deposits"] = 1;
            } else {
                data["notif_deposits"] = 0;
            }
            if (value === true) {
                data["notif_orders"] = 1;
            } else {
                data["notif_orders"] = 0;
            }
            if (isEnabled2 === true) {
                data["notif_news"] = 1;
            } else {
                data["notif_news"] = 0;
            }
            if (isEnabled3 === true) {
                data["notif_apps"] = 1;
            } else {
                data["notif_apps"] = 0;
            }
        // alert(JSON.stringify(data))
        await dispatch(_updateNotificaion('notification_settings', data, userToken))
    }
    const updateSetting2 = async (value) => {
        let data = {}
        data["token"] = userToken;
            if (isEnabled === true) {
                data["notif_deposits"] = 1;
            } else {
                data["notif_deposits"] = 0;
            }
            if (isEnabled1 === true) {
                data["notif_orders"] = 1;
            } else {
                data["notif_orders"] = 0;
            }
            if (value === true) {
                data["notif_news"] = 1;
            } else {
                data["notif_news"] = 0;
            }
            if (isEnabled3 === true) {
                data["notif_apps"] = 1;
            } else {
                data["notif_apps"] = 0;
            }
        // alert(JSON.stringify(data))
        await dispatch(_updateNotificaion('notification_settings', data, userToken))
    }
    const updateSetting3 = async (value) => {
        let data = {}
        data["token"] = userToken;
            if (isEnabled === true) {
                data["notif_deposits"] = 1;
            } else {
                data["notif_deposits"] = 0;
            }
            if (isEnabled1 === true) {
                data["notif_orders"] = 1;
            } else {
                data["notif_orders"] = 0;
            }
            if (isEnabled2 === true) {
                data["notif_news"] = 1;
            } else {
                data["notif_news"] = 0;
            }
            if (value === true) {
                data["notif_apps"] = 1;
            } else {
                data["notif_apps"] = 0;
            }
        // alert(JSON.stringify(data))
        await dispatch(_updateNotificaion('notification_settings', data, userToken))
    }
    

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Notification Settings"}
                leftPress={() => props.navigation.goBack()} />

            <View style={[styles.containerStyle, { marginTop: wp(6) }]}>
                <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{"Deposits & Withdrawals"}</ResponsiveText>
                <Switch
                    trackColor={{ false: "#95959B", true: Colors.greenColor }}
                    thumbColor={isEnabled ? "#fff" : "#fff"}
                    ios_backgroundColor="#95959B"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={styles.containerStyle}>
                <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{"Order Status"}</ResponsiveText>
                <Switch
                    trackColor={{ false: "#95959B", true: Colors.greenColor }}
                    thumbColor={isEnabled1 ? "#fff" : "#fff"}
                    ios_backgroundColor="#95959B"
                    onValueChange={toggleSwitch1}
                    value={isEnabled1}
                />
            </View>
            <View style={styles.containerStyle}>
                <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{"News"}</ResponsiveText>
                <Switch
                    trackColor={{ false: "#95959B", true: Colors.greenColor }}
                    thumbColor={isEnabled2 ? "#fff" : "#fff"}
                    ios_backgroundColor="#95959B"
                    onValueChange={toggleSwitch2}
                    value={isEnabled2}
                />
            </View>
            <View style={styles.containerStyle}>
                <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{"App Notififcations"}</ResponsiveText>
                <Switch
                    trackColor={{ false: "#95959B", true: Colors.greenColor }}
                    thumbColor={isEnabled3 ? "#fff" : "#fff"}
                    ios_backgroundColor="#95959B"
                    onValueChange={toggleSwitch3}
                    value={isEnabled3}
                />
            </View>
            <Loader loading={Notification_Loading} />

        </View>
    )
}
export default NotificationSettings;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.white,
        // justifyContent: "center",
        // alignItems: "center"
    },
    containerStyle: {
        backgroundColor: "#F4F4F4", flexDirection: "row", justifyContent: "space-between",
        padding: wp(4), marginHorizontal: wp(6), borderRadius: 5, alignItems: "center", marginTop: wp(4)
    },


})
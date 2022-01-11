import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';
import { ScrollView } from 'react-native-gesture-handler';

import ModalDropdown from 'react-native-modal-dropdown';

import { useSelector, useDispatch } from 'react-redux';

import { _updateCurrency } from '../../Redux/Actions/Actions';


const SettingScreen = (props) => {

    const dispatch = useDispatch();

    const [DropDownItem, setDropDownItem] = useState('USD')
    const [assetsDropdownShow, setAssetsDropdownShow] = useState(false)
    const [currencySign, setCurrencySign] = useState('')

    const userInfo = useSelector(state => state.AuthReducer.userInfo);
    const userToken = useSelector(state => state.AuthReducer.userToken);

    useEffect(() => {
        // alert(JSON.stringify(userInfo.currency))
        // alert(JSON.stringify(userInfo.currency_iso))
        setDropDownItem(userInfo?.currency_iso)
        setCurrencySign(userInfo?.currency)
    }, [])

    const changeCurrency = async(value) =>{
        setDropDownItem(value)
        let currencyS = '$';
        if (value === 'GHS') {
            setCurrencySign('GH₵')
            currencyS='GH₵'
        } else {
            setCurrencySign('$')
            currencyS='$'
        }
        let data = {}
        data["token"] = userToken;
        data["currency"] = currencyS;
        data["currency_iso"] = value;
        // alert(JSON.stringify(data))
        await dispatch(_updateCurrency('set_currency', data, userToken))


    }

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Settings"}
                leftPress={() => props.navigation.goBack()} />
            <ScrollView>

                <View style={[styles.headingContainer, { flexDirection: "row", justifyContent: "space-between" }]}>
                    <ResponsiveText size="h8" >{"Contact Details"}</ResponsiveText>
                    {/* <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium} >{"Edit Profile"}</ResponsiveText> */}
                </View>

                <View style={{ paddingHorizontal: wp(4), marginVertical: wp(4) }}>
                    <ResponsiveText size="h6" fontFamily={fonts.Poppins_SemiBold} >{userInfo?.name}</ResponsiveText>
                    {/* <ResponsiveText size="h8" margin={[-8, 0, 0, 0]} >{"ID: 107461 "}</ResponsiveText> */}
                </View>

                <View style={styles.headingContainer}>
                    <ResponsiveText size="h8" >{"Currency"}</ResponsiveText>
                </View>

                <View style={{
                    margin: wp(4), borderRadius: 5, flexDirection: "row", paddingHorizontal: wp(4), alignItems: "center",
                    backgroundColor: assetsDropdownShow ? "#fff" : "#F4F4F4", elevation: assetsDropdownShow ? 1 : 0
                }}>

                    <View style={{width:wp(8), alignItems:"center"}}>
                        <ResponsiveText size="h8" color={assetsDropdownShow ? "#fff" : "#6F7074"} fontFamily={fonts.Poppins_SemiBold} >{currencySign}</ResponsiveText>
                    </View>
                    <ModalDropdown options={['GHS', 'USD']}
                        defaultValue={DropDownItem}
                        style={[styles.dropDown, {}]}
                        dropdownStyle={styles.dropDown_dropDownStyle}
                        onDropdownWillShow={() => setAssetsDropdownShow(true)}
                        onDropdownWillHide={() => setAssetsDropdownShow(false)}
                        dropdownTextStyle={styles.dropDown_textStyle}
                        textStyle={{ color: assetsDropdownShow ? "#fff" : "#6F7074", marginLeft: 10, fontSize: wp(4), width: wp(69), fontFamily: fonts.Poppins, }}
                        onSelect={(idx, DropDownItem) => changeCurrency(DropDownItem)}
                        renderRightComponent={() => (<Fonticon type={"AntDesign"} name={assetsDropdownShow ? "caretup" : "caretdown"} size={wp(4)} color={Colors.black} />)}
                    />

                </View>


                <View style={[styles.headingContainer]}>
                    <ResponsiveText size="h8" >{"App Settings"}</ResponsiveText>
                </View>

                <Pressable onPress={() => props.navigation.navigate("NotificationSettings")}
                    style={styles.containerStyle}>
                    <Image source={iconPath.notificationDull} style={{ width: wp(5.5), height: wp(5.5), resizeMode: "contain" }} />
                    <ResponsiveText size="h8" color={"#6F7074"} margin={[0, 0, 0, 8]}>{"Notification Settings"}</ResponsiveText>
                </Pressable>


                <View style={styles.headingContainer}>
                    <ResponsiveText size="h8" >{"Security Settings"}</ResponsiveText>
                </View>
                <Pressable onPress={() => props.navigation.navigate("ChangePassword")}
                    style={styles.containerStyle}>
                    <Image source={iconPath.changePassword} style={{ width: wp(6), height: wp(6), resizeMode: "contain" }} />
                    <ResponsiveText size="h8" color={"#6F7074"} margin={[0, 0, 0, 8]}>{"Change Password"}</ResponsiveText>
                </Pressable>
                <View style={styles.headingContainer}>
                    <ResponsiveText size="h8" >{"General Settings"}</ResponsiveText>
                </View>
                <View style={styles.containerStyle}>
                    <Image source={iconPath.HelpDull} style={{ width: wp(6), height: wp(6), resizeMode: "contain" }} />
                    <ResponsiveText size="h8" color={"#6F7074"} margin={[0, 0, 0, 8]}>{"Help"}</ResponsiveText>
                </View>

            </ScrollView>

            <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", paddingBottom: 5 }}>
                <ResponsiveText size="h7" color={"#868686"} margin={[0, 0, 0, 8]}>{"V 1.0"}</ResponsiveText>
            </View>

        </View>
    )
}
export default SettingScreen;
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
        width: wp(92),
        borderWidth: 0,
        marginLeft: wp(-12),
        height: wp(26),

        // marginLeft: wp(0),
        borderRadius: 11,
        // paddingTop: 8,
        borderTopWidth: .1,
        elevation: .5,
        height: wp(30),
    },
    dropDown_textStyle: {
        fontSize: 15,
        color: "#6F7074",
        fontFamily: fonts.Poppins,
        paddingLeft: wp(4)
    },
    dropDown: {
        height: 50,
        justifyContent: "center",
        borderRadius: 4,
        // backgroundColor: Colors.TextInputBackgroundColor
    },
    dropDownIcon: {
        width: wp(3.8),
        height: "100%",
        alignSelf: "flex-end",
        resizeMode: "contain",
        marginRight: 10,
        marginTop: wp(-8)
    }

})
import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Pressable } from 'react-native'

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


const Deposite = (props) => {

    const [DropDownItem, setDropDownItem] = useState('Bank Deposit')
    const [assetsDropdownShow, setAssetsDropdownShow] = useState(false)

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Deposit"}
                leftPress={() => props.navigation.goBack()} />

            <View style={{ paddingHorizontal: wp(6), marginTop: wp(5), flex: 1 }}>
                <ResponsiveText size="h8" color={"#616161"} margin={[0, 0, 5, 0]}>{"Choose Deposit type :"}</ResponsiveText>
                <ModalDropdown options={['Bank Deposit', 'MTN Mobile money', 'Wire Transfer']}
                    defaultValue={DropDownItem}
                    style={styles.dropDown}
                    dropdownStyle={styles.dropDown_dropDownStyle}
                    onDropdownWillShow={() => setAssetsDropdownShow(true)}
                    onDropdownWillHide={() => setAssetsDropdownShow(false)}
                    dropdownTextStyle={styles.dropDown_textStyle}
                    textStyle={{ color: "#000", marginLeft: 10, fontSize: wp(4), width: wp(80), fontFamily: fonts.Poppins }}
                    onSelect={(idx, DropDownItem) => setDropDownItem(DropDownItem)}
                    renderRightComponent={() => (<Fonticon type={"AntDesign"} name={assetsDropdownShow ? "caretup" : "caretdown"} size={wp(4)} color={Colors.black} />)}
                />

                <ResponsiveText size="h8" color={"#616161"} margin={[15, 0, 5, 0]}>{"Enter Amount Deposited :"}</ResponsiveText>

                <View style={{
                    backgroundColor: Colors.TextInputBackgroundColor, borderRadius: 5, flexDirection: "row",
                    paddingHorizontal: wp(4), alignItems: "center", borderRadius: 11
                }}>

                    <ResponsiveText size="h8" color={"#000"} fontFamily={fonts.Poppins_SemiBold} >{DropDownItem === "Wire Transfer" ? "USD" :"GH₵"}</ResponsiveText>
                    <View style={{ backgroundColor: "#65656B", width: 1, height: 50, marginHorizontal: wp(2.5) }}></View>

                    <View style={{ width: "85%" }}>
                        <InputField
                            backgroundColor={"transparent"}
                            height={60} />
                    </View>
                </View>


                {DropDownItem === "Bank Deposit" ?
                    <>
                        <ResponsiveText size="h7" margin={[wp(12), 0, 0, 0]} color={"#000"} >{"Upload Pictures of Deposit Slip/Confirmation Document"}</ResponsiveText>
                        <Pressable style={{
                            backgroundColor: "#455154", alignItems: "center", height: 58,
                            justifyContent: "center", borderRadius: 11, marginTop: wp(2), flexDirection: "row"
                        }}>
                            <ResponsiveText size="h7" margin={[0, 6, 0, 0]} color={"#fff"} >{"Upload"}</ResponsiveText>
                            <Image source={iconPath.uploadWhite} style={{ width: wp(4), height: wp(4), resizeMode: "contain" }} />
                        </Pressable>
                    </>
                    :
                    <>
                        <ResponsiveText size="h8" color={"#616161"} margin={[15, 0, 5, 0]}>{"Enter Transaction ID :"}</ResponsiveText>
                        <InputField
                            height={60} />
                    </>
                }



                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(10), marginTop: wp(50), marginVertical: 20, }}>
                    <View style={{ width: "45%", }}>
                        <Button
                            Text={'Cancel'}
                            fontFamily={fonts.Poppins_Medium}
                            fontSize={16}
                            TextColor={"#FFFFFF"}
                            height={44}
                            backgroundColor={"#00000066"}
                        />
                    </View>
                    <View style={{ width: "45%", }}>
                        <Button
                            Text={'Submit'}
                            fontFamily={fonts.Poppins_Medium}
                            fontSize={16}
                            height={44}
                            backgroundColor={"#455154"}
                        />
                    </View>
                </View>




            </View>
        </View>
    )
}
export default Deposite;
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
        width: wp(89),
        borderWidth: 0,
        marginLeft: wp(1),
        borderRadius: 11,
        paddingTop: 8

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
        borderRadius: 11
    },
    dropDownIcon: {
        width: wp(4.5),
        height: "100%",
        alignSelf: "flex-end",
        resizeMode: "contain",
        marginRight: 10,
        marginTop: wp(-8)
    }

})
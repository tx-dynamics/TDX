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


const Withdraw = (props) => {

    const [DropDownItem, setDropDownItem] = useState('Cash')
    const [DropDownItemm, setDropDownItemm] = useState('Bank Account')
    const [DropDownItemmm, setDropDownItemmm] = useState('GWASYB1')
    const [assetsDropdownShow, setAssetsDropdownShow] = useState(false)
    const [TickerDropdownShow, setTickerDropdownShow] = useState(false)
    const [withdrawDropdownShow, setwithdrawDropdownShow] = useState(false)

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Withdrawal"}
                leftPress={() => props.navigation.goBack()} />

            <View style={{ paddingHorizontal: wp(4), marginTop: wp(5), flex: 1 }}>
                <ResponsiveText size="h8" color={"#616161"} margin={[0, 0, 5, 0]}>{"Choose Asset :"}</ResponsiveText>
                <ModalDropdown options={['Cash', 'Commodity']}
                    defaultValue={DropDownItem}
                    style={[styles.dropDown, { backgroundColor: assetsDropdownShow ? "#fff" : Colors.TextInputBackgroundColor }]}
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
                                    height={60} />
                            </View>
                        </View>


                        <ResponsiveText size="h8" color={"#616161"} margin={[15, 0, 5, 0]}>{"Withdrawl to :"}</ResponsiveText>
                        <ModalDropdown options={['Bank Account', 'Option 2', 'Option 3']}
                            defaultValue={DropDownItemm}
                            style={[styles.dropDown, { backgroundColor: withdrawDropdownShow ? "#fff" : Colors.TextInputBackgroundColor }]}
                            dropdownStyle={styles.dropDown_dropDownStyle}
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
                        <ModalDropdown options={['GWASYB1', 'Option 2', 'Option 3']}
                            defaultValue={DropDownItemmm}
                            style={[styles.dropDown, { backgroundColor: TickerDropdownShow ? "#fff" : Colors.TextInputBackgroundColor }]}
                            dropdownStyle={styles.dropDown_dropDownStyle}
                            dropdownTextStyle={styles.dropDown_textStyle}
                            onDropdownWillShow={() => setTickerDropdownShow(true)}
                            onDropdownWillHide={() => setTickerDropdownShow(false)}
                            textStyle={{ color: TickerDropdownShow ? "#fff" : "#000", marginLeft: 10, fontSize: wp(4), width: wp(80), fontFamily: fonts.Poppins }}
                            onSelect={(idx, DropDownItem) => setDropDownItemmm(DropDownItem)}
                            renderRightComponent={() => (<Fonticon type={"AntDesign"} name={TickerDropdownShow ? "caretup" : "caretdown"} size={wp(4)} color={Colors.black} />)}
                        />

                        <ResponsiveText size="h8" color={"#616161"} margin={[15, 0, 5, 0]}>{"Enter Quantity :"}</ResponsiveText>
                        <InputField
                            height={60} />


                        <ResponsiveText size="h8" color={"#616161"} margin={[15, 0, 5, 0]}>{"Choose Date of Withdrawl"}</ResponsiveText>
                        <InputField
                            height={60}
                            secureText
                            RightImage
                            newImage={iconPath.calender} />


                    </>
                }




                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(10), marginTop: wp(60), marginVertical: 20, }}>
                    <View style={{ width: "45%", }}>
                        <Button
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
export default Withdraw;
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
        fontFamily: fonts.Poppins,
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
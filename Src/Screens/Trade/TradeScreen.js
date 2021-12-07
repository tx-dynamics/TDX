import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Pressable, Modal } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../Components/Button';
import InputField from '../../Components/InputField';
import TradeHeading from './TradeHeading'
import ModalDropdown from 'react-native-modal-dropdown';

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

    const [DropDownItem, setDropDownItem] = useState('')
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

                <ModalDropdown options={['Option 1', 'Option 2', 'Option 3']}
                    defaultValue={DropDownItemOrder}
                    style={[styles.dropDown, { backgroundColor: assetsDropdownShow ? "#fff" : Colors.TextInputBackgroundColor, elevation: assetsDropdownShow ? 1 : 0 }]}
                    dropdownStyle={styles.dropDown_dropDownStyle1}
                    dropdownTextStyle={styles.dropDown_textStyle}
                    onDropdownWillShow={() => setAssetsDropdownShow(true)}
                    onDropdownWillHide={() => setAssetsDropdownShow(false)}
                    textStyle={{ color: assetsDropdownShow ? "#fff" : "#000", marginLeft: 10, fontSize: wp(4), width: wp(78), fontFamily: fonts.Poppins, borderRadius: 11 }}
                    onSelect={(idx, DropDownItem) => setDropDownItemOrder(DropDownItem)}
                    renderRightComponent={() => (<Fonticon type={"AntDesign"} name={assetsDropdownShow ? "caretup" : "caretdown"} size={wp(4)} color={Colors.black} />)}
                />


                {!AdvanceOptions &&
                    <>
                        <TradeHeading title={"Commodity type :"} top={15} />
                        <InputField height={60} />
                    </>
                }
                {AdvanceOptions &&
                    <>
                        <TradeHeading title={"Symbol :"} top={15} />

                        <ModalDropdown options={['Option 1', 'Option 2', 'Option 3']}
                            defaultValue={DropDownItemm}
                            style={[styles.dropDown, { backgroundColor: withdrawDropdownShow ? "#fff" : Colors.TextInputBackgroundColor, elevation: withdrawDropdownShow ? 1 : 0 }]}
                            dropdownStyle={[styles.dropDown_dropDownStyle1, { height: wp(40) }]}
                            dropdownTextStyle={styles.dropDown_textStyle}
                            onDropdownWillShow={() => setwithdrawDropdownShow(true)}
                            onDropdownWillHide={() => setwithdrawDropdownShow(false)}
                            textStyle={{ color: withdrawDropdownShow ? "#fff" : "#000", marginLeft: 10, fontSize: wp(4), width: wp(78), fontFamily: fonts.Poppins }}
                            onSelect={(idx, DropDownItem) => setDropDownItemm(DropDownItem)}
                            renderRightComponent={() => (<Fonticon type={"AntDesign"} name={withdrawDropdownShow ? "caretup" : "caretdown"} size={wp(4)} color={Colors.black} />)}
                        />

                        {/* <InputField height={60} /> */}
                        <TradeHeading title={"Warehouse :"} top={15} />
                        <InputField value={DropDownItemm} editable={false} height={60} />

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View>
                                <TradeHeading title={"Harvest Year :"} top={15} />

                                <ModalDropdown options={['option', 'option']}
                                    style={styles.dropDown}
                                    defaultValue={'Any'}
                                    dropdownStyle={styles.dropDown_dropDownStyle}
                                    dropdownTextStyle={styles.dropDown_textStyle}
                                    textStyle={{ color: "#000", marginLeft: 10, fontSize: wp(4), width: wp(33), fontFamily: fonts.Poppins }}
                                    onSelect={(idx, DropDownItem) => setDropDownItem(DropDownItem)}
                                    renderRightComponent={() => (<Fonticon type={"AntDesign"} name={"caretdown"} size={wp(4)} color={Colors.black} style={styles.dropDownIcon} />)}
                                />

                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <TradeHeading title={"Season :"} top={15} />

                                <ModalDropdown options={['option', 'option']}
                                    style={styles.dropDown}
                                    defaultValue={''}
                                    dropdownStyle={styles.dropDown_dropDownStyle}
                                    dropdownTextStyle={styles.dropDown_textStyle}
                                    textStyle={{ color: "#000", marginLeft: 10, fontSize: wp(4), width: wp(33), fontFamily: fonts.Poppins }}
                                    onSelect={(idx, DropDownItem) => setDropDownItem(DropDownItem)}
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
                    <TradeHeading title={"Bags: 00"} />
                </View>
                <InputField height={60} />

                {AdvanceOptions &&
                    <>


                        <TradeHeading title={"Price :"} top={15} />
                        <InputField height={60}
                            editable={orderTypeValue === "Market" ? false : true}
                        />

                        <TradeHeading title={"Order Validity :"} top={15} bottom={5} />
                        <View style={{ flexDirection: "row", }}>
                            {OrderValidity.map((item, index) =>
                                <Pressable onPress={() => setOrderValidityValue(item.value)}
                                    style={[styles.selectedStyle, {
                                        backgroundColor: OrderValidityValue === item.value ? Colors.TextInputBackgroundColor : 'transparent',
                                        marginLeft: index !== 0 ? wp(9) : 0
                                    }]}>
                                    <Image source={OrderValidityValue === item.value ? iconPath.greenRadioBtn : iconPath.darkRadioBtn} style={{ width: wp(4.5), height: wp(4.5), resizeMode: "contain" }} />
                                    <ResponsiveText size="h8" color={OrderValidityValue === item.value ? "#000" : "#616161"} margin={[0, 0, 0, 6]}>{item.value}</ResponsiveText>
                                </Pressable>
                            )}
                        </View>

                        <TradeHeading title={"Full Type :"} top={15} bottom={5} />
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

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(10), marginTop: wp(2), marginVertical: 20 }}>
                    <View style={{ width: "45%", }}>
                        <Button
                            onPress={() => setSelectedBtn("Buy")}
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
                            onPress={() => setSuccessfulModal(true)}
                            Text={'Submit'}
                            fontFamily={fonts.Poppins_Medium}
                            fontSize={16}
                            height={44}
                            backgroundColor={"#455154"}
                        />
                    </View>
                </View>

            </ScrollView>



            <Modal
                style={{ flex: 1, }}
                animationType="slide"
                transparent={true}
                visible={SuccessfulModal}
                onRequestClose={() => { setSuccessfulModal(false) }}>
                <Pressable onPress={() => setSuccessfulModal(false)}
                    style={{ width: '100%', height: '100%', justifyContent: 'center', alignSelf: 'center', borderRadius: 15, backgroundColor: "rgba(240, 244, 244, 0.4)", }}>
                    <View style={[styles.boxWithShadow, styles.inputContainer]}>
                        <Image source={iconPath.WithdrawSuccess} style={{ width: wp(87), height: wp(40), borderTopRightRadius: 20, borderTopLeftRadius: 20 }}></Image>

                        <View style={{ backgroundColor: "#fff", marginTop: -2, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, width: wp(87), paddingBottom: 15 }}>
                            <ResponsiveText size="h5" fontFamily={fonts.Poppins_Bold} textAlign={"center"} margin={[wp(5), 0, 0, 0]}>{"Sucessfully order submitted"}</ResponsiveText>
                            <Text style={{ color: "#000", textAlign: "center", marginTop: wp(4), width: wp(80), alignSelf: "center", fontFamily: fonts.Poppins, fontSize: 13 }}>Your order request has been successfully submitted</Text>
                            <View style={{ paddingHorizontal: wp(5), marginTop: wp(8) }}>
                                <Button
                                    onPress={() => setSuccessfulModal(false)}
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
})
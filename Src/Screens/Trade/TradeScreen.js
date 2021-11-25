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
                        backgroundColor={selectedBtn === "Buy" ? "#019146" : "#6FBF92"}
                    />
                </View>
                <View style={{ width: "47%" }}>
                    <Button
                        onPress={() => setSelectedBtn("Sell")}
                        Text={'Sell'}
                        backgroundColor={selectedBtn === "Sell" ? "#DB1222" : "#E6727F"}
                    />
                </View>
            </View>

            <ScrollView style={{ paddingHorizontal: wp(4), marginTop: 14 }}>

                <TradeHeading title={selectedBtn === "Buy" ? "Buy Order For :" : "Sell Order For :"} />
                <InputField
                    height={60}
                // value={EmailAdd}
                // onChangeText={(EmailAdd) => setEmailAdd(EmailAdd)}
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
                        <InputField height={60} />
                        <TradeHeading title={"Warehouse :"} top={15} />
                        <InputField value={"Any"} editable={false} height={60} />

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View>
                                <TradeHeading title={"Harvest Year :"} top={15} />

                                <ModalDropdown options={['option', 'option']}
                                    style={styles.dropDown}
                                    defaultValue={'Any'}
                                    dropdownStyle={styles.dropDown_dropDownStyle}
                                    dropdownTextStyle={styles.dropDown_textStyle}
                                    textStyle={{ color: "#6F7074", marginLeft: 10, fontSize: wp(4), width: wp(33), fontFamily: fonts.Poppins }}
                                    onSelect={(idx, DropDownItem) => setDropDownItem(DropDownItem)}
                                    renderRightComponent={() => (<Image source={iconPath.DROPDOWN} style={styles.dropDownIcon} />)}
                                />

                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <TradeHeading title={"Season :"} top={15} />

                                <ModalDropdown options={['option', 'option']}
                                    style={styles.dropDown}
                                    defaultValue={''}
                                    dropdownStyle={styles.dropDown_dropDownStyle}
                                    dropdownTextStyle={styles.dropDown_textStyle}
                                    textStyle={{ color: "#6F7074", marginLeft: 10, fontSize: wp(4), width: wp(33), fontFamily: fonts.Poppins }}
                                    onSelect={(idx, DropDownItem) => setDropDownItem(DropDownItem)}
                                    renderRightComponent={() => (<Image source={iconPath.DROPDOWN} style={styles.dropDownIcon} />)}
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
                        <InputField height={60} />

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
                            fontSize={18}
                            TextColor={"#6D6D6D"}
                            backgroundColor={"transparent"}
                        />
                    </View>
                    <View style={{ width: "45%" }}>
                        <Button
                            Text={'Submit'}
                            fontFamily={fonts.Poppins_Medium}
                            fontSize={18}
                            backgroundColor={"#455154"}
                        />
                    </View>
                </View>

            </ScrollView>


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
    dropDown_textStyle: {
        fontSize: 15,
        color: "#6F7074",
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
        width: wp(4.5),
        height: "100%",
        alignSelf: "flex-end",
        resizeMode: "contain",
        marginRight: 10,
        marginTop: wp(-8)
    }
})
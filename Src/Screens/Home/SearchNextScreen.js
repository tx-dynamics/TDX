import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Pressable } from 'react-native'

import Fonticon from '../../Constants/FontIcon';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import ModalDropdown from 'react-native-modal-dropdown';

import { Colors } from '../../Constants/Colors';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import { fonts } from '../../Constants/Fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import { _axiosPostAPI } from '../../Apis/Apis';
import Toast from 'react-native-toast-message';

const SearchNextScreen = (props) => {

    const dispatch = useDispatch();

    const [DropDownItem, setDropDownItem] = useState('')
    const [DropDownItemm, setDropDownItemm] = useState('W10')

    const userToken = useSelector(state => state.AuthReducer.userToken);

    useEffect(() => {
        // alert(JSON.stringify(props.route?.params?.SelectedMarket.tickers))
        // alert(JSON.stringify(props.route?.params?.SelectedMarket))
    }, [])

    const renderDropDownList1 = (rowData) => {
        const { id, symbol, ticker, title } = rowData;
        return (
            <View style={{ backgroundColor: "#fff" }}>
                <TouchableOpacity
                    activeOpacity={0.4}
                    underlayColor="#ffffff00"
                    style={{ marginVertical: 10, marginLeft: 8 }}>
                    <Text style={[{ fontSize: 15, color: "#000", fontFamily: fonts.Poppins }]}>{title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const renderButtonText1 = (rowData) => {
        const { id, symbol, ticker, title } = rowData;
        return <View><Text style={[styles.dropDown_textStyle, { color: "#000", fontSize: wp(4), }]}>{title}</Text></View>;
    }
    const getSearchedTicker = async () => {

        if (DropDownItem !== '') {
            // alert(DropDownItemm)
            let data = {}
            let data1 = {}
            data1["searching"] = true;
            data1["search_text"] = DropDownItem;
            data1["filtering"] = true;
            data1["filter_type"] = "Warehouse";
            data1["filter_value"] = DropDownItemm;
            data["token"] = userToken;
            data["search"] = data1;
            data["filters"] = [];
            try {
                await _axiosPostAPI('get_markets', data)
                    .then(async (response) => {
                        if (response.action === "success") {
                            // alert(JSON.stringify(response.data))
                            if (response?.data?.markets?.length > 0) {
                                props.navigation.navigate("SearchDetails", { allData: response?.data?.markets })
                            } else {
                                Toast.show({ type: "message", position: "bottom", props: { body: "No Result Found" } })
                            }
                        } else {
                            console.log(JSON.stringify(response.error))
                        }
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err))
                    })
            } catch (error) {
                console.log(JSON.stringify(error))
            }
        } else {
            Toast.show({ type: "message", position: "bottom", props: { body: "Please Select Type" } })
        }
    }


    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                right RightIconType={"Entypo"} RightIconName={"cross"}
                leftPress={() => props.navigation.goBack()}
                RightPress={() => props.navigation.goBack()} />
            <Pressable
                style={{ marginTop: wp(4), alignSelf: "center", alignItems: "center" }}>
                <Image source={{ uri: props.route?.params?.SelectedMarket.image_url }} style={{ width: wp(17), height: wp(17), resizeMode: "contain" }} />
                <ResponsiveText size="h4" margin={[0, 0, 0, 0]} >{props.route?.params?.SelectedMarket?.title}</ResponsiveText>
            </Pressable>
            <View style={{ paddingHorizontal: wp(4), marginTop: wp(10), flex: 1 }}>

                <ResponsiveText size="h7" fontFamily={fonts.Poppins_SemiBold} margin={[0, 0, 5, 0]}>{"Choose Type"}</ResponsiveText>

                <ModalDropdown options={props.route?.params?.SelectedMarket?.tickers}
                    // ref={symbolDropDownRef}
                    style={styles.dropDown}
                    dropdownStyle={styles.dropDown_dropDownStyle}
                    dropdownTextStyle={styles.dropDown_textStyle}
                    renderRow={(rowData, rowID) => renderDropDownList1(rowData, rowID)}
                    renderButtonText={(rowData) => renderButtonText1(rowData)}
                    textStyle={{ color: "#000", marginLeft: 10, fontSize: wp(4), width: wp(80), fontFamily: fonts.Poppins }}
                    onSelect={(idx, DropDownItem) => setDropDownItem(DropDownItem?.title)}
                    renderRightComponent={() => (<Image source={iconPath.DROPDOWN} style={styles.dropDownIcon} />)}
                />

                <ResponsiveText size="h7" fontFamily={fonts.Poppins_SemiBold} margin={[wp(8), 0, 5, 0]}>{"Choose Warehouse Location"}</ResponsiveText>
                <ModalDropdown options={['W9', 'W10']}
                    defaultValue={DropDownItemm}
                    style={styles.dropDown}
                    dropdownStyle={styles.dropDown_dropDownStyle}
                    dropdownTextStyle={styles.dropDown_textStyle}
                    textStyle={{ color: "#000", marginLeft: 10, fontSize: wp(4), width: wp(80), fontFamily: fonts.Poppins }}
                    onSelect={(idx, DropDownItem) => setDropDownItemm(DropDownItem)}
                    renderRightComponent={() => (<Image source={iconPath.DROPDOWN} style={styles.dropDownIcon} />)}
                />

                <View style={{ width: "37%", alignSelf: "center", marginTop: wp(30) }}>
                    <Button
                        onPress={() => getSearchedTicker()}
                        // onPress={() => props.navigation.navigate("SearchDetails")}
                        Text={'Search'}
                        fontFamily={fonts.Poppins_Medium}
                        fontSize={16}
                        backgroundColor={"#455154"}
                        height={55}
                    />
                </View>

            </View>
        </View>
    )
}
export default SearchNextScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dropDown_dropDownStyle: {
        width: wp(89),
        borderWidth: 0,
        marginLeft: wp(1)

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
        borderRadius: 11
    },
    dropDownIcon: {
        width: wp(4.5),
        height: "100%",
        alignSelf: "flex-end",
        resizeMode: "contain",
        marginRight: 10,
        marginTop: wp(-8)
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

})

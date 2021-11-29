import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';
import Button from '../../Components/Button';

import ModalDropdown from 'react-native-modal-dropdown';

const DATA = [
    { id: "1", coinName: "Maize", },
    { id: "2", coinName: "Soya Bean", },
    { id: "3", coinName: "Rice", },
    { id: "4", coinName: "Sesame", },
    { id: "5", coinName: "Sorghum", },
]

const SearchNextScreen = (props) => {

    const [DropDownItem, setDropDownItem] = useState('White Maize')
    const [DropDownItemm, setDropDownItemm] = useState('Warehouse W9')

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                right RightIconType={"Entypo"} RightIconName={"cross"}
                leftPress={() => props.navigation.goBack()}
                RightPress={() => props.navigation.goBack()} />
            <Pressable
                style={{ marginTop: wp(4), alignSelf: "center", alignItems: "center" }}>
                <Image source={iconPath.coin1} style={{ width: wp(18), height: wp(18), resizeMode: "contain" }} />
                <ResponsiveText size="h3" margin={[0, 0, 0, 0]} >{"Maize"}</ResponsiveText>
            </Pressable>
            <View style={{ paddingHorizontal: wp(4), marginTop: wp(10), flex: 1 }}>

                <ResponsiveText size="h7" fontFamily={fonts.Poppins_SemiBold} margin={[0, 0, 5, 0]}>{"Choose Type"}</ResponsiveText>
                <ModalDropdown options={['White Maize', 'White Maize', 'White Maize']}
                    defaultValue={DropDownItem}
                    style={styles.dropDown}
                    dropdownStyle={styles.dropDown_dropDownStyle}
                    dropdownTextStyle={styles.dropDown_textStyle}
                    textStyle={{ color: "#000", marginLeft: 10, fontSize: wp(4), width: wp(80), fontFamily: fonts.Poppins }}
                    onSelect={(idx, DropDownItem) => setDropDownItem(DropDownItem)}
                    renderRightComponent={() => (<Image source={iconPath.DROPDOWN} style={styles.dropDownIcon} />)}
                />

                <ResponsiveText size="h7" fontFamily={fonts.Poppins_SemiBold} margin={[wp(8), 0, 5, 0]}>{"Choose Warehouse Location"}</ResponsiveText>
                <ModalDropdown options={['Warehouse W9', 'Warehouse W9', 'Warehouse W9']}
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
                        onPress={() => props.navigation.navigate("SearchDetails")}
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
    }

})

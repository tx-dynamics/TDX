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

const DATA = [
    { id: "1", title: "Maize" },
    { id: "2", title: "Soya Bean" },
    { id: "3", title: "Sorghum" },
    { id: "4", title: "Sesame" },
    { id: "5", title: "Rice" },
]

const SearchScreen = (props) => {
    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Choose Commodity"}
                leftPress={() => props.navigation.goBack()} />
            <View style={{ paddingHorizontal: wp(4), }}>

                <View style={{ backgroundColor: Colors.TextInputBackgroundColor, flexDirection: "row", borderRadius: 35, height: 55, alignItems: "center", paddingHorizontal: wp(3), marginTop: wp(4) }}>
                    <Fonticon type={"Ionicons"} name={"search"} size={wp(7)} color={"#BBBBBB"} style={{ paddingTop: wp(0) }} />
                    <InputField
                        placeholder={"search"}
                        placeholderTextColor={"#BBBBBB"}
                        backgroundColor={"transparent"}
                        height={60} />
                </View>

                {DATA.map((item) =>
                    <Pressable
                        onPress={() => props.navigation.navigate("SearchNextScreen")}
                        style={{ flexDirection: "row", marginTop: wp(10) }}>
                        <Image source={iconPath.coin1} style={{ width: wp(7), height: wp(7), resizeMode: "contain" }} />
                        <ResponsiveText size="h6" margin={[0, 0, 0, 10]} fontFamily={fonts.Poppins_Medium}>{item.title}</ResponsiveText>
                    </Pressable>
                )}



            </View>

        </View>
    )
}
export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerStyle: {
        backgroundColor: Colors.TextInputBackgroundColor, flexDirection: "row", marginVertical: wp(4),
        marginHorizontal: wp(4), padding: wp(4), borderRadius: 5, alignItems: "center"
    },
    headingContainer: { paddingHorizontal: wp(4), backgroundColor: Colors.TextInputBackgroundColor, paddingVertical: 4, justifyContent: "center" },

})


import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import { fonts } from '../../Constants/Fonts';
import Fonticon from '../../Constants/FontIcon';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import InputField from '../../Components/InputField';

import { useSelector, useDispatch } from 'react-redux';

import { _getMarketData } from '../../Redux/Actions/Actions';
import { _axiosPostAPI } from '../../Apis/Apis';

const DATA = [
    { id: "1", title: "Maize" },
    { id: "2", title: "Soya Bean" },
    { id: "3", title: "Sorghum" },
    { id: "4", title: "Sesame" },
    { id: "5", title: "Rice" },
]

const SearchScreen = (props) => {

    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('')

    const userToken = useSelector(state => state.AuthReducer.userToken);
    const marketList = useSelector(state => state.HomeReducer.marketList);
    const marketData = useSelector(state => state.HomeReducer.marketData);

    useEffect(() => {
    //   alert(JSON.stringify(marketData.markets))
    }, [])
    

    const getSearchedTicker = async () => {

        if (searchText !== '') {
            let data = {}
            let data1 = {}
            data1["searching"] = true;
            data1["search_text"] = searchText;
            data1["filtering"] = false;
            data["token"] = userToken;
            data["search"] = data1;
            data["filters"] = [];
            // dispatch(_getMarketData('get_markets', data))
            try {
                await _axiosPostAPI('get_markets', data)
                    .then(async (response) => {
                        if (response.action === "success") {
                            // alert(JSON.stringify(response.data.markets.length))
                            if (response?.data?.markets?.length > 0) {
                                props.navigation.navigate("SearchDetails", {allData: response?.data?.markets})
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
        }
    }


    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Choose Commodity"}
                leftPress={() => props.navigation.goBack()} />
            <View style={{ paddingHorizontal: wp(6), }}>

                <View style={{ backgroundColor: Colors.TextInputBackgroundColor, flexDirection: "row", borderRadius: 35, height: 55, alignItems: "center", paddingHorizontal: wp(3), marginTop: wp(2) }}>
                    <Fonticon type={"Ionicons"} name={"search"} size={wp(7)} color={"#BBBBBB"} style={{ paddingTop: wp(0) }} />
                    <InputField
                        placeholder={"Search"}
                        placeholderTextColor={"#BBBBBB"}
                        backgroundColor={"transparent"}
                        height={60}
                        value={searchText}
                        onChangeText={text => setSearchText(text)}
                        onSubmitEditing={() => getSearchedTicker()}
                    />
                </View>

                {marketData?.markets?.map((item) =>
                    <Pressable
                        onPress={() => props.navigation.navigate("SearchNextScreen")}
                        style={{ flexDirection: "row", marginTop: wp(10) }}>
                        <Image source={{uri: item?.image_url}} style={{ width: wp(7), height: wp(7), resizeMode: "contain" }} />
                        <ResponsiveText size="h6" margin={[0, 0, 0, 10]} fontFamily={fonts.Poppins_Medium}>{item?.title}</ResponsiveText>
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


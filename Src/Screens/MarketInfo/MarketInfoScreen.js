import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Linking, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';

import { useSelector, useDispatch } from 'react-redux';
import { _getMarketNews } from '../../Redux/Actions/Actions';

const DATA = [
    { id: "1", imageName: iconPath.marketInfo1, desc: "Oprah's Weight Watchers Stake Shrinks by $580M", link: "investopedia.com" },
    { id: "2", imageName: iconPath.marketInfo2, desc: "Wayfair Retests 52-Week Highs After Strong Q4", link: "investopedia.com" },
]

const MarketInfoScreen = (props) => {

    const dispatch = useDispatch();

    const [DropDownItem, setDropDownItem] = useState('')

    const userToken = useSelector(state => state.AuthReducer.userToken);
    const Market_News = useSelector(state => state.HomeReducer.Market_News);

    useEffect(() => {
        getNews()
    }, [])

    const getNews = async () => {
        let data = {}
        data["token"] = userToken;
        data["page"] = 1;
        data["limit"] = 20;

        await dispatch(_getMarketNews('get_infos', data))

        console.log(JSON.stringify(Market_News))

    }

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.drawerIcon}
                midtitle title={"Market Info"}
                leftPress={() => props.navigation.openDrawer()} />

            <FlatList
                data={Market_News}
                extraData={Market_News}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: wp(-1) }}
                contentContainerStyle={{ paddingHorizontal: wp(5) }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <Pressable
                        // onPress={() => Linking.openURL('http://' + item.link)}
                        style={styles.itemContainer}>
                        <Image source={{ uri: item.image_url }} style={{ width: "100%", height: wp(46), marginTop: wp(-1) }} />
                        <ResponsiveText size="h8" padding={[0, 15, 0, 0]} >{item.description}</ResponsiveText>
                        {/* <Text style={{ color: Colors.black, fontFamily: fonts.Poppins, textDecorationLine: 'underline', fontSize: 11 }} */}
                        {/* // onPress={() => Linking.openURL('http://' + item.link)} */}
                        {/* // >{"by " + item.link}</Text> */}

                    </Pressable>
                )} />



        </View>
    )
}
export default MarketInfoScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        backgroundColor: "#CCCCCC33", padding: wp(2.5), paddingTop: wp(2), paddingBottom: wp(9), borderRadius: 7, marginTop: wp(3)
    }
})
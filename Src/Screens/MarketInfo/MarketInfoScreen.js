import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Linking, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';
import moment from 'moment';

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

    useEffect(() => {
        // alert(JSON.stringify(Market_News[1].created_at))
    }, [Market_News])

    const getNews = async () => {
        let data = {}
        data["token"] = userToken;
        data["page"] = 1;
        data["limit"] = 20;
        dispatch(_getMarketNews('get_infos', data))
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
                contentContainerStyle={{ paddingHorizontal: wp(4) }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <Pressable onPress={() => Linking.openURL('http://' + item.link)}
                        style={styles.itemContainer}>
                        <Image source={{ uri: item.image_url }} style={{ width: wp(28), height: wp(20), borderRadius: 10 }} />
                        <View style={{ marginLeft: 10, width: "65%" }}>
                            <ResponsiveText size="h8" padding={[0, 0, 0, 0]} >{item.title}</ResponsiveText>
                            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"flex-end", flex:1}}>
                                <ResponsiveText size="h9" padding={[0, 0, 0, 0]} >{"Category"}</ResponsiveText>
                                <ResponsiveText size="h9" padding={[0, 0, 0, 0]} >{moment(item?.created_at).format('DD MMM YYYY')}</ResponsiveText>
                            </View>
                        </View>
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
        backgroundColor: "#CCCCCC33", padding: wp(2), paddingTop: wp(2), paddingBottom: wp(2), borderRadius: 7, marginTop: wp(3),
        flexDirection: "row"
    }
})
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Linking, Pressable } from 'react-native'


import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
import { _getMarketNews } from '../../Redux/Actions/Actions';
import Toast from 'react-native-toast-message';


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
        dispatch(_getMarketNews('get_blogs', data))
    }

    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    const openLink = (link) => {
        let check = validURL(link)
        if (check) {
            Linking.openURL(link.includes("http")? link : "https://"+link)
        } else {
            Toast.show({ type: "message", position: "bottom", props: { body: "Link is not Valid" } })  
        }
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
                    <Pressable onPress={() => openLink(item.link)}
                        style={styles.itemContainer}>
                        <Image source={{ uri: item.image_url }} style={{ width: wp(28), height: wp(20), borderRadius: 10 }} />
                        <View style={{ marginLeft: 10, width: "65%" }}>
                            <ResponsiveText size="h8" padding={[0, 0, 0, 0]} >{item.title}</ResponsiveText>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", flex: 1 }}>
                                <ResponsiveText size="h9" padding={[0, 0, 0, 0]} >{item.ticker_title}</ResponsiveText>
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
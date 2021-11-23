import React from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Linking } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';

const DATA = [
    { id: "1", imageName: iconPath.marketInfo1, desc: "Oprah's Weight Watchers Stake Shrinks by $580M", link: "investopedia.com" },
    { id: "2", imageName: iconPath.marketInfo2, desc: "Wayfair Retests 52-Week Highs After Strong Q4", link: "investopedia.com" },
]

const MarketInfoScreen = (props) => {
    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.drawerIcon}
                midtitle title={"Market Info"}
                leftPress={() => props.navigation.openDrawer()} />

            <FlatList
                data={DATA}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: wp(5) }}
                contentContainerStyle={{ paddingHorizontal: wp(5) }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={{ backgroundColor: "#CCCCCC33", padding: wp(2.5), paddingBottom: wp(10), borderRadius: 7, marginTop: wp(3) }}>
                        <Image source={item.imageName} style={{ width: "100%", height: wp(46), resizeMode: "contain", marginTop: wp(-1) }} />
                        <ResponsiveText size="h7" padding={[0, 15, 0, 0]} >{item.desc}</ResponsiveText>
                        <Text style={{color:Colors.black, fontFamily:fonts.Poppins,textDecorationLine: 'underline'}}
                        onPress={() => Linking.openURL('http://'+item.link)}>{"by "+item.link}</Text>

                    </View>
                )} />



        </View>
    )
}
export default MarketInfoScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.white,
        // justifyContent: "center",
        // alignItems: "center"
    }
})
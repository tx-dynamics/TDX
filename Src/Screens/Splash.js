import React from 'react'
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'

import { Colors } from '../Constants/Colors';
import { iconPath } from '../Constants/icon';
import { wp } from '../Helpers/Responsiveness';

const Splash = () => {
    return (
        <>
            {/* <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} /> */}
            <View style={styles.container}>
                <Image source={iconPath.SplashLogo} style={{ width: wp(65), height: wp(65), resizeMode: "contain" }}></Image>
                <Image source={iconPath.loadingAnem} style={{ width: wp(65), height: wp(65), resizeMode: "contain", position:"absolute", bottom:wp(13) }}></Image>
            </View>
        </>
    )
}
export default Splash;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center"
    }
})
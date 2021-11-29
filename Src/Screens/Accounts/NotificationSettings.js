import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Switch, Dimensions, FlatList, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';
import { ScrollView } from 'react-native-gesture-handler';

import ModalDropdown from 'react-native-modal-dropdown';


const NotificationSettings = (props) => {


    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const [isEnabled3, setIsEnabled3] = useState(false);
    const toggleSwitch = () => setIsEnabled(!isEnabled);
    const toggleSwitch1 = () => setIsEnabled1(!isEnabled1);
    const toggleSwitch2 = () => setIsEnabled2(!isEnabled2);
    const toggleSwitch3 = () => setIsEnabled3(!isEnabled3);

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Notification Settings"}
                leftPress={() => props.navigation.goBack()} />

            <View style={[styles.containerStyle, {marginTop:wp(6)}]}>
                <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{"Deposits & Withdrawals"}</ResponsiveText>
                <Switch
                    trackColor={{ false: "#95959B", true: Colors.greenColor }}
                    thumbColor={isEnabled ? "#fff" : "#fff"}
                    ios_backgroundColor="#95959B"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={styles.containerStyle}>
                <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{"Order Status"}</ResponsiveText>
                <Switch
                    trackColor={{ false: "#95959B", true: Colors.greenColor }}
                    thumbColor={isEnabled1 ? "#fff" : "#fff"}
                    ios_backgroundColor="#95959B"
                    onValueChange={toggleSwitch1}
                    value={isEnabled1}
                />
            </View>
            <View style={styles.containerStyle}>
                <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{"News"}</ResponsiveText>
                <Switch
                    trackColor={{ false: "#95959B", true: Colors.greenColor }}
                    thumbColor={isEnabled2 ? "#fff" : "#fff"}
                    ios_backgroundColor="#95959B"
                    onValueChange={toggleSwitch2}
                    value={isEnabled2}
                />
            </View>
            <View style={styles.containerStyle}>
                <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{"App Notififcations"}</ResponsiveText>
                <Switch
                    trackColor={{ false: "#95959B", true: Colors.greenColor }}
                    thumbColor={isEnabled3 ? "#fff" : "#fff"}
                    ios_backgroundColor="#95959B"
                    onValueChange={toggleSwitch3}
                    value={isEnabled3}
                />
            </View>







        </View>
    )
}
export default NotificationSettings;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.white,
        // justifyContent: "center",
        // alignItems: "center"
    },
    containerStyle: {
        backgroundColor: "#F4F4F4", flexDirection: "row", justifyContent: "space-between",
        padding: wp(4), marginHorizontal: wp(6), borderRadius: 5, alignItems: "center", marginTop:wp(4)
    },


})
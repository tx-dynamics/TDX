import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable, StatusBar } from 'react-native'

import { Colors } from '../../Constants/Colors';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Button from '../../Components/Button';
import { fonts } from '../../Constants/Fonts';
import InputField from '../../Components/InputField';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../Components/Header';

const ChangePassword = (props) => {
    const [hide, setHide] = useState(true)
    const [hide1, setHide1] = useState(true)
    const [hide2, setHide2] = useState(true)

    return (
        <View style={styles.container}>
            <ScrollView >
                <Header left LeftImage ImageName={iconPath.backArrow}
                    midImage imageWidth={wp(19)} imageHeight={wp(19)}
                    leftPress={() => props.navigation.goBack()} />
                <View style={{ paddingHorizontal: wp(4), flex: 1, marginTop:wp(10) }}>
                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]} fontFamily={fonts.Poppins_Medium}>{"Setup a new password to continue"}</ResponsiveText>

                    <ResponsiveText size="h8" margin={[wp(8), 0, -3, 0]}>{"Enter Old Password"}</ResponsiveText>
                    <InputField
                        secureText
                        secureTextEntry={hide}
                        // placeholder={"Password"}
                        onPress={() => setHide(!hide)}
                        RightImage
                        marginTopp={.1}
                        marginRight={8}
                        rightImageWidth={wp(5)}
                        rightImageHeight={wp(5)}
                    // value={password}
                    // onChangeText={(password) => setPassword(password)}
                    />
                    <ResponsiveText size="h8" margin={[wp(4), 0, -3, 0]}>{"Enter New Password"}</ResponsiveText>
                    <InputField
                        secureText
                        secureTextEntry={hide1}
                        // placeholder={"Password"}
                        onPress={() => setHide1(!hide1)}
                        RightImage
                        marginTopp={.1}
                        marginRight={8}
                        rightImageWidth={wp(5)}
                        rightImageHeight={wp(5)}
                    // value={password}
                    // onChangeText={(password) => setPassword(password)}
                    />
                    <ResponsiveText size="h8" margin={[wp(4), 0, -3, 0]}>{"Confirm Password"}</ResponsiveText>
                    <InputField
                        secureText
                        secureTextEntry={hide2}
                        // placeholder={"Password"}
                        RightImage
                        marginTopp={.1}
                        onPress={() => setHide2(!hide2)}
                        marginRight={8}
                        rightImageWidth={wp(5)}
                        rightImageHeight={wp(5)}
                    // value={password}
                    // onChangeText={(password) => setPassword(password)}
                    />
                    <Button
                        Text={'Done'}
                        marginTop={wp(21)}
                        marginHorizontal={wp(20)}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
export default ChangePassword;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
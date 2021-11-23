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

const Login = (props) => {
    const [hide, setHide] = useState(true)

    return (
        <View style={styles.container}>
            <ScrollView >
                <Image source={iconPath.Logo} style={{ width: wp(35), height: wp(35), resizeMode: "contain", alignSelf: "center", marginTop: wp(3) }}></Image>

                <View style={{ paddingHorizontal: wp(4), flex: 1 }}>
                    <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium} textAlign={"center"} margin={[wp(6), 0, 0, 0]}>{"Welcome!"}</ResponsiveText>
                    <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium} textAlign={"center"} margin={[0, 0, wp(6), 0]}>{"Enter credentials to login"}</ResponsiveText>

                    <ResponsiveText size="h8" margin={[0, 0, -2, 0]}>{"Email"}</ResponsiveText>
                    <InputField
                        keyboardType="email-address"
                        // placeholder={"Email"}
                    // value={EmailAdd}
                    // onChangeText={(EmailAdd) => setEmailAdd(EmailAdd)}
                    />
                    <ResponsiveText size="h8" margin={[wp(4), 0, -3, 0]}>{"Password"}</ResponsiveText>
                    <InputField
                        secureText
                        secureTextEntry={hide}
                        // placeholder={"Password"}
                        onPress={() => setHide(!hide)}
                    // value={password}
                    // onChangeText={(password) => setPassword(password)}
                    />

                    <Pressable>
                        <ResponsiveText size="h8" margin={[wp(2), 0, 0, 0]} position={"flex-end"}>{"Forgot Password?"}</ResponsiveText>
                    </Pressable>

                    <Button
                        onPress={() => props.navigation.navigate("VerificationCode")}
                        Text={'Sign In'}
                        marginTop={wp(16)}
                        marginHorizontal={wp(20)}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
export default Login;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
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

const SetupNewPassword = (props) => {
    const [hide, setHide] = useState(true)

    return (
        <View style={styles.container}>
            <ScrollView >
                <Image source={iconPath.Logo} style={{ width: wp(30), height: wp(30), resizeMode: "contain", alignSelf: "center", marginTop: wp(0) }}></Image>

                <View style={{ paddingHorizontal: wp(4), flex: 1 }}>
                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]} fontFamily={fonts.Poppins_Medium}>{"Setup a new password to continue"}</ResponsiveText>

                    <ResponsiveText size="h8" margin={[wp(8), 0, -3, 0]}>{"New Password"}</ResponsiveText>
                    <InputField
                        secureText
                        secureTextEntry={hide}
                        // placeholder={"Password"}
                        onPress={() => setHide(!hide)}
                    // value={password}
                    // onChangeText={(password) => setPassword(password)}
                    />
                    <ResponsiveText size="h8" margin={[wp(4), 0, -3, 0]}>{"Confirm Password"}</ResponsiveText>
                    <InputField
                        secureText
                        secureTextEntry={hide}
                        // placeholder={"Password"}
                        onPress={() => setHide(!hide)}
                    // value={password}
                    // onChangeText={(password) => setPassword(password)}
                    />
                    <Button
                        onPress={() => props.navigation.navigate("Drawer")}
                        Text={'Done'}
                        marginTop={wp(16)}
                        marginHorizontal={wp(20)}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
export default SetupNewPassword;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
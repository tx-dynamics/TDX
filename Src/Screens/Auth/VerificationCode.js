import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import Fonticon from '../../Constants/FontIcon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import { fonts } from '../../Constants/Fonts';
import { Colors } from '../../Constants/Colors';
import { iconPath } from '../../Constants/icon';
import Button from '../../Components/Button';
import Header from '../../Components/Header';

// import {
//     CodeField,
//     Cursor,
//     useBlurOnFulfill,
//     useClearByFocusCell,
// } from 'react-native-confirmation-code-field';
import { CodeField, Cursor } from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

export default function VerificationCode(props) {

    const [value, setValue] = useState('');
    const [otpValue, setOtpValue] = useState('');


    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midImage imageWidth={wp(13)} imageHeight={wp(13)}
                leftPress={() => props.navigation.goBack()} />

            <View style={{ paddingHorizontal: wp(4) }}>

                <ResponsiveText size="h8" margin={[wp(5), 0, 0, 0]} fontFamily={fonts.Poppins_Medium}>{"A verification code has been sent to your email, please enter here to continue"}</ResponsiveText>
                <ResponsiveText size="h6" margin={[wp(14), 0, 0, 0]} fontFamily={fonts.Poppins_Medium} textAlign={"center"}>{"Enter your verification code"}</ResponsiveText>
                <View style={{ width: wp(70), alignSelf: "center", marginTop: 10 }}>
                    <CodeField
                        // ref={useBlurOnFulfill({value: otp, cellCount: 6})}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={otpValue}
                        onChangeText={(txt) => setOtpValue(txt)}
                        cellCount={4}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                            // onLayout={getCellOnLayoutHandler(index)}
                            >
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />

                </View>


                <ResponsiveText size="h7" margin={[wp(22), 0, 0, 0]} fontFamily={fonts.Poppins_Medium} textAlign={"center"}>{"Resend Code?"}</ResponsiveText>

                <View style={{ width: wp(48), alignSelf: "center" }}>
                    <Button
                        onPress={() => props.navigation.navigate("SetupNewPassword")}
                        Text={'Submit'}
                        marginTop={wp(3)}
                        borderRadius={5}
                        height={55}
                    />
                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    codeFieldRoot: { marginTop: 20, },
    cell: {
        width: 43,
        height: 55,
        fontSize: 20,
        borderWidth: 1,
        borderColor: Colors.greenColor,
        textAlign: 'center',
        borderRadius: 10,
        color: Colors.greenColor,
        fontFamily: fonts.Poppins_Medium,
        alignItems:"center",
        justifyContent:"center",
        textAlignVertical:"center",
        paddingTop:5
    },
    focusCell: {
        borderColor: Colors.greenColor,
        color: Colors.greenColor,
    },

})

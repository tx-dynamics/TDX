import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Pressable, StatusBar } from 'react-native'

import { Colors } from '../../Constants/Colors';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Button from '../../Components/Button';
import { fonts } from '../../Constants/Fonts';
import InputField from '../../Components/InputField';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../../Components/Loader';
import { _axiosPostAPI } from '../../Apis/Apis';


const SetupNewPassword = (props) => {
    const [hide, setHide] = useState(true)
    const [hide1, setHide1] = useState(true)

    const [apiError, setApiError] = useState(false)
    const [apiErrorMsg, setApiErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')



    useEffect(() => {
        // alert(JSON.stringify(props.route.params.Otpcode))
    }, [])



    const setNewPasswordFun = async () => {
        setApiError(false)
        if (newPassword === '') {
            setApiError(true)
            setApiErrorMsg("Please Enter New Password")
        } else if (confirmPassword === '') {
            setApiError(true)
            setApiErrorMsg("Please Enter Confirm Password")
        }
        else {
            if (newPassword !== confirmPassword) {
                setApiError(true)
                setApiErrorMsg("Wrong Confirm Password")
            } else {
                setLoading(true)
                let data = {}
                data["code"] = props.route.params.Otpcode;
                data["password"] = confirmPassword;
                await _axiosPostAPI("set_password", data)
                    .then(async (response) => {
                        setLoading(false)
                        if (response.action === "success") {
                            props.navigation.navigate("Login")
                        } else {
                            setApiError(true)
                            setApiErrorMsg(response.error)
                        }
                    })
                    .catch((err) => {
                        setLoading(false)
                        console.log(err)
                    })
            }
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView >
                <Image source={iconPath.Logo} style={{ width: wp(30), height: wp(30), resizeMode: "contain", alignSelf: "center", marginTop: wp(0) }}></Image>

                <View style={{ paddingHorizontal: wp(6), flex: 1 }}>
                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]} fontFamily={fonts.Poppins_Medium}>{"Setup a new password to continue"}</ResponsiveText>

                    {apiError ?
                        <Text style={{ color: 'red', fontSize: 13, marginLeft: 12, textAlign: 'center', marginTop: 1, fontFamily: fonts.Poppins }}>
                            {apiErrorMsg}
                        </Text>
                        :
                        <Text style={{ color: 'red', fontSize: 13, marginLeft: 12, textAlign: 'center', marginTop: 1, fontFamily: fonts.Poppins }}> {""}</Text>
                    }

                    <ResponsiveText size="h8" margin={[wp(8), 0, -3, 0]}>{"New Password"}</ResponsiveText>
                    <InputField
                        secureText
                        marginTopp={.1}
                        secureTextEntry={hide}
                        // placeholder={"Password"}
                        onPress={() => setHide(!hide)}
                        value={newPassword}
                        onChangeText={(password) => setNewPassword(password)}
                    />
                    <ResponsiveText size="h8" margin={[wp(4), 0, -3, 0]}>{"Confirm Password"}</ResponsiveText>
                    <InputField
                        secureText
                        marginTopp={.1}
                        secureTextEntry={hide1}
                        // placeholder={"Password"}
                        onPress={() => setHide1(!hide1)}
                        value={confirmPassword}
                        onChangeText={(password) => setConfirmPassword(password)}
                    />
                    <Button
                        // onPress={() => props.navigation.navigate("Drawer")}
                        onPress={() => setNewPasswordFun()}
                        Text={'Done'}
                        marginTop={wp(16)}
                        marginHorizontal={wp(20)}
                    />
                </View>
            </ScrollView>
            <Loader loading={loading} />

        </View>
    )
}
export default SetupNewPassword;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
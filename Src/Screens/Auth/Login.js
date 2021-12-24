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
import Loader from '../../Components/Loader';
import { _axiosPostAPI } from '../../Apis/Apis';

import { SetSession } from '../../Redux/Actions/Actions'
import { connect } from 'react-redux';

const Login = (props) => {
    const [hide, setHide] = useState(true)
    const [EmailAdd, setEmailAdd] = useState('')
    const [password, setPassword] = useState('')
    const [apiError, setApiError] = useState(false)
    const [apiErrorMsg, setApiErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const LoginUser = async () => {
        setApiError(false)
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(EmailAdd) === false) {
            setApiError(true)
            setApiErrorMsg("Please Enter Valid Email")
        }
        else if (password === '') {
            setApiError(true)
            setApiErrorMsg("Please Enter Password")
        }
        else {
            setLoading(true)
            let data = {}
            data["email"] = EmailAdd;
            data["password"] = password;
            await _axiosPostAPI("login", data)
                .then(async (response) => {
                    setLoading(false)
                    if (response.action === "success") {
                        // ResponseHandle(response.data)
                        if (response.data.is_password_set) {
                            ResponseHandle(response.data)
                        } else {
                            SendOtp(response.data.token)
                        }
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

    const SendOtp = async (tokenn) => {
        setLoading(true)
        let data = {}
        data["email"] = EmailAdd;
        await _axiosPostAPI("forgot_password", data)
            .then(async (response) => {
                setLoading(false)
                if (response.action === "success") {
                    // alert(JSON.stringify(response.otp))
                    props.navigation.navigate("VerificationCodeFirst", {token: tokenn })
                    setPassword('')
                    setEmailAdd('')
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

    const ResponseHandle = (res) => {
        let data = {}
        data["isLogin"] = true;
        data["userToken"] = res.token;
        data["userId"] = res.id;
        data["userInfo"] = res;
        props.SessionMaintain(data)
    }

    return (
        <View style={styles.container}>
            <ScrollView >
                <Image source={iconPath.Logo} style={{ width: wp(30), height: wp(30), resizeMode: "contain", alignSelf: "center", marginTop: wp(3) }}></Image>



                <View style={{ paddingHorizontal: wp(6), flex: 1 }}>
                    <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium} textAlign={"center"} margin={[wp(6), 0, 0, 0]}>{"Welcome!"}</ResponsiveText>
                    <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium} textAlign={"center"} margin={[0, 0, wp(6), 0]}>{"Enter credentials to login"}</ResponsiveText>

                    {apiError ?
                        <Text style={{ color: 'red', fontSize: 13, marginLeft: 12, textAlign: 'center', marginTop: 1, fontFamily: fonts.Poppins }}>
                            {apiErrorMsg}
                        </Text>
                        :
                        <Text style={{ color: 'red', fontSize: 13, marginLeft: 12, textAlign: 'center', marginTop: 1, fontFamily: fonts.Poppins }}> {""}</Text>
                    }

                    <ResponsiveText size="h8" margin={[0, 0, -2, 0]}>{"Email"}</ResponsiveText>
                    <InputField
                        keyboardType="email-address"
                        marginTopp={.1}
                        // placeholder={"Email"}
                        value={EmailAdd}
                        onChangeText={(EmailAdd) => setEmailAdd(EmailAdd)}
                    />
                    <ResponsiveText size="h8" margin={[wp(4), 0, -3, 0]}>{"Password"}</ResponsiveText>
                    <InputField
                        secureText
                        marginTopp={.1}
                        secureTextEntry={hide}
                        // placeholder={"Password"}
                        onPress={() => setHide(!hide)}
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                    />

                    <Pressable onPress={() => props.navigation.navigate("ForgetPassword")}>
                        <ResponsiveText size="h8" margin={[wp(2), 0, 0, 0]} position={"flex-end"}>{"Forgot Password?"}</ResponsiveText>
                    </Pressable>

                    <Button
                        onPress={() => LoginUser()}
                        // onPress={() => props.navigation.navigate("VerificationCode")}
                        Text={'Sign In'}
                        marginTop={wp(16)}
                        marginHorizontal={wp(20)}
                    />
                </View>
            </ScrollView>

            <Loader loading={loading} />

        </View>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        SessionMaintain: (data) => dispatch(SetSession(data)),
    };
};
export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
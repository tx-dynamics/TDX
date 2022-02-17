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

const ForgetPassword = (props) => {
    const [hide, setHide] = useState(true)
    const [EmailAdd, setEmailAdd] = useState('')
    const [password, setPassword] = useState('')
    const [apiError, setApiError] = useState(false)
    const [apiErrorMsg, setApiErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const forgotpassword = async () => {
        setApiError(false)
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(EmailAdd) === false) {
            setApiError(true)
            setApiErrorMsg("Please Enter Valid Email")
        }
        else {
            setLoading(true)
            let data = {}
            data["email"] = EmailAdd;
            // data["email"] = "faisal@gmail.com";
            await _axiosPostAPI("forgot_password", data)
                .then(async (response) => {
                    setLoading(false)
                    if (response.action === "success") {
                        // alert(JSON.stringify(response))
                        props.navigation.navigate("VerificationCode", { fromScreen: "forget" })
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
    }

    return (
        <View style={styles.container}>
            <ScrollView >
                <Image source={iconPath.Logo} style={{ width: wp(30), height: wp(30), resizeMode: "contain", alignSelf: "center", marginTop: wp(3) }}></Image>
                <View style={{ paddingHorizontal: wp(6), flex: 1 }}>
                    <ResponsiveText size="h8" fontFamily={fonts.Poppins_Medium} textAlign={"center"} margin={[0, 0, wp(6), 0]}>{"Forgot Password!"}</ResponsiveText>
                    <ResponsiveText size="h8" margin={[wp(4), 0, -2, 0]}>{"Email"}</ResponsiveText>
                    <InputField
                        keyboardType="email-address"
                        marginTopp={.1}
                        // placeholder={"Email"}
                        value={EmailAdd}
                        onChangeText={(EmailAdd) => setEmailAdd(EmailAdd)}
                    />
                    {apiError ?
                        <Text style={{ color: 'red', fontSize: 13, marginLeft: 12, textAlign: 'center', marginTop: 1, fontFamily: fonts.Poppins }}>
                            {apiErrorMsg}
                        </Text>
                        :
                        <Text style={{ color: 'red', fontSize: 13, marginLeft: 12, textAlign: 'center', marginTop: 1, fontFamily: fonts.Poppins }}> {""}</Text>
                    }

                    <Button
                        onPress={() => forgotpassword()}
                        // onPress={() => props.navigation.navigate("VerificationCode")}
                        Text={'Submit'}
                        marginTop={wp(10)}
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
export default connect(null, mapDispatchToProps)(ForgetPassword);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
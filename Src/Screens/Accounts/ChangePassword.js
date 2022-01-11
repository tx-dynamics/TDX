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
import Header from '../../Components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { _changePasssword } from '../../Redux/Actions/Actions';
import Toast, { DURATION } from 'react-native-easy-toast'
import Loader from '../../Components/Loader';

const ChangePassword = (props) => {

    const dispatch = useDispatch();

    const toastRef = React.createRef(Toast)

    const [hide, setHide] = useState(true)
    const [hide1, setHide1] = useState(true)
    const [hide2, setHide2] = useState(true)
    const [loading, setLoading] = useState(false)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const userToken = useSelector(state => state.AuthReducer.userToken);
    const ChangePasswordLoading = useSelector(state => state.HomeReducer.ChangePasswordLoading);
    const ChangePasswordMsg = useSelector(state => state.HomeReducer.ChangePasswordMsg);

    useEffect(() => {

        if (ChangePasswordLoading !== undefined) {
            setLoading(ChangePasswordLoading)
        } else {
            setLoading(false)
        }
    }, [ChangePasswordLoading])

    useEffect(() => {
        if (ChangePasswordMsg) {
            toastRef.current.show(ChangePasswordMsg, 2500);
            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')
        }
    }, [ChangePasswordMsg]);


    const NewPassword = async () => {
        if (oldPassword === '') {
            toastRef.current.show('Please Enter Old Password', 2500);
        }
         else if (newPassword === '') {
            toastRef.current.show('Please Enter New Password', 2500);
        } 
        else if (newPassword.length < 6) {
            toastRef.current.show('Passwords must be at least 6 characters', 2500);
        } 
        else {
            if (newPassword !== confirmPassword) {
                toastRef.current.show('password and confirm password must match', 2500);
            } else {
                let data = {}
                data["token"] = userToken
                data["current_password"] = oldPassword
                data["new_password"] = newPassword
                await dispatch(_changePasssword('change_password', data))
            }
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView >
                <Header left LeftImage ImageName={iconPath.backArrow}
                    midImage imageWidth={wp(19)} imageHeight={wp(19)}
                    leftPress={() => props.navigation.goBack()} />
                <View style={{ paddingHorizontal: wp(4), flex: 1, marginTop: wp(10) }}>
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
                        value={oldPassword}
                        onChangeText={(password) => setOldPassword(password)}
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
                        value={newPassword}
                        onChangeText={(password) => setNewPassword(password)}
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
                        value={confirmPassword}
                        onChangeText={(password) => setConfirmPassword(password)}
                    />
                    <Button
                        onPress={() => NewPassword()}
                        Text={'Done'}
                        marginTop={wp(21)}
                        marginHorizontal={wp(20)}
                    />
                </View>
            </ScrollView>


            <Toast
                ref={toastRef}
                style={{ backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30 }}
                position='bottom'
                positionValue={150}
                opacity={0.9}
                textStyle={{ color: 'black' }}
            />

            <Loader loading={loading} />

        </View>
    )
}
export default ChangePassword;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
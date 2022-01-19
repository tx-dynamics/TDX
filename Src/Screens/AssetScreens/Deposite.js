import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';

import ModalDropdown from 'react-native-modal-dropdown';
import Image_Picker from '../../Components/Image_Picker';
import { _axiosPostAPI } from '../../Apis/Apis';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../Components/Loader';
import Toast, { DURATION } from 'react-native-easy-toast'

import { _postTransaction } from '../../Redux/Actions/Actions';

const Deposite = (props) => {

    const dispatch = useDispatch();

    const toastRef = React.createRef(Toast)

    const [DropDownItem, setDropDownItem] = useState('Bank Deposit')
    const [assetsDropdownShow, setAssetsDropdownShow] = useState(false)
    const [depositeAmount, setDepositeAmount] = useState('')
    const [TransactionId, setTransactionId] = useState('')
    const [imageFile, setImageFile] = useState('')
    const [loading, setLoading] = useState(false)

    const userToken = useSelector(state => state.AuthReducer.userToken);
    const Deposite_Msg = useSelector(state => state.HomeReducer.Deposite_Msg);
    const ChangePasswordLoading = useSelector(state => state.HomeReducer.ChangePasswordLoading);


    // useEffect(() => {
    //     if (Deposite_Msg) {
    //         toastRef.current.show(Deposite_Msg, 2500);
    //     }
    // }, [Deposite_Msg]);


    useEffect(() => {
        if (ChangePasswordLoading !== undefined) {
            setLoading(ChangePasswordLoading)
        } else {
            setLoading(false)
        }
    }, [ChangePasswordLoading])


    const opengallery = async () => {
        const res = await Image_Picker('gallery');
        // console.log("cameraaeResss\n", res.path);
        if (res === false || res === "cancel") {
            return;
        }
        // console.log("dffdfdfdfdfd", res.mime)
        ImageUpload(res?.path, res?.mime)
        // ImageUpload(res.mime)
    }

    const ImageUpload = async (photo, type) => {
        // const { picture, picType } = this.state;
        setLoading(true)
        let formData = new FormData();
        formData.append('photo', { uri: photo, name: 'image.jpg', type: type });
        formData.append('name', "Image");
        await _axiosPostAPI('upload_image', formData)
            .then((response) => {
                setLoading(false)
                if (response.action === "success") {
                    setImageFile(response.filename)
                } else {
                    console.log(JSON.stringify(response.error))
                }
            })
            .catch((error) => {
                setLoading(false)
                console.warn(error)
            });

    }

    const SubmitTransation = async () => {
        if (DropDownItem === 'Bank Deposit') {
            BankDeposit()
        } else {
            OtherTransation()
        }
    }

    const OtherTransation = async () => {

        if (depositeAmount === '') {
            toastRef.current.show('Please Enter Amount', 2500);
        } else if (TransactionId === '') {
            toastRef.current.show('Please Enter Transaction ID', 2500);
        } else {
            // toastRef.current.show('Hello!', 2500);
            let data = {}
            data["token"] = userToken
            data["amount"] = depositeAmount
            data["side"] = "deposit"
            data["type"] = DropDownItem
            data["proof_id"] = TransactionId
            data["image"] = ''
            data["withdraw_type"] = ''
            data["withdraw_date"] = ''
            data["ticker"] = ''
            data["ticker_id"] = ''
            await dispatch(_postTransaction('new_transaction', data))
            setDepositeAmount('')
            setTransactionId('')
            setImageFile('')
        }
    }

    const BankDeposit = async () => {

        if (depositeAmount === '') {
            toastRef.current.show('Please Enter Amount', 2500);
        } else if (imageFile === '') {
            toastRef.current.show('Please Upload Deposit Slip', 2500);
        } else {
            // toastRef.current.show('Hello!', 2500);
            let data = {}
            data["token"] = userToken
            data["amount"] = depositeAmount
            data["side"] = "deposit"
            data["type"] = DropDownItem
            data["proof_id"] = ''
            data["image"] = imageFile
            data["withdraw_type"] = ''
            data["withdraw_date"] = ''
            data["ticker"] = ''
            data["ticker_id"] = ''
            await dispatch(_postTransaction('new_transaction', data))
            // alert(JSON.stringify(data))
            setDepositeAmount('')
            setTransactionId('')
            setImageFile('')
        }

    }

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Deposit"}
                leftPress={() => props.navigation.goBack()} />

            <View style={{ paddingHorizontal: wp(6), marginTop: wp(5), flex: 1 }}>
                <ResponsiveText size="h8" color={"#616161"} margin={[0, 0, 5, 0]}>{"Choose Deposit type :"}</ResponsiveText>
                <ModalDropdown options={['Bank Deposit', 'MTN Mobile money', 'Wire Transfer']}
                    defaultValue={DropDownItem}
                    style={[styles.dropDown, { backgroundColor: assetsDropdownShow ? "#fff" : Colors.TextInputBackgroundColor, elevation: assetsDropdownShow ? 1 : 0 }]}
                    dropdownStyle={styles.dropDown_dropDownStyle}
                    onDropdownWillShow={() => setAssetsDropdownShow(true)}
                    onDropdownWillHide={() => setAssetsDropdownShow(false)}
                    dropdownTextStyle={styles.dropDown_textStyle}
                    textStyle={{ color: assetsDropdownShow ? "#fff" : "#000", marginLeft: 18, fontSize: 13, width: wp(74), fontFamily: fonts.Poppins_Medium }}
                    onSelect={(idx, DropDownItem) => setDropDownItem(DropDownItem)}
                    renderRightComponent={() => (<Fonticon type={"AntDesign"} name={assetsDropdownShow ? "caretup" : "caretdown"} size={wp(4)} color={Colors.black} />)}
                />

                <ResponsiveText size="h8" color={"#616161"} margin={[15, 0, 5, 0]}>{"Enter Amount Deposited :"}</ResponsiveText>

                <View style={{
                    backgroundColor: Colors.TextInputBackgroundColor, borderRadius: 5, flexDirection: "row",
                    paddingHorizontal: wp(4), alignItems: "center", borderRadius: 11
                }}>

                    <ResponsiveText size="h8" color={"#000"} fontFamily={fonts.Poppins_SemiBold} >{DropDownItem === "Wire Transfer" ? "USD" : "GH₵"}</ResponsiveText>
                    <View style={{ backgroundColor: "#65656B", width: 1, height: 50, marginHorizontal: wp(2.5) }}></View>

                    <View style={{ width: "85%" }}>
                        <InputField
                            backgroundColor={"transparent"}
                            height={60}
                            value={depositeAmount}
                            onChangeText={txt => setDepositeAmount(txt)}
                        />
                    </View>
                </View>

                {DropDownItem === "Bank Deposit" ?
                    <>
                        <ResponsiveText size="h8" margin={[wp(12), 0, 0, 0]} color={"#000"} >{"Upload Picture of Deposit Slip/Confirmation Document"}</ResponsiveText>
                        <Pressable onPress={() => opengallery()}
                            style={{
                                backgroundColor: "#455154", alignItems: "center", height: 58,
                                justifyContent: "center", borderRadius: 11, marginTop: wp(2), flexDirection: "row"
                            }}>
                            <ResponsiveText size="h7" margin={[0, 6, 0, 0]} color={"#fff"} >{"Upload"}</ResponsiveText>
                            <Image source={iconPath.uploadWhite} style={{ width: wp(4), height: wp(4), resizeMode: "contain" }} />
                        </Pressable>
                    </>
                    :
                    <>
                        <ResponsiveText size="h8" color={"#616161"} margin={[15, 0, 5, 0]}>{"Enter Transaction ID :"}</ResponsiveText>
                        <InputField
                            height={60}
                            maxLength={20}
                            keyboardType="numeric"
                            value={TransactionId}
                            // onChangeText={txt => setTransactionId(txt)}
                            onChangeText={txt => setTransactionId(txt.replace(/[^0-9]/g, ''))}
                        />
                    </>
                }


                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(10), marginTop: DropDownItem === "Bank Deposit" ? wp(50) : wp(63), marginVertical: 20, }}>
                    <View style={{ width: "45%", }}>
                        <Button
                            onPress={() => props.navigation.goBack()}
                            Text={'Cancel'}
                            fontFamily={fonts.Poppins_Medium}
                            fontSize={16}
                            TextColor={"#FFFFFF"}
                            height={44}
                            backgroundColor={"#00000066"}
                        />
                    </View>
                    <View style={{ width: "45%", }}>
                        <Button
                            onPress={() => SubmitTransation()}
                            Text={'Submit'}
                            fontFamily={fonts.Poppins_Medium}
                            fontSize={16}
                            height={44}
                            backgroundColor={"#455154"}
                        />
                    </View>
                </View>
            </View>

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
export default Deposite;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.white,
        // justifyContent: "center",
        // alignItems: "center"
    },
    containerStyle: {
        backgroundColor: Colors.TextInputBackgroundColor, flexDirection: "row", marginVertical: wp(4),
        marginHorizontal: wp(4), padding: wp(4), borderRadius: 5, alignItems: "center"
    },
    headingContainer: { paddingHorizontal: wp(4), backgroundColor: Colors.TextInputBackgroundColor, paddingVertical: 4, justifyContent: "center" },

    dropDown_dropDownStyle: {
        width: wp(88),
        borderWidth: 0,
        marginLeft: wp(0),
        borderRadius: 11,
        borderTopWidth: .1,
        elevation: .5,


    },
    dropDown_textStyle: {
        fontSize: 13,
        color: "#000",
        fontFamily: fonts.Poppins_Medium,
        paddingLeft: wp(4.5)
    },
    dropDown: {
        height: 60,
        justifyContent: "center",
        borderRadius: 4,
        backgroundColor: Colors.TextInputBackgroundColor,
        borderRadius: 11
    },
    dropDownIcon: {
        width: wp(4.5),
        height: "100%",
        alignSelf: "flex-end",
        resizeMode: "contain",
        marginRight: 10,
        marginTop: wp(-8)
    }

})
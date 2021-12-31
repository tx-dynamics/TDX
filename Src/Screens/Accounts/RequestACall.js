import React, { useState, useEffect } from 'react'
import {
    View, Text, StyleSheet, Image,
    Modal, Dimensions,
    FlatList, Pressable
} from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';
import Button from '../../Components/Button';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker'

const RequestACall = (props) => {

    const [DateModal, setDateModal] = useState(false)
    const [timeModal, setTimeModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const [minDate, setMinDate] = useState('')
    const [callDate, setCallDate] = useState('')
    const [time, setTime] = useState(new Date())
    const [minTime, setMinTime] = useState('')
    // state = { date: new Date() }

    useEffect(() => {
        var tomorrow = new Date();

        var time = tomorrow.getHours() + ":" + parseInt(tomorrow.getMinutes() + 1);
        setMinTime(time)
        // alert(JSON.stringify(time))

        tomorrow.setDate(tomorrow.getDate() + 1);
        setMinDate(tomorrow.toISOString().split('T')[0])
        setCallDate(tomorrow.toISOString().split('T')[0])
        setSelectedDate({ [tomorrow.toISOString().split('T')[0]]: { selected: true, selectedColor: "#000" } })

        // alert(new Date().toISOString().split('T')[0])
    }, [])

    const CalendarHeader = (date) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return (
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                <ResponsiveText size="h4" fontFamily={fonts.Poppins_Medium}>{monthNames[date.getMonth()] + " " + date.getFullYear()}</ResponsiveText>
                <Image source={iconPath.timeIcon} style={{ width: wp(9), height: wp(9), resizeMode: "contain" }} />
            </View>
        );
    };

    const dateSelect = async (day) => {
        // alert(JSON.stringify(day))
        setSelectedDate({ [day.dateString]: { selected: true, selectedColor: "#000" } })
        setDateModal(false)
        await setCallDate(day.dateString)
    }
    const setCallDatee = () => {
        // setCallDate()
    }

    const checkDay = (value) => value.split(" ")[1] === 'Saturday' || value.split(" ")[1] === 'Sunday'

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.drawerIcon}
                midtitle title={"Request A Call"}
                leftPress={() => props.navigation.openDrawer()} />

            <View style={{ paddingHorizontal: wp(4), marginTop: wp(6), flex: 1 }}>

                <ResponsiveText size="h7" textAlign={"justify"} fontFamily={fonts.Poppins_Medium} >{"To request a call please select your available time within which you will be contacted"}</ResponsiveText>

                <ResponsiveText size="h8" margin={[wp(6), 0, 0, 0]} >{"Date:"}</ResponsiveText>

                <Pressable onPress={() => setDateModal(true)}
                    style={{ flexDirection: "row", alignItems: "center", marginTop: wp(3) }}>
                    <View style={{ backgroundColor: "#EEEEEE", width: wp(32), height: wp(11), borderRadius: 4, justifyContent: "center", alignItems: "center" }}>
                        <ResponsiveText size="h8" >{callDate}</ResponsiveText>
                    </View>
                </Pressable>

                <ResponsiveText size="h8" margin={[wp(6), 0, 0, 0]} >{"I am available from:"}</ResponsiveText>

                <View style={{ flexDirection: "row", marginTop: wp(4), alignItems: "center", justifyContent: "space-between" }}>
                    <Pressable onPress={() => setTimeModal(true)}
                        style={{ flexDirection: "row", alignItems: "center" }}>

                        <View style={{ backgroundColor: "#EEEEEE", width: wp(12), height: wp(11), borderRadius: 4, justifyContent: "center", alignItems: "center" }}>
                            <ResponsiveText size="h8" >{"10"}</ResponsiveText>
                        </View>
                        <ResponsiveText size="h5" margin={[0, wp(3), 0, wp(3)]} textAlign={"center"} >{":"}</ResponsiveText>
                        <View style={{ backgroundColor: "#EEEEEE", width: wp(12), height: wp(11), borderRadius: 4, justifyContent: "center", alignItems: "center" }}>
                            <ResponsiveText size="h8" >{"00"}</ResponsiveText>
                        </View>

                        <View style={{
                            backgroundColor: "#EEEEEE", width: wp(12), height: wp(11), borderRadius: 4,
                            justifyContent: "center", alignItems: "center", marginLeft: wp(12)
                        }}>
                            <ResponsiveText size="h8" >{"AM"}</ResponsiveText>
                        </View>
                    </Pressable>

                    <Image source={iconPath.timeIcon} style={{ width: wp(6), height: wp(6), resizeMode: "contain" }} />

                    <DatePicker
                        modal
                        open={timeModal}
                        date={time}
                        onDateChange={date => setTime(date)}
                        mode={'time'}
                        format="HH:mm"
                        minDate={minTime}
                        maxDate="19:30"
                        textColor={"#fff"}
                        style={{ color: "#fff" }}
                        onConfirm={(date) => {
                            setTimeModal(false)
                            setTime(date)
                            alert(time)
                        }}
                        onCancel={() => {
                            setTimeModal(false)
                        }}
                    />


                </View>

                <ResponsiveText size="h8" margin={[wp(6), 0, wp(6), 0]} >{"To"}</ResponsiveText>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Pressable style={{ flexDirection: "row", alignItems: "center" }}>

                        <View style={{ backgroundColor: "#EEEEEE", width: wp(12), height: wp(11), borderRadius: 4, justifyContent: "center", alignItems: "center" }}>
                            <ResponsiveText size="h8" >{"05"}</ResponsiveText>
                        </View>
                        <ResponsiveText size="h5" margin={[0, wp(3), 0, wp(3)]} textAlign={"center"} >{":"}</ResponsiveText>
                        <View style={{ backgroundColor: "#EEEEEE", width: wp(12), height: wp(11), borderRadius: 4, justifyContent: "center", alignItems: "center" }}>
                            <ResponsiveText size="h8" >{"00"}</ResponsiveText>
                        </View>

                        <View style={{
                            backgroundColor: "#EEEEEE", width: wp(12), height: wp(11), borderRadius: 4,
                            justifyContent: "center", alignItems: "center", marginLeft: wp(12)
                        }}>
                            <ResponsiveText size="h8" >{"PM"}</ResponsiveText>
                        </View>
                    </Pressable>

                    <Image source={iconPath.timeIcon} style={{ width: wp(6), height: wp(6), resizeMode: "contain" }} />

                </View>

                <View style={{ flex: 1, justifyContent: "flex-end" }}>


                    <View style={{ width: "38%", alignSelf: "center" }}>
                        <Button
                            Text={'Request'}
                            fontFamily={fonts.Poppins_Medium}
                            fontSize={16}
                            backgroundColor={"#455154"}
                            height={55}
                        />
                    </View>

                    <View style={{ backgroundColor: "#FF4A7A1A", borderRadius: 11, marginBottom: wp(3), padding: wp(4), marginTop: wp(12), paddingHorizontal: wp(7) }}>
                        <ResponsiveText size="h9" textAlign={"center"} fontFamily={fonts.Poppins_Medium} >{"We are not available at the weekends. Call can be made between 10am and 4pm on weekdays"}</ResponsiveText>
                    </View>



                </View>

            </View>




            <Modal
                transparent={true}
                animationType={'none'}
                visible={DateModal}
                onRequestClose={() => { console.log('close modal') }}>
                <Pressable
                    onPress={() => setDateModal(false)}
                    style={styles.modalBackground}>
                    <Pressable style={styles.activityIndicatorWrapper}>

                        <Calendar
                            onDayPress={(day) => dateSelect(day)}
                            current={new Date().toISOString().split('T')[0]}
                            // current={minDate}
                            markedDates={selectedDate}
                            minDate={minDate}
                            dayComponent={({ accessibilityLabel, date, state }) => {
                                return (
                                    (checkDay(accessibilityLabel) || state) ?
                                        <Pressable>
                                            <Text style={{ color: "#858585", fontSize: 14, fontFamily: fonts.Poppins, padding: wp(2) }}>{date.day}</Text>
                                        </Pressable>
                                        :
                                        <Pressable onPress={() => dateSelect(date)}>
                                            <Text style={{
                                                color: date.dateString === callDate ? "#fff" : "#000",
                                                backgroundColor: date.dateString === callDate ? "#000" : "#fff",
                                                borderRadius: 50,
                                                paddingHorizontal: 12,
                                                paddingVertical: 5,
                                                fontSize: 14, fontFamily: fonts.Poppins, padding: wp(2),
                                            }}>{date.day}</Text>
                                        </Pressable>
                                );
                            }}
                            hideExtraDays={true}
                            style={{ width: wp(90) }}
                            theme={{
                                backgroundColor: 'transparent',
                                calendarBackground: 'transparent',
                                textSectionTitleColor: "gray",
                                // selectedDayBackgroundColor: 'green',
                                selectedDayTextColor: '#fff',
                                todayTextColor: '#00adf5',
                                dayTextColor: 'white',
                                textDisabledColor: '#858585',
                                textDayStyle: {
                                    color: "#000",
                                    fontSize: 14,
                                    fontFamily: fonts.Poppins,
                                },
                            }}
                            // renderHeader={CalendarHeader}
                            // renderArrow={(direction) =>
                            //     (direction === 'left' ?
                            //         <Fonticon type={"Ionicons"} name={"arrow-back"} size={wp(7)} color={Colors.black} style={{ paddingTop: wp(0) }} />
                            //         :
                            //         <Fonticon type={"Ionicons"} name={"person"} size={wp(7)} color={Colors.greenColor} style={{ paddingTop: wp(0) }} />
                            //     )}
                            enableSwipeMonths={true}
                            // hideArrows={true}
                            // disableArrowLeft={true}
                            pastScrollRange={1}
                        />
                    </Pressable>
                </Pressable>
            </Modal>

        </View>
    )
}
export default RequestACall;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
        paddingHorizontal: wp(4)
    },
    activityIndicatorWrapper: {
        backgroundColor: "white",
        height: wp(120),
        width: "100%",
        borderRadius: 10,
        // display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        // paddingVertical:wp(6)
    }
})


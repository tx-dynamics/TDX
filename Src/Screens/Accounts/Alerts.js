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
import Button from '../../Components/Button';

import { useSelector, useDispatch } from 'react-redux';

import { _getAlerts, _removeNotification, _removeAlert } from '../../Redux/Actions/Actions';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';


import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const Greendata = {
    datasets: [
        {
            data: [
                10,
                8,
                15,
                10,
                15,
                10,
                15
            ]
        }
    ]
}
const Reddata = {
    datasets: [
        {
            data: [
                15,
                10,
                13,
                10,
                12,
                8,
                10
            ]
        }
    ]
}

const DATA = [
    { id: "1", coinName: "GWAYM1", type: "green", value: "2000", percent: "+10%" },
    { id: "2", coinName: "GWAYM2", type: "red", value: "1875", percent: "-3.8%" },
    { id: "3", coinName: "GWAYM3", type: "green", value: "2000", percent: "+10%" },
    { id: "4", coinName: "GWAYM4", type: "red", value: "1875", percent: "-3.8%" },
    { id: "5", coinName: "GWAYM5", type: "green", value: "2000", percent: "+10%" },
    { id: "6", coinName: "GWAYM6", type: "green", value: "2000", percent: "+10%" },

]



const Alerts = (props) => {

    const dispatch = useDispatch();

    const [DropDownItem, setDropDownItem] = useState('')
    const [selectedBtn, setSelectedBtn] = useState("Open")

    const [AlertsState, setAlertsState] = useState([])

    const userToken = useSelector(state => state.AuthReducer.userToken);
    const Alertss = useSelector(state => state.HomeReducer.Alertss);

    useEffect(() => {
        setAlertsState(Alertss)
    }, [Alertss])

    useEffect(() => {
        getAllAlerts()
    }, [])

    const getAllAlerts = async () => {
        let data = {}
        data["token"] = userToken;
         dispatch(_getAlerts('get_alerts', data))
    }
    const removeAlert = async (alertId) => {
        let data = {}
        data["token"] = userToken; 
        data["alert_id"] = alertId;
        // alert(JSON.stringify(alertId))
         dispatch(_removeAlert('remove_alert', data, userToken ))
    }

    const optionsStyles = {
        optionsContainer: {
            width: wp(23),
            borderRadius: 10,
            marginTop: wp(8),
            alignItems:"center"
        },
        optionsWrapper: {
            //   backgroundColor: 'purple',
        },
        optionWrapper: {
            //   backgroundColor: 'yellow',
            margin: 5,
        },
        optionTouchable: {
            //   underlayColor: 'gold',
            activeOpacity: 70,
        },
        optionText: {
            //   color: 'brown',
        },
    };

    const triggerStyles = {
        triggerText: {
            color: 'white',
        },
        triggerOuterWrapper: {
            //   backgroundColor: 'orange',
            padding: 5,
            flex: 1,
        },
        triggerWrapper: {
            //   backgroundColor: 'blue',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        },
        triggerTouchable: {
            //   underlayColor: 'darkblue',
            activeOpacity: 70,
            style: {
                flex: 1,
            },
        },
    };

    return (
        <View style={styles.container}>
            <Header left LeftImage ImageName={iconPath.backArrow}
                midtitle title={"Alerts"}
                leftPress={() => props.navigation.goBack()} />

            <FlatList
                data={AlertsState}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: wp(5) }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (

                    <View style={{ padding: wp(4), paddingBottom: wp(2) }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 7 }}>
                            <ResponsiveText size="h8" margin={[0, 0, 0, 5]}>{item?.ticker}</ResponsiveText>

                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                {item?.chartData[0]?.price !== undefined &&
                                    <LineChart
                                        data={{
                                            datasets: [
                                                {
                                                    data: item?.chartData?.map((itemm) => {
                                                        return (
                                                            parseInt(itemm.price)
                                                        )
                                                    })
                                                }
                                            ]
                                        }}
                                        width={wp(30)} // from react-native
                                        height={wp(11)}
                                        withHorizontalLabels={false}
                                        flatColor={true}
                                        chartConfig={{
                                            backgroundGradientFromOpacity: 0,
                                            backgroundGradientToOpacity: 0,
                                            color: (opacity = 1) => Colors.greenColor,
                                            propsForDots: { r: "0" },
                                            propsForBackgroundLines: { stroke: "#CCCCCC33" }
                                        }}
                                        bezier
                                        style={{ paddingRight: 0, paddingTop: 3, transform: [{ translateX: -15 }] }}
                                    />
                                }

                                <View style={{ alignItems: "flex-end" }}>
                                    <ResponsiveText size="h8" color={item?.trend >= 0 ? Colors.greenColor : Colors.redColor}>{parseFloat(item?.price).toFixed(1)}</ResponsiveText>
                                    <ResponsiveText size="h10" color={item?.trend >= 0 ? Colors.greenColor : Colors.redColor} margin={[-4, 0, 0, 0]}>{"" + item?.trend + " %"}</ResponsiveText>
                                </View>

                                <Menu style={{  }}
                                    rendererProps={{ anchorStyle: styles.anchorStyle }}
                                    style={{ height: 50 }}>
                                    <MenuTrigger customStyles={triggerStyles}>
                                        <Fonticon type={"Entypo"} name={"dots-three-vertical"} size={16} color={Colors.black} 
                                        style={{marginLeft:5, marginRight:-5 }}
                                        />
                                    </MenuTrigger>
                                    <MenuOptions customStyles={optionsStyles}>
                                        <MenuOption 
                                        onSelect={() => removeAlert(item?.alert_id)}
                                        >
                                            <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{"Remove"}</ResponsiveText>
                                        </MenuOption>
                                    </MenuOptions>
                                </Menu>


                            </View>

                        </View>



                    </View>


                )} />

                {Alertss.length < 1 &&
                    <View style={{ justifyContent: "center", alignItems: "center" , position:"absolute", top:"20%", alignSelf:"center"}}>
                        <ResponsiveText size="h6" fontFamily={fonts.Poppins_SemiBold} margin={[wp(5), 0, 0, 0]}>{"No Alert Found"}</ResponsiveText>
                    </View>
                }
        </View>
    )
}
export default Alerts;
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
        width: wp(90),
        borderWidth: 0,
        marginLeft: wp(-12)

    },
    dropDown_textStyle: {
        fontSize: 15,
        color: "#6F7074",
        fontFamily: fonts.Poppins
    },
    dropDown: {
        height: 50,
        justifyContent: "center",
        borderRadius: 4,
        // backgroundColor: Colors.TextInputBackgroundColor
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
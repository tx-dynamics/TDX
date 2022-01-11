import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, FlatList, Pressable } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';

import { useSelector, useDispatch } from 'react-redux';
import { _getNotification , _removeNotification} from '../../Redux/Actions/Actions';

import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

export default function Notifications(props) {

    const dispatch = useDispatch();

    const [Notificationss, setNotificationss] = useState([])

    const userToken = useSelector(state => state.AuthReducer.userToken);
    const Notifications = useSelector(state => state.HomeReducer.Notifications);

  
    useEffect(() => {
        setNotificationss(Notifications)
    }, [Notificationss])
    useEffect(() => {
        getWatchlistMarkets()
        // alert(JSON.stringify(Notifications))
    }, [])

    const getWatchlistMarkets = async () => {
        let data = {}
        data["token"] = userToken;
        await dispatch(_getNotification('get_notifications', data))
    }

    const RemoveNotification = async (id) => {
        let data = {}
        data["token"] = userToken;
        data["id"] = id;
        await dispatch(_removeNotification('remove_notification', data, userToken))
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
                midtitle title={"Notifications"}
                leftPress={() => props.navigation.goBack()} />

            <FlatList
                data={Notifications}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: wp(3) }}
                contentContainerStyle={{ paddingHorizontal: wp(5) }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={styles.notification}>
                        <View style={{ width: "96%" }}>
                            <ResponsiveText size="h8" margin={[0, 0, 0, 5]}>{item?.des}</ResponsiveText>
                        </View>

                        <Menu style={{ marginRight: 5, }}
                            rendererProps={{ anchorStyle: styles.anchorStyle }}
                            style={{ height: 50 }}>
                            <MenuTrigger customStyles={triggerStyles}>
                                <Fonticon type={"Entypo"} name={"dots-three-vertical"} size={16} color={Colors.black} />
                            </MenuTrigger>
                            <MenuOptions customStyles={optionsStyles}>
                                <MenuOption onSelect={() => RemoveNotification(item.id)}>
                                    <ResponsiveText size="h8" margin={[0, 0, 0, 0]}>{"Remove"}</ResponsiveText>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>
                )} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    notification: {
        flexDirection: "row", backgroundColor: "#EEEEEE", paddingHorizontal: wp(4), justifyContent: "space-between",
        alignItems: "center", paddingVertical: wp(3), borderRadius: 8, marginBottom: 12
    }


})

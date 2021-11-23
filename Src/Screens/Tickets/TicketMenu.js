import React from 'react'
import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native'

import { Colors } from '../../Constants/Colors';
import Fonticon from '../../Constants/FontIcon';
// import { iconPath } from '../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import ResponsiveText from '../../Components/RnText';
import Header from '../../Components/Header';
import { fonts } from '../../Constants/Fonts';

const DATA = [
    {
      id: '1',
      title: 'My Tasks',
      iconType:"Entypo",
      iconName:"ticket",
    },
    {
      id: '2',
      title: 'All Tickets',
      iconType:"Entypo",
      iconName:"ticket",
    },
    {
      id: '3',
      title: 'New Tasks',
      iconType:"Entypo",
      iconName:"ticket",
    },
    {
      id: '3',
      title: 'Add Manual Ticket',
      iconType:"Entypo",
      iconName:"ticket",
    },
    {
      id: '3',
      title: 'Manual Tickets',
      iconType:"Entypo",
      iconName:"ticket",
    },
    {
      id: '3',
      title: 'Flagged Tickets',
      iconType:"Entypo",
      iconName:"ticket",
    },
  ];

 const navigate = (item) => {
    if (item.id === '1') {
      // this.props.navigation.navigate("HomeStack")
      // this.props.navigation.navigate("HomeStack")
    //   this.props.navigation.navigate('DrawerStack', { screen: 'TicketMenu' });
    }
    else if (item.id === "2") {
      // this.props.navigation.navigate("BinStack")
      // this.props.navigation.navigate('BinStack', { screen: 'AddBin' });

    }
    else if (item.id === "3") {
      // this.props.navigation.navigate('DrawerStack', { screen: 'Store' });
    }
    else if (item.id === "4") {
      // this.props.navigation.navigate("RequestBin")
      // DrawerStack
      // this.props.navigation.closeDrawer()
      // this.props.navigation.navigate('DrawerStack', { screen: 'RequestBin' });
    }
    else if (item.id === "5") {
      // this.props.navigation.navigate('DrawerStack', { screen: 'Cart' });
      // this.props.navigation.closeDrawer()
      // this.props.navigation.navigate('DrawerStack', { screen: 'Addperson' });
    }
    else if (item.id === "6") {
      // this.props.navigation.closeDrawer()
      // this.props.navigation.navigate('DrawerStack', { screen: 'MemberShip' });
    }
    else if (item.id === "7") {
      // this.props.navigation.closeDrawer()
      // this.props.navigation.navigate('DrawerStack', { screen: 'Orders' });
    }
    else {
      // alert("elseeee")
    }
  }
  


const TicketMenu = (props) => {
    return (
        <View style={styles.container}>
            <Header left LeftIconType={"Ionicons"} LeftIconName={"arrow-back"}
                title={"Tickets"}
                leftPress={() => props.navigation.goBack()} />

            <FlatList
                data={DATA}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={{ marginTop: 5 }}>
                        <Pressable style={{ flexDirection: "row", paddingHorizontal: wp(2), justifyContent: "space-between", alignItems: "center", paddingVertical: wp(2.9), }}
                            onPress={() => navigate(item)}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Fonticon type={item.iconType} name={item.iconName} size={wp(7)} color={"#000"} />
                                <ResponsiveText size="h7" margin={[0, 0, 0, 12]} color={"#000"}>{item.title}</ResponsiveText>
                            </View>
                            <Fonticon type={"MaterialIcons"} name={"navigate-next"} size={wp(6)} color={"#000"} />
                        </Pressable>
                    </View>
                )} />


        </View>
    )
}
export default TicketMenu;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.white,
        // justifyContent: "center",
        // alignItems: "center"
    }
})
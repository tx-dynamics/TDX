import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Share,
  Pressable,
  ScrollView
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from "../../Constants/Colors";
import Fonticon from '../../Constants/FontIcon';
import { wp } from '../../Helpers/Responsiveness';
import { connect } from 'react-redux'
import { SetSession, } from '../../Redux/Actions/Actions'
import { iconPath } from '../../Constants/icon';
import { fonts } from '../../Constants/Fonts';
import ResponsiveText from '../../Components/RnText';

const DATA = [
  {
    id: '1',
    title: 'Settings',
    iconType: "Entypo",
    iconName: "ticket",
    imgName: iconPath.Drawer1
  },
  {
    id: '2',
    title: 'Request A Call',
    iconType: "MaterialCommunityIcons",
    iconName: "mailbox-open-up",
    imgName: iconPath.Drawer2

  },
  {
    id: '3',
    title: 'Help',
    iconType: "MaterialCommunityIcons",
    iconName: "view-dashboard-variant",
    imgName: iconPath.Drawer3

  },
  {
    id: '4',
    title: 'Terms & Services',
    iconType: "MaterialCommunityIcons",
    iconName: "view-dashboard-variant",
    imgName: iconPath.Drawer4

  },
  {
    id: '5',
    title: 'Logout',
    iconType: "MaterialCommunityIcons",
    iconName: "view-dashboard-variant",
    imgName: iconPath.Drawer4

  },
];

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  navigate = (item) => {
    if (item.id === '1') {
      // this.props.navigation.navigate("HomeStack")
      // this.props.navigation.navigate("HomeStack")
      this.props.navigation.navigate('AccountStack', { screen: 'SettingScreen' });
    }
    else if (item.id === "2") {
      // this.props.navigation.navigate("BinStack")
      this.props.navigation.navigate('AccountStack', { screen: 'RequestACall' });
    }
    else if (item.id === "3") {
      // this.props.navigation.navigate('DrawerStack', { screen: 'Store' });
    }
    else if (item.id === "4") {
      
    }
    else if (item.id === "5") {
      this.LogoutFun()
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
    }
  }

  upperNavigation = (id) => {
    if (id === "3") {
      this.props.navigation.navigate('DrawerStack', { screen: 'QrCode' });
    } else if (id === "4") {
      this.props.navigation.navigate('DrawerStack', { screen: 'Store' });
    }

  }

  LogoutFun = async () => {

    let data = {}
    data["isLogin"] = false;
    data["userToken"] = "";
    data["userId"] = "";
    data["userInfo"] = "";
    this.props.SessionMaintain(data)

  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: wp(4) }}>
        <View style={{ flexDirection: "row", alignItems: "center", paddingTop: wp(5) }}>
          <Pressable onPress={() => this.props.navigation.closeDrawer()}>
            <Image source={iconPath.backArrow} style={{ width: wp(6.5), height: wp(6.5), resizeMode: "contain" }} />
          </Pressable>
          <Image source={iconPath.Logo} style={{ width: wp(42), height: wp(16), resizeMode: "contain", marginLeft: wp(9) }} />
        </View>



        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          extraData={this.state}
          style={{ marginTop: wp(12) }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={{ marginTop: 10, marginHorizontal:wp(1) }}>
              <Pressable style={{
                flexDirection: "row", backgroundColor: "#EEEEEE", paddingHorizontal: wp(4), justifyContent: "space-between",
                alignItems: "center", paddingVertical: wp(3.5), borderRadius: 9
              }}
                onPress={() => this.navigate(item)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image source={item.imgName} style={{ width: index ===1 ? wp(6.2) : wp(5.5), height: index ===1 ? wp(6.2) : wp(5.5), resizeMode: "contain" }} />
                  <ResponsiveText size="h8" margin={[0, 0, 0, 4]}>{item.title}</ResponsiveText>
                </View>
              </Pressable>
            </View>
          )} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    LoginType: state.AuthReducer.LoginType,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SessionMaintain: (userData) => dispatch(SetSession(userData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: 'flex',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  drawerbg: {
    width: 280,
    height: 230
  },
  dp: {

    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#000'
  },
  text: {
    color: '#6D6D6D',
    position: 'absolute',
    bottom: 37,
    left: 20,
    fontSize: 20
  },
  text2: {
    color: '#6D6D6D',
    position: 'absolute',
    bottom: 12,
    left: 20,
    fontSize: 17
  },
  subConatainer: {
    marginLeft: 10,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 60
  },
  drawerIcon: {
    // marginLeft: 50,
    height: 28,
    width: 28,
  },
  drawerText: {
    fontSize: 18,
    marginLeft: 15,
    textAlign: "center",
  }
});


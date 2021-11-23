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
// import { SetSession, ChangeProfileRoute } from '../../Redux/Actions/Actions'
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
    title: 'Request a call',
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
    title: 'terms & Services',
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
      this.props.navigation.navigate('DrawerStack', { screen: 'TicketMenu' });
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

  upperNavigation = (id) => {
    if (id === "3") {
      this.props.navigation.navigate('DrawerStack', { screen: 'QrCode' });
    } else if (id === "4") {
      this.props.navigation.navigate('DrawerStack', { screen: 'Store' });
    }

  }

  LogoutFun = async () => {

    // alert(this.props.LoginType)
    // let data = {}
    // data["userId"] = "";
    // data["isLogin"] = false;
    // this.props.SessionMaintain(data)
    // this.props.ChangeRoute(data)

    // if (this.props.LoginType === "Google") {
    //   try { LoginManager.logOut() } catch (error) { console.warn(error) }
    //   try {
    //     await GoogleSignin.revokeAccess();
    //     await GoogleSignin.signOut();
    //   } catch (error) { console.warn(error) }

    // } else if (this.props.LoginType === "Facebook") {
    //   try { LoginManager.logOut() } catch (error) { console.warn(error) }
    // }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: wp(4) }}>
        <View style={{ flexDirection: "row", alignItems: "center", paddingTop: wp(5) }}>
          <Fonticon type={"Ionicons"} name={"arrow-back"} size={wp(7)} color={Colors.black} style={{ paddingTop: wp(0) }}
            onPress={() => this.props.navigation.closeDrawer()} />
          <Image source={iconPath.Logo} style={{ width: wp(42), height: wp(16), resizeMode: "contain", marginLeft: wp(9) }} />
        </View>



        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          extraData={this.state}
          style={{ marginTop: wp(12) }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={{ marginTop: 10 }}>
              <Pressable style={{
                flexDirection: "row", backgroundColor: "#EEEEEE", paddingHorizontal: wp(4), justifyContent: "space-between",
                alignItems: "center", paddingVertical: wp(3.5), borderRadius: 12
              }}
              // onPress={() => this.navigate(item)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image source={item.imgName} style={{ width: wp(7), height: wp(7), resizeMode: "contain" }} />
                  <ResponsiveText size="h7" margin={[0, 0, 0, 12]}>{item.title}</ResponsiveText>
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
    ChangeRoute: (userData) => dispatch(ChangeProfileRoute(userData)),
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


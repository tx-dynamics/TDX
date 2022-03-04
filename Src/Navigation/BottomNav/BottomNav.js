import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Keyboard } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { wp } from '../../Helpers/Responsiveness';
import HomeStack from '../Stack/HomeStack';
import TradeStack from '../Stack/TradeStack';
import MarketInfoStack from '../Stack/MarketInfoStack';
import AccountStack from '../Stack/AccountStack';
import AssetsStack from '../Stack/AssetsStack';

import { iconPath } from '../../Constants/icon';
import { Colors } from '../../Constants/Colors';
import ResponsiveText from '../../Components/RnText';
import { fonts } from '../../Constants/Fonts';

// import HotDog from '../Stack/HotDog';
const Tab = createBottomTabNavigator();

function Screen1() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}> </Text>
    </View>
  );
}
function Screen2() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}> </Text>
    </View>
  );
}
function Screen3() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}></Text>
    </View>
  );
}
function Screen4() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}> </Text>
    </View>
  );
}

export default function BottomNav() {
  return (
    <Tab.Navigator
     
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        showLabel: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 55,
          // elevation: 0, shadowOpacity: 0,
          borderTopColor: "transparent",
          justifyContent: "center", alignItems: "center",
          backgroundColor: Colors.white,
        },
      }}
      initialRouteName="HomeStack">
      <Tab.Screen name="HomeStack" component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ padding: 3, borderRadius: 8, alignItems: "center" }}>
              <Image source={focused ? iconPath.Bottom1Dark : iconPath.Bottom1} style={{ width: wp(7), height: wp(7), resizeMode: "contain" }} />
            </View>
          ),
        }}
      // listeners={({ navigation }) => ({
      //   tabPress: () => { navigation.navigate('HomeStack', { screen: 'MainScreen' }) }
      // })}
      />
      <Tab.Screen name="MarketInfoStack" component={MarketInfoStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ padding: 3, borderRadius: 8, alignItems: "center", paddingLeft: 4 }}>
              <Image source={focused ? iconPath.Bottom2Dark : iconPath.Bottom2} style={{ width: wp(7), height: wp(7), resizeMode: "contain" }} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="TradeStack"
        component={TradeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ backgroundColor: Colors.greenColor, borderRadius: 4, alignItems: "center", height: "100%", width: "85%", justifyContent: "center" }}>
              <Image source={iconPath.Bottom3} style={{ width: wp(20), height: wp(20), resizeMode: "contain" }} />
            </View>
          ),
        }}
      // listeners={({ navigation }) => ({
      //   tabPress: () => {
      //     navigation.navigate('HomeStack', { screen: 'HomeScreen' });
      //   },
      // })}
      />

      <Tab.Screen
        name="AssetsStack"
        component={AssetsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ padding: 4, borderRadius: 8, alignItems: "center" }}>
              <Image source={focused ? iconPath.Bottom4Dark : iconPath.Bottom4} style={{ width: wp(6), height: wp(6), resizeMode: "contain" }} />
            </View>
          ),

        }}
      />
      <Tab.Screen
        name="AccountStack"
        component={AccountStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ padding: 4, borderRadius: 8, alignItems: "center" }}>
              <Image source={focused ? iconPath.Bottom5Dark : iconPath.Bottom5} style={{ width: wp(8), height: wp(8), resizeMode: "contain" }} />
            </View>
          ),
        }}

        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('AccountStack', { screen: 'Account' });
          },
        })}
      />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

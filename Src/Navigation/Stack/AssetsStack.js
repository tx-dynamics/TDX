import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import AssetsScreen from '../../Screens/AssetScreens/AssetsScreen'
import Deposite from '../../Screens/AssetScreens/Deposite'
import Withdraw from '../../Screens/AssetScreens/Withdraw'
import AssetsDetailss from '../../Screens/AssetScreens/AssetsDetailss'
import TradeScreenn from '../../Screens/AssetScreens/TradeScreenn'
import AssetsDetailsss from '../../Screens/Home/AssetsDetails'

const Stack = createNativeStackNavigator();

function AssetsStack(props) {

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="AssetsScreen" component={AssetsScreen} />
                <Stack.Screen name="AssetsDetailsss" component={AssetsDetailsss} />
                <Stack.Screen name="Deposite" component={Deposite} />
                <Stack.Screen name="Withdraw" component={Withdraw} />
                <Stack.Screen name="AssetsDetailss" component={AssetsDetailss} />
                <Stack.Screen name="TradeScreenn" component={TradeScreenn} />
            </Stack.Navigator>

        </>
    );
}
export default AssetsStack;
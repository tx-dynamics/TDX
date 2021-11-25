import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import AssetsScreen from '../../Screens/AssetScreens/AssetsScreen'
import Deposite from '../../Screens/AssetScreens/Deposite'
import Withdraw from '../../Screens/AssetScreens/Withdraw'


const Stack = createNativeStackNavigator();

function AssetsStack(props) {

    return (
        <>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="AssetsScreen" component={AssetsScreen} />
                    <Stack.Screen name="Deposite" component={Deposite} />
                    <Stack.Screen name="Withdraw" component={Withdraw} />
                </Stack.Navigator>

        </>
    );
}
export default AssetsStack;
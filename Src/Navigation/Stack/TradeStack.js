import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import TradeScreen from '../../Screens/Trade/TradeScreen'


const Stack = createNativeStackNavigator();

function TradeStack(props) {

    return (
        <>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="TradeScreen" component={TradeScreen} />
                </Stack.Navigator>

        </>
    );
}
export default TradeStack;
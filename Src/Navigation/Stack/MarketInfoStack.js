import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import MarketInfoScreen from '../../Screens/MarketInfo/MarketInfoScreen'


const Stack = createNativeStackNavigator();

function MarketInfoStack(props) {

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MarketInfoScreen" component={MarketInfoScreen} />
            </Stack.Navigator>

        </>
    );
}
export default MarketInfoStack;
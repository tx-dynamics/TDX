import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import HomeScreen from '../../Screens/Home/HomeScreen'
import AssetsDetails from '../../Screens/Home/AssetsDetails'
import SearchScreen from '../../Screens/Home/SearchScreen'
import SearchNextScreen from '../../Screens/Home/SearchNextScreen'
import SearchDetails from '../../Screens/Home/SearchDetails'

const Stack = createNativeStackNavigator();

function HomeStack(props) {

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="AssetsDetails" component={AssetsDetails} />
                <Stack.Screen name="SearchScreen" component={SearchScreen} />
                <Stack.Screen name="SearchNextScreen" component={SearchNextScreen} />
                <Stack.Screen name="SearchDetails" component={SearchDetails} />
            </Stack.Navigator>

        </>
    );
}
export default HomeStack;
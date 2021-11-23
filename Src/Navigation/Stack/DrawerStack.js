import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import TicketMenu from '../../Screens/Tickets/TicketMenu'

const Stack = createNativeStackNavigator();

function DrawerStack(props) {

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="TicketMenu" component={TicketMenu} />
            </Stack.Navigator>
        </>
    );
}
export default DrawerStack;
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import Account from '../../Screens/Accounts/Account'
import SettingScreen from '../../Screens/Accounts/SettingScreen'
import ChangePassword from '../../Screens/Accounts/ChangePassword'
import NotificationSettings from '../../Screens/Accounts/NotificationSettings'

const Stack = createNativeStackNavigator();

function AccountStack(props) {

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="SettingScreen" component={SettingScreen} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
            </Stack.Navigator>
        </>
    );
}
export default AccountStack;
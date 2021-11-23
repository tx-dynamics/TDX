import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import Login from '../../Screens/Auth/Login'
import VerificationCode from '../../Screens/Auth/VerificationCode'
// import ForgotPassword from '../../Screens/Auth/ForgotPassword'
import SetupNewPassword from '../../Screens/Auth/SetupNewPassword'


const Stack = createNativeStackNavigator();

function AuthStack(props) {

    return (
        <>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="VerificationCode" component={VerificationCode} />
                    <Stack.Screen name="SetupNewPassword" component={SetupNewPassword} />
                    {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
                </Stack.Navigator>

        </>
    );
}
export default AuthStack;
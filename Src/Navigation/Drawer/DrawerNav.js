import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Content from './Content';
import BottomNav from '../BottomNav/BottomNav';
import Splash from '../../Screens/Splash';
// import DrawerStack from '../Stack/DrawerStack';
import { wp } from '../../Helpers/Responsiveness';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false,
      drawerStyle: {
        width: wp(80),
        // swipeEnabled : false,
      }, }}
      // initialRouteName="MainScreen"
      // contentComponent={Content}
      swipeEdgeWidth={0}
      // EdgeWidth={0}
      // swipeEnabled={false}
      gestureEnabled={true}
      drawerContent={props => <Content {...props} />}>
      {/* <Drawer.Screen name="Splash" component={Splash} /> */}
      <Drawer.Screen name="BottomNav" component={BottomNav} />
    </Drawer.Navigator>
  );
}


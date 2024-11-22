import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import ReachUs from '../screens/ReachUs';
import Testimonials from '../screens/Testimonials';
import CustomDrawer from '../components/CustomDrawer';
import Appointments from '../screens/Appointments';

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="ReachUs" component={ReachUs} />
      <Drawer.Screen name="Testimonials" component={Testimonials} />
      <Drawer.Screen name="Appointments" component={Appointments} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

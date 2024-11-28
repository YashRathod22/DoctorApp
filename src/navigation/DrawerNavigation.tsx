import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import ReachUs from '../screens/ReachUs';
import Testimonials from '../screens/Testimonials';
import CustomDrawer from '../components/CustomDrawer';
import Appointments from '../screens/Appointments';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import HistoryScreen from '../screens/HistoryScreen';

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="ReachUs" component={ReachUs} />
      <Drawer.Screen name="Testimonials" component={Testimonials} />
      <Drawer.Screen
        options={{
          headerLeft: props => (
            <Pressable
              style={{marginLeft: 8}}
              onPress={() => navigation.navigate('Home')}>
              <Entypo name="chevron-left" size={25} color={'#000'} />
            </Pressable>
          ),
        }}
        name="Appointments"
        component={Appointments}
      />
      <Drawer.Screen
        options={{
          headerLeft: props => (
            <Pressable
              style={{marginLeft: 8}}
              onPress={() => navigation.navigate('Home')}>
              <Entypo name="chevron-left" size={25} color={'#000'} />
            </Pressable>
          ),
          title: 'Medical History',
        }}
        name="HistoryScreen"
        component={HistoryScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

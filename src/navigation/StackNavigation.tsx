import { View, Text } from 'react-native'
import React from 'react'

import MedicalHistoryForm from '../screens/MedicalHistoryForm';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import MedicalConsentForm from '../screens/MedicalConsentForm';
import RequestAppointment from '../screens/RequestAppointment';
import Appointments from '../screens/Appointments';
import FormSubmission from '../screens/FormSubmission';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import SplashScreen from '../screens/SplashScreen';
import Home from '../screens/Home';

const StackNavigation = () => {
    const Stack = createStackNavigator()
    const navigation = useNavigation()
    return (
        <Stack.Navigator initialRouteName='SplashScreen'>
            <Stack.Screen options={{
                headerShown: false
            }} name='DrawerNavigation' component={DrawerNavigation} />
            <Stack.Screen options={{
                headerShown: false
            }} name='SplashScreen' component={SplashScreen} />
            <Stack.Screen options={{
                title: 'Your Medical History'
            }} name='MedicalHistoryForm' component={MedicalHistoryForm} />
            <Stack.Screen options={{
                title: 'Medical Consent Form'
            }} name='MedicalConsentForm' component={MedicalConsentForm} />
            <Stack.Screen options={{
                title: 'Request an Appointment'
            }} name='RequestAppointment' component={RequestAppointment} />
            <Stack.Screen options={{
                headerLeft: (props) => (<Pressable style={{ marginLeft: 5 }} onPress={() => navigation.navigate('Home')}>
                    <Entypo name='chevron-left' size={25} color={'#000'} />
                </Pressable>)
            }} name='Appointments' component={Appointments} />
            <Stack.Screen name='FormSubmission' component={FormSubmission} />
        </Stack.Navigator>
    )
}

export default StackNavigation
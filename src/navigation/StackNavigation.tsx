import { View, Text } from 'react-native'
import React from 'react'

import MedicalHistoryForm from '../screens/MedicalHistoryForm';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import MedicalConsentForm from '../screens/MedicalConsentForm';
import RequestAppointment from '../screens/RequestAppointment';
import Appointments from '../screens/Appointments';
import FormSubmission from '../screens/FormSubmission';


const StackNavigation = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerShown: false
            }} name='DrawerNavigation' component={DrawerNavigation} />
            <Stack.Screen options={{
                title: 'Your Medical History'
            }} name='MedicalHistoryForm' component={MedicalHistoryForm} />
            <Stack.Screen options={{
                title: 'Medical Consent Form'
            }} name='MedicalConsentForm' component={MedicalConsentForm} />
            <Stack.Screen options={{
                title: 'Request an Appointment'
            }} name='RequestAppointment' component={RequestAppointment} />
            <Stack.Screen name='Appointments' component={Appointments} />
            <Stack.Screen name='FormSubmission' component={FormSubmission} />
        </Stack.Navigator>
    )
}

export default StackNavigation
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { darkBlue, lightGreen, white } from '../utils/Color'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { deleteData } from '../store/action'


const Appointments = () => {
    const appointmentData = useSelector((state: any) => state.reducer.userAppointData)
    console.log('update', appointmentData);
    const dispatch = useDispatch()
    const navigation = useNavigation()
    function deleteAppointData(data) {
        dispatch(deleteData(data))
    }
    return (
        <ScrollView>

            {
                appointmentData.length > 0 ?
                    appointmentData.map((data: any, index: any) => (
                        <View style={styles.container}>
                            <View style={{ flexDirection: 'row', gap: '10%', alignSelf: 'flex-start' }}>

                                <Text style={styles.text}>Booked Appointments</Text>
                                <View style={{ flexDirection: 'row', gap: '10%', alignItems: 'center', justifyContent: 'flex-end' }}>

                                    <Pressable onPress={() => navigation.navigate('RequestAppointment', { userEmailData: data })} style={styles.icon}>
                                        <FontAwesome5 name='user-edit' size={20} color={darkBlue} />
                                    </Pressable>
                                    <Pressable onPress={() => deleteAppointData(data)} style={styles.icon}>
                                        <MaterialCommunityIcons name='delete' size={25} color={darkBlue} />
                                    </Pressable>
                                </View>
                            </View>

                            <Text style={styles.text2}>Name: {data.firstName} {data.lastName}</Text>
                            <Text style={styles.text2}>Gender: {data.gender}</Text>
                            <Text style={styles.text2}>Age: {data.age}</Text>
                            <Text style={styles.text2}>Date: {data.appointmentDate} </Text>
                            <Text style={styles.text2}>Slot Time: {data.slotTime} pm</Text>
                            <Text style={styles.text2}>Email: {data.email}</Text>
                        </View>
                    )) : (
                        <View style={styles.container}>
                            <Text style={styles.text}>No Booked Appointments</Text>
                        </View>
                    )
            }
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 0.4,
        backgroundColor: white,
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        alignItems: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    icon: {
        // alignSelf: 'flex-end',
        marginTop: 15,
        // marginRight: '10%'
    },
    text: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 21,
        fontWeight: 'bold',
    },
    text2: {
        textAlign: 'center',
        marginTop: 13,
        fontSize: 17,
        marginBottom: 5
    }
})
export default Appointments
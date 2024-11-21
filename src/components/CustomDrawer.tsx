import { View, Text, Image, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { imageURL } from '../utils/Uri'

const CustomDrawer = (props: any) => {

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <Image source={{ uri: imageURL }} width={30} height={30} style={styles.img} />
                <Text style={styles.text}>Dr.Kajal</Text>
            </View>
            <DrawerItem label={'Home'} onPress={() => props.navigation.navigate('Home')} />
            <DrawerItem label={'ReachUs'} onPress={() => props.navigation.navigate('ReachUs')} />
            <DrawerItem label={'Testimonials'} onPress={() => props.navigation.navigate('Testimonials')} />
            <DrawerItem label={'Appointments'} onPress={() => props.navigation.navigate('Appointments')} />
        </DrawerContentScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        gap: 15
    },
    img: {
        alignContent: 'center'
    },
    text: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 16
    }
})

export default CustomDrawer
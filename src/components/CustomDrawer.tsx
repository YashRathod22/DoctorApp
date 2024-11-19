import { View, Text, Image, SafeAreaView } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { imageURL } from '../utils/Uri'

const CustomDrawer = (props: any) => {

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ flex: 1, flexDirection: 'row', padding: 20, gap: 15 }}>
                <Image source={{ uri: imageURL }} width={30} height={30} style={{ alignContent: 'center' }} />
                <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 16 }}>Dr.Kajal</Text>
            </View>
            <DrawerItem label={'Home'} onPress={() => props.navigation.navigate('Home')} />
            <DrawerItem label={'ReachUs'} onPress={() => props.navigation.navigate('ReachUs')} />
            <DrawerItem label={'Testimonials'} onPress={() => props.navigation.navigate('Testimonials')} />
            <DrawerItem label={'Appointments'} onPress={() => props.navigation.navigate('Appointments')} />
        </DrawerContentScrollView>

    )
}

export default CustomDrawer
import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { imageURL } from '../utils/Uri'
import { darkBlue } from '../utils/Color'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
    const navigation = useNavigation()
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('DrawerNavigation')
        }, 1000);
    }, [])
    return (
        <View style={styles.container}>
            <Image source={{ uri: imageURL }}
                width={150}
                height={150}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkBlue
    }
})

export default SplashScreen
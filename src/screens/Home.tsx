import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, Pressable, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { actuatedNormalize, actuatedNormalizeVertical, isTab } from '../utils/Scaling'
import { doctorImg, facebookURL, imageURL, linkedinURL, twitterURL, youtubeURL } from '../utils/Uri'
import { darkBlue, lightGreen, skyBlue, white } from '../utils/Color'


const Home = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const styles = getStyles(insets)
    return (
        <SafeAreaView style={styles.safeAreaStyle}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, }} bounces={false}>

                <View style={styles.imageContainer}>
                    <View style={styles.subContainer1}>
                        <Image source={{ uri: imageURL }}
                            width={75}
                            height={75}
                            style={styles.image}
                        />
                        <Text style={styles.name}>Dr. Kajal Rajput(MD)</Text>
                        <Text style={styles.text}>Anesthesiology  & Pathology</Text>
                    </View>
                    <View style={styles.subContainer}>
                        <View style={styles.card}>
                            <Image
                                source={{ uri: doctorImg }}
                                width={actuatedNormalize(340)}
                                height={actuatedNormalizeVertical(200)}
                                style={styles.image1}
                                resizeMode={'contain'}
                            />
                            <View style={styles.CardStyle}>

                                <Pressable onPress={() => navigation.navigate('MedicalHistoryForm')} style={styles.subCard}>
                                    <FontAwesome5 name='file-medical' size={30} color={lightGreen} style={styles.icon} />
                                    <Text style={styles.text1}>Your Medical History</Text>
                                    <Text style={styles.text2}>We value your privacy</Text>
                                </Pressable>
                                <Pressable onPress={() => navigation.navigate('MedicalConsentForm')} style={[styles.subCard]}>
                                    <FontAwesome5 name='pen-nib' size={30} color={lightGreen} style={styles.icon} />
                                    <Text style={styles.text1}>Medical Consent Form</Text>
                                    <Text style={styles.text2}>Please fill out this form</Text>
                                </Pressable>

                            </View>
                            <Pressable onPress={() => navigation.navigate('RequestAppointment')} style={[styles.subCard1]}>
                                <FontAwesome6 name='calendar-days' size={30} color={lightGreen} style={styles.icon} />
                                <Text style={styles.text1}>Request an appointment</Text>
                                <Text style={styles.text2}>Please schedule appointment 1 day in advance</Text>
                            </Pressable>

                            <View style={styles.line} />
                            <View style={styles.line} />
                            <View style={styles.social}>

                                <Pressable onPress={() => Linking.openURL(youtubeURL)} style={styles.socialIcon}>
                                    <AntDesign name='youtube' size={20} color={white} style={styles.icon} />
                                </Pressable>
                                <Pressable onPress={() => Linking.openURL(twitterURL)} style={styles.socialIcon}>
                                    <FontAwesome6 name='x-twitter' size={20} color={white} style={styles.icon} />
                                </Pressable>
                                <Pressable onPress={() => Linking.openURL(linkedinURL)} style={styles.socialIcon}>
                                    <FontAwesome6 name='linkedin-in' size={20} color={white} style={styles.icon} />
                                </Pressable>
                                <Pressable onPress={() => Linking.openURL(facebookURL)} style={styles.socialIcon}>
                                    <FontAwesome6 name='facebook-f' size={20} color={white} style={styles.icon} />
                                </Pressable>
                            </View>
                        </View>

                    </View>


                </View>
            </ScrollView>

        </SafeAreaView>


    )
}


const getStyles = (insets: any) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        // width: 'auto',
    },
    safeAreaStyle: {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
        backgroundColor: skyBlue
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subContainer1: {
        backgroundColor: darkBlue,
        flex: 0.45,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: 45,
        paddingBottom: 20
    },
    name: {
        color: lightGreen,
        fontSize: actuatedNormalize(18),
        marginTop: 10,
        textAlign: 'center'
    },
    text: {
        color: 'rgba(84, 227, 70, 0.7);',
        fontSize: actuatedNormalize(15),
        marginTop: 10,
        textAlign: 'center'
    },
    text1: {
        color: white,
        fontSize: isTab() ? actuatedNormalize(10) : 13,
        textAlign: 'center',
        marginTop: 13
    },
    text2: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: isTab() ? actuatedNormalize(8) : 11,
        textAlign: 'center',
        marginTop: 3
    },
    image: {
        alignSelf: 'center',
    },
    image1: {
        alignSelf: 'center',
        marginBottom: isTab() && 20,

    },
    icon: {
        alignSelf: 'center',
        marginVertical: 'auto'
    },
    subContainer: {
        flex: 0.5,
        backgroundColor: skyBlue,
        width: '100%',
    },
    card: {
        width: isTab() ? '80%' : '95%',
        backgroundColor: white,
        alignSelf: 'center',
        flex: 1,
        marginTop: -15,
        borderRadius: 20,
        padding: 10,
    },
    CardStyle: {
        flexDirection: 'row',
        gap: 10
    },
    subCard: {
        backgroundColor: darkBlue,
        width: '47%',
        borderWidth: 1,
        borderColor: lightGreen,
        // height: '35%',
        color: 'white',
        // borderRadius: 10,
        padding: 10,
        marginLeft: 'auto'
    },
    subCard1: {
        backgroundColor: darkBlue,
        borderWidth: 1,
        borderColor: lightGreen,
        width: isTab() ? actuatedNormalize(280) : '98%',
        // height: '35%',
        color: 'white',
        // borderRadius: 10,
        padding: 10,
        alignSelf: 'center',
        marginTop: 10
    },
    socialIcon: {
        backgroundColor: darkBlue,
        width: '12%',
        borderRadius: 90,
        padding: 10,
        marginTop: actuatedNormalize(13),
        alignSelf: 'center'
    },
    social: {
        flexDirection: 'row',
        gap: 10,
        // marginTop: 30,
        alignSelf: 'center'
    },
    line: {
        backgroundColor: 'green',
        width: '95%',
        height: 1,
        alignSelf: 'center',
        marginVertical: isTab() ? actuatedNormalize(10) : 15
    }
})
export default Home
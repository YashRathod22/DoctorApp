import { View, Text, Pressable, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { actuatedNormalize, isTab } from '../utils/Scaling'
import { facebookURL, linkedinURL, twitterURL, youtubeURL } from '../utils/Uri'
import { darkBlue, lightBlue, lightGreen, skyBlue, white } from '../utils/Color'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Platform } from 'react-native'



const ReachUs = () => {
    const places = [
        {
            id: 1,
            coordinate: {
                latitude: 19.021324,
                longitude: 72.842415,
            }
        }
    ]
    function dialCall(number: number) {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else { phoneNumber = `tel:${number}`; }
        Linking.openURL(phoneNumber);
    };
    return (
        <View style={styles.subContainer}>
            <View style={styles.card}>
                <Text style={styles.textLabel}>Reach Us</Text>
                <View style={styles.CardStyle}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 19.01445577493574, latitudeDelta: 0.407813295617051352, longitude: 72.86086460575461, longitudeDelta: 0.40797118991613388
                        }}
                        provider={PROVIDER_GOOGLE}
                        // onRegionChange={(region) => console.log(region)}
                        zoomControlEnabled={true}
                        zoomEnabled
                        zoomTapEnabled
                    >
                        {
                            places.map((place) => {
                                return <Marker key={place.id}
                                    coordinate={place.coordinate}
                                />
                            })
                        }
                    </MapView>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => dialCall(9823238583)} style={styles.button}>
                        <Text style={styles.buttonTxt}>Call Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('mailto:drkajal@gmail.com')} style={styles.button}>
                        <Text style={styles.buttonTxt}>Email Us</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lineContainer}>

                    <View style={styles.line} />
                    <View style={styles.line} />
                </View>
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
    )
}


const styles = StyleSheet.create({
    subContainer: {
        flex: 1,
        backgroundColor: skyBlue,
        width: '100%',
        justifyContent: 'flex-start',
        paddingTop: 20
    },
    card: {
        width: isTab() ? '80%' : '95%',
        alignSelf: 'center',
        flex: 0.75,
        marginTop: -15,
        backgroundColor: white,
        borderRadius: 20,
        padding: 10,
    },
    CardStyle: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        gap: 10,
        backgroundColor: white,
        width: '95%',
        height: '55%',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    socialIcon: {
        backgroundColor: darkBlue,
        width: '12%',
        borderRadius: 90,
        padding: 10,
        // marginTop: actuatedNormalize(5),
        alignSelf: 'center'
    },
    icon: {
        alignSelf: 'center',
        marginVertical: 'auto'
    },
    social: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 8,
        alignSelf: 'center'
    },
    lineContainer: { marginTop: 18 },
    line: {
        backgroundColor: 'green',
        width: '95%',
        height: 1,
        alignSelf: 'center',
        marginVertical: isTab() ? actuatedNormalize(10) : 15
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
    textLabel: {
        marginBottom: actuatedNormalize(12),
        marginTop: 10,
        fontSize: isTab() ? actuatedNormalize(14) : 24,
        fontWeight: '700',
        marginVertical: isTab() ? 'auto' : 0,
        marginLeft: isTab() ? 10 : 10,
        color: darkBlue
    },
    text: {
        marginBottom: actuatedNormalize(12),
        marginTop: 10,
        fontSize: isTab() ? actuatedNormalize(14) : 24,
        fontWeight: '500',
        marginVertical: isTab() ? 'auto' : 0,
        marginLeft: isTab() ? 10 : 0,
        color: '#000'
    },
    text2: {
        marginBottom: actuatedNormalize(12),
        marginTop: 10,
        fontSize: isTab() ? actuatedNormalize(14) : 15,

        marginVertical: isTab() ? 'auto' : 0,
        marginLeft: isTab() ? 10 : 0,
        color: '#000'
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 35,
        justifyContent: 'space-around'
    },
    button: {
        width: '35%',
        backgroundColor: darkBlue,
        padding: 8,
        borderRadius: 7
    },
    buttonTxt: {
        color: white,
        fontSize: 16,
        textAlign: 'center'
    }
})
export default ReachUs
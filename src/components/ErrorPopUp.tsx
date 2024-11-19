import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { errorRed, white } from '../utils/Color'

const ErrorPopUp = ({ errCount, errMsg }: any) => {
    return (
        <View>
            {
                errCount > 0 ? (
                    <>
                        <View style={styles.errorPopUp}>
                            <View style={styles.errorContainer}>
                                <Text style={styles.text}> There are </Text>
                                <View style={styles.errorCountContainer} >
                                    <Text style={styles.errorCountText}>{errCount}</Text>
                                </View>
                                <Text style={styles.text}> errors on this page. Please correct them </Text>
                            </View>
                            <Text style={styles.text}> before moving on.</Text>
                        </View>
                    </>
                ) : (
                    <></>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    errorText: {
        color: white,
        fontSize: 12,
        fontWeight: 500
    },
    errorPopUp: {
        backgroundColor: errorRed
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: white
    },
    errorCountText: {
        color: '#000',
        fontSize: 15,
        textAlign: 'center'
    },
    errorCountContainer: {
        margin: 5,
        backgroundColor: white,
        paddingHorizontal: 5,
        alignSelf: 'center',
        borderRadius: 20
    }
})
export default ErrorPopUp
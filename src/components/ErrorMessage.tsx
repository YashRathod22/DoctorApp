import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { errorRed, white } from '../utils/Color'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const ErrorMessage = ({ errorMsg, errorText }: any) => {
    return (
        <>
            {
                errorMsg ? (
                    <>
                        <View style={styles.errorMsgContainer}>
                            <MaterialIcons name='error-outline' size={15} color={white} />
                            <Text style={styles.errTxt}>{errorText ? errorText : 'This field is required.'}</Text>
                        </View>
                    </>
                ) : (
                    <></>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    errorMsgContainer: {
        backgroundColor: errorRed,
        padding: 5,
        marginTop: 4,
        borderRadius: 5,
        flex: 1,
        flexDirection: 'row', gap: 5
    },
    errTxt: {
        color: white,
        fontSize: 12,
        fontWeight: 500
    }
})
export default ErrorMessage
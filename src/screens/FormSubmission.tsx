import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {lightGreen, white} from '../utils/Color';
import Octicons from 'react-native-vector-icons/Octicons';
import LottieView from 'lottie-react-native';
const FormSubmission = () => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        {/* <Octicons name="check-circle" size={70} color={lightGreen} /> */}
        <LottieView
          style={{flex: 1}}
          source={require('../../assets/check.json')}
          autoPlay
          loop
        />
      </View>
      <Text style={styles.text}>Thank You!</Text>
      <Text style={styles.text2}>Your Submission has been recieved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    backgroundColor: white,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    alignSelf: 'center',
    marginTop: '20%',
    width: 110,
    height: 110,
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 21,
    fontWeight: 'bold',
  },
  text2: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 17,
  },
});
export default FormSubmission;

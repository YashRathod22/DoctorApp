import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {buttonGreen, lightGreen, white} from '../utils/Color';
import LottieView from 'lottie-react-native';
import {useGoBackHandler} from '../customHooks/GoBackhandler';
import {useNavigation} from '@react-navigation/native';

const FormSubmission = ({route}: any) => {
  const navigation = useNavigation<any>();
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    setTimeout(() => {
      animationRef.current?.play();
    }, 1000);

    // // Or set a specific startFrame and endFrame with:
    // animationRef.current?.play(30, 120);
  }, []);

  useGoBackHandler(() => {
    navigation.navigate('Home');
    return true;
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <LottieView
          style={{flex: 1}}
          ref={animationRef}
          source={require('../assets/check.json')}
          autoPlay={true}
          loop={false}
        />
      </View>
      <Text style={styles.text}>Thank You!</Text>
      <Text style={styles.text2}>
        {route?.params?.fromAppointment
          ? 'Your Appointment has been booked.'
          : 'Your Submission has been received.'}
      </Text>
      {route?.params?.fromAppointment ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('Appointments')}
          style={styles.button2}>
          <Text style={styles.btntext1}>Go to Appointments</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.44,
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
    marginTop: '10%',
    width: 220,
    height: 160,
  },
  text: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 21,
    fontWeight: 'bold',
  },
  text2: {
    textAlign: 'center',
    marginTop: 13,
    fontSize: 17,
  },
  btntext1: {
    fontSize: 16,
    color: white,
    textAlign: 'center',
  },
  button2: {
    alignSelf: 'center',
    marginVertical: 18,
    padding: 6,
    borderRadius: 5,
    backgroundColor: buttonGreen,
    borderColor: buttonGreen,
    width: '50%',
  },
});
export default FormSubmission;

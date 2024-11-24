import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {lightGreen, white} from '../utils/Color';
import Octicons from 'react-native-vector-icons/Octicons';
import LottieView from 'lottie-react-native';
import {useGoBackHandler} from '../customHooks/GoBackhandler';
import {useNavigation} from '@react-navigation/native';
const FormSubmission = () => {
  const navigation = useNavigation<any>();

  useGoBackHandler(() => {
    navigation.navigate('Home');
    return true;
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        {/* <Octicons name="check-circle" size={70} color={lightGreen} /> */}
        <LottieView
          style={{flex: 1}}
          source={require('../../assets/check.json')}
          autoPlay={true}
          loop={false}
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
    marginTop: '10%',
    width: 220,
    height: 160,
  },
  text: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 21,
    fontWeight: 'bold',
  },
  text2: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 17,
  },
});
export default FormSubmission;

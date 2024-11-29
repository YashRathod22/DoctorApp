import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {darkBlue} from '../utils/Color';

const ModalScreen = data => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Name: {data?.data?.firstName} {data?.data?.lastName}
              </Text>
              <Text style={styles.modalText}>Gender: {data?.data?.gender}</Text>
              <Text style={styles.modalText}>Age: {data?.data?.age}</Text>
              <Text style={styles.modalText}>Dob: {data?.data?.dob}</Text>
              <Text style={styles.modalText}>Email: {data?.data?.email}</Text>
              <Text style={styles.modalText}>Height: {data?.data?.height}</Text>
              <Text style={styles.modalText}>Weight: {data?.data?.weight}</Text>
              <Text style={styles.modalText}>Reason: {data?.data?.reason}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.icon}>
          <MaterialCommunityIcons
            name="account-eye"
            size={28}
            color={darkBlue}
          />
        </Pressable>
        {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginTop: 15,
    // marginRight: '10%',
  },
});

export default ModalScreen;

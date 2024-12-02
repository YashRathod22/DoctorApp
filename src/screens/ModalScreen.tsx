import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
} from 'react-native';

const ModalScreen = ({
  visible,
  data,
  setModalVisible,
  id,
}: {
  visible: boolean;
  data: any;
  id: any;
  setModalVisible: (data: boolean) => void;
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setModalVisible(!visible);
        }}>
        <View key={id} style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Name: {data?.firstName} {data?.lastName}
            </Text>
            <Text style={styles.modalText}>Gender: {data?.gender}</Text>
            <Text style={styles.modalText}>Age: {data?.age}</Text>
            <Text style={styles.modalText}>Dob: {data?.dob}</Text>
            <Text style={styles.modalText}>Email: {data?.email}</Text>
            <Text style={styles.modalText}>Height: {data?.height}</Text>
            <Text style={styles.modalText}>Weight: {data?.weight}</Text>
            <Text style={styles.modalText}>Reason: {data?.reason}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!visible)}>
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  modalView: {
    margin: 20,
    width: Dimensions.get('screen').width * 0.8,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    // alignItems: 'center',
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
    // textAlign: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginTop: 15,

    // marginRight: '10%',
  },
});

export default ModalScreen;

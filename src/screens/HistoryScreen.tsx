import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import React, {useState, useCallback} from 'react';
import {darkBlue, white} from '../utils/Color';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {deleteUserData} from '../store/action';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useGoBackHandler} from '../customHooks/GoBackhandler';
import ModalScreen from './ModalScreen';

const HistoryScreen = () => {
  const userData = useSelector((state: any) => state.reducer.userDetails);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const openModal = useCallback((userId: number) => {
    setSelectedUserId(userId);
    setModalVisible(true);
  }, []);

  const selectedUser = userData.find((user: any) => user.id === selectedUserId);

  const deleteAppointData = (data: any) => {
    dispatch(deleteUserData(data.id));
  };

  useGoBackHandler(() => {
    navigation.navigate('Home');
    return true;
  }, []);

  return (
    <ScrollView style={{flexGrow: 1, marginBottom: insets.bottom}}>
      {userData.length > 0 ? (
        userData.map((data: any) => (
          <View key={data.id} style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.text}>Recorded History</Text>
              <View style={styles.iconContainer}>
                <Pressable
                  onPress={() =>
                    navigation.push('MedicalHistoryForm', {
                      userHistoryData: data,
                      uniqueId: data.id,
                    })
                  }
                  style={styles.icon}>
                  <FontAwesome5 name="user-edit" size={20} color={darkBlue} />
                </Pressable>
                <Pressable
                  onPress={() => openModal(data.id)}
                  style={styles.icon}>
                  <MaterialCommunityIcons
                    name="account-eye"
                    size={28}
                    color={darkBlue}
                  />
                </Pressable>
                <Pressable
                  onPress={() => deleteAppointData(data)}
                  style={styles.icon}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={25}
                    color={darkBlue}
                  />
                </Pressable>
              </View>
            </View>

            <Text style={styles.text2}>
              Name: {data.firstName} {data.lastName}
            </Text>
            <Text style={styles.text2}>Gender: {data.gender}</Text>
            <Text style={styles.text2}>Age: {data.age}</Text>
            <Text style={styles.text2}>Dob: {data.dob} </Text>
            <Text style={styles.text2}>Email: {data.email}</Text>
          </View>
        ))
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>No Records Found</Text>
        </View>
      )}

      {selectedUser && (
        <ModalScreen
          data={selectedUser}
          id={selectedUser.id}
          visible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    backgroundColor: white,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    gap: '10%',
    alignSelf: 'flex-start',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: '8%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    alignSelf: 'center',
    marginTop: 15,
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 21,
    fontWeight: 'bold',
  },
  text2: {
    textAlign: 'center',
    marginTop: 13,
    fontSize: 17,
    marginBottom: 5,
  },
});

export default HistoryScreen;

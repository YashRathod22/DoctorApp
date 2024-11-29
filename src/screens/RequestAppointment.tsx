import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {actuatedNormalize, isTab} from '../utils/Scaling';
import CustomTextInput from '../components/CustomTextInput';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {gender, months, weekday} from '../utils/InputData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {storeAppointData, updateAppointData} from '../store/action';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {
  lightBlue,
  errorRed,
  inputGrey,
  lightGreen,
  white,
  buttonGreen,
} from '../utils/Color';
import {
  onBlurErrorAge,
  onBlurErrorEmail,
  onBlurErrorFirstName,
  onBlurErrorGender,
  onBlurErrorLastName,
  onBlurErrorPhoneNo,
  onChangeAge,
  onChangeEmail,
  onChangeFirstName,
  onChangeLastName,
  onChangePhoneNo,
} from '../utils/Validations';
import ErrorPopUp from '../components/ErrorPopUp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown';
import {nanoid} from '@reduxjs/toolkit';

const timeDetails = [
  {
    id: 1,
    date: '12:30',
    isSelected: false,
  },
  {
    id: 2,
    date: '2:30',
    isSelected: false,
  },
  {
    id: 3,
    date: '4:30',
    isSelected: false,
  },
  {
    id: 4,
    date: '6:30',
    isSelected: false,
  },
];

const RequestAppointment = ({route}: any) => {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [timeData, setTimeData] = useState(timeDetails);
  const [comment, setComment] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const todayDate = new Date();

  const dayFind = todayDate.getDay();
  const monthFind = todayDate.getMonth();
  const dateFind = todayDate.getDate();
  const yearFind = todayDate.getFullYear();
  const day1 = String(todayDate.getDate()).padStart(2, '0');
  const month1 = String(todayDate.getMonth() + 1).padStart(2, '0');
  const dateString = `${day1}/${month1}/${yearFind}`;
  const [selectedDate, setSelectedDate] = useState('');
  const [defaultDate, setDefaultDate] = useState(dateString);
  const [day, setDay] = useState(weekday[dayFind]);
  const [date, setDate] = useState(dateFind);
  const [month, setMonth] = useState(months[monthFind]);
  const [year, setYear] = useState(yearFind);
  const [emailError, setEmailError] = useState(false);
  const [appointDateError, setAppointDateError] = useState(false);
  const [emailExist, setEmailExist] = useState(false);

  const [appointSlotError, setAppointSlotError] = useState(false);
  const [userAppointmentDetails, setUserAppointmentDetails] = useState({
    id: route?.params?.uniqueId ? route?.params?.uniqueId : nanoid(),
    firstName: route?.params?.userEmailData.firstName || '',
    lastName: route?.params?.userEmailData.lastName || '',
    age: route?.params?.userEmailData.age || 0,
    gender: route?.params?.userEmailData.gender || '',
    email: route?.params?.userEmailData.email || '',
    appointmentDate: route?.params?.userEmailData.appointmentDate || '',
    slotTime: route?.params?.userEmailData.slotTime || '',
    phoneNo: route?.params?.userEmailData.phoneNo || '',
  });

  const [appointmentFormValidation, setAppointFormValidation] = useState({
    ...userAppointmentDetails,
    firstNameErr: false,
    lastNameErr: false,
    ageError: false,
    emailError: false,
    phoneNoErr: false,
    genderError: false,
    errMsg: false,
    errCount: 0,
    firstNameErrTxt: '',
    lastNameErrTxt: '',
    ageErrTxt: '',
    emailErrTxt: '',
    heightErrTxt: '',
    weightErrTxt: '',
    reasonErrTxt: '',
    phoneNoErrTxt: '',
    genderErrTxt: '',
  });

  useEffect(() => {
    if (route?.params?.userEmailData) {
      setUserAppointmentDetails({
        id: route?.params?.uniqueId || nanoid(),
        firstName: route?.params?.userEmailData.firstName || '',
        lastName: route?.params?.userEmailData.lastName || '',
        age: route?.params?.userEmailData.age || 0,
        gender: route?.params?.userEmailData.gender || '',
        email: route?.params?.userEmailData.email || '',
        appointmentDate: route?.params?.userEmailData.appointmentDate || '',
        slotTime: route?.params?.userEmailData.slotTime || '',
        phoneNo: route?.params?.userEmailData.phoneNo || '',
      });
    }
  }, [route?.params?.userEmailData]);

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (appointmentFormValidation.errCount > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [appointmentFormValidation.errCount]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const dt = new Date(date);
    // const dt1 = dt.toLocaleDateString();
    const day1 = String(dt.getDate()).padStart(2, '0');
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const year = dt.getFullYear();
    const dt1 = `${day1}/${month}/${year}`;

    const dayFind = dt.getDay();
    const day = weekday[dayFind];
    const date1 = dt.getDate();
    const month1 = dt.getMonth();

    setSelectedDate(dt1);
    setUserAppointmentDetails({
      ...userAppointmentDetails,
      appointmentDate: dt1,
    });
    setMonth(months[month1]);
    setDate(date1);
    setDay(day);
    setYear(year);
    hideDatePicker();
  };
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1',
        label: 'Yes',
        value: 'Yes',
      },
      {
        id: '2',
        label: 'No',
        value: 'No',
      },
    ],
    [],
  );

  useEffect(() => {
    if (route?.params?.userEmailData.slotTime) {
      const id: number | undefined = timeData.find(
        data => data.date === route?.params?.userEmailData.slotTime,
      )?.id;
      selectedSlot(id);
      //
    }
  }, []);

  function selectedSlot(id: Number | undefined) {
    const updatedTimeData = timeData.map(e => {
      if (e.id === id) {
        setUserAppointmentDetails({
          ...userAppointmentDetails,
          slotTime: e.date,
        });
        return {...e, isSelected: true};
      } else {
        return {...e, isSelected: false};
      }
      return e;
    });
    setTimeData(updatedTimeData);
  }

  function cancelSelect(id: Number) {
    const updatedData = timeData.map(e => {
      if (e.id === id) {
        setUserAppointmentDetails({...userAppointmentDetails, slotTime: ''});
        return {...e, isSelected: false};
      }
      return e;
    });
    setTimeData(updatedData);
  }

  const dispatch = useDispatch();
  const appointData = useSelector(
    (state: any) => state.reducer.userAppointData,
  );
  const email = appointData.map((data: any) => data.email);
  function checkEmail(userEmail: string) {
    if (route?.params?.userEmailData) return false;

    const newAray = email?.filter((e: string) => e === userEmail);
    if (newAray[0] === userEmail) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (emailError && userAppointmentDetails.email === '') {
      setAppointFormValidation(prevFormValidation => {
        const newFormValidation = {...prevFormValidation};
        newFormValidation.emailError = true;
        newFormValidation.emailErrTxt = 'Email is required!';
        newFormValidation.errCount = Math.max(
          newFormValidation.errCount + 1,
          0,
        );
        newFormValidation.errMsg = true;
        return newFormValidation;
      });
    }
  }, [emailError, userAppointmentDetails.email]);

  const navigation = useNavigation<any>();

  const handleSubmit = () => {
    let newFormValidation = {...appointmentFormValidation};
    newFormValidation.errCount = 0;

    if (userAppointmentDetails.firstName === '') {
      newFormValidation.errCount += 1;
      newFormValidation.firstNameErr = true;
      newFormValidation.firstNameErrTxt = 'First name is required';
    } else {
      newFormValidation.firstNameErr = false;
    }

    if (userAppointmentDetails.lastName === '') {
      newFormValidation.errCount += 1;
      newFormValidation.lastNameErr = true;
      newFormValidation.lastNameErrTxt = 'Last name is required';
    } else {
      newFormValidation.lastNameErr = false;
    }

    if (!userAppointmentDetails.age) {
      newFormValidation.errCount += 1;
      newFormValidation.ageError = true;
      newFormValidation.ageErrTxt = 'Age is required';
    } else {
      newFormValidation.ageError = false;
    }

    if (!userAppointmentDetails.phoneNo) {
      newFormValidation.errCount += 1;
      newFormValidation.phoneNoErr = true;
      newFormValidation.phoneNoErrTxt = 'Phone No is required';
    } else {
      newFormValidation.phoneNoErr = false;
    }

    if (!userAppointmentDetails.email) {
      setEmailError(true);
      newFormValidation.emailError = true;
      newFormValidation.errCount += 1;
      newFormValidation.emailErrTxt = 'Email is required';
    } else {
      setEmailError(false);
      newFormValidation.emailError = false;
    }

    if (checkEmail(userAppointmentDetails.email)) {
      setEmailExist(true);
      newFormValidation.emailError = true;
      newFormValidation.errMsg = true;
      newFormValidation.emailErrTxt = 'Email is already in use';
    } else {
      setEmailExist(false);
      newFormValidation.emailError = false;
      newFormValidation.errMsg = false;
    }

    if (userAppointmentDetails.gender === '') {
      newFormValidation.genderError = true;
      newFormValidation.genderErrTxt = 'Gender is required!';
      newFormValidation.errCount += 1;
    } else {
      newFormValidation.genderError = false;
      newFormValidation.genderErrTxt = '';
    }

    if (!userAppointmentDetails.appointmentDate) {
      setAppointDateError(true);
    } else {
      setAppointDateError(false);
    }

    setAppointFormValidation(newFormValidation);

    if (
      newFormValidation.errCount === 0 &&
      !newFormValidation.emailError &&
      !route?.params?.userEmailData
    ) {
      dispatch(storeAppointData(userAppointmentDetails));
      navigation.navigate('FormSubmission', {fromAppointment: true});
    }
    if (route?.params?.userEmailData) {
      dispatch(updateAppointData(userAppointmentDetails));
      navigation.navigate('Appointments');
    }
  };

  const styles = getStyles(appointmentFormValidation.genderError);

  useEffect(() => {
    if (userAppointmentDetails.appointmentDate !== '') {
      setAppointDateError(false);
      appointmentFormValidation.errCount = Math.max(
        appointmentFormValidation.errCount - 1,
        0,
      );
    }
  }, [userAppointmentDetails.appointmentDate]);

  useEffect(() => {
    if (userAppointmentDetails.gender !== '') {
      setAppointFormValidation(prevFormValidation => {
        const newFormValidation = {...prevFormValidation};
        newFormValidation.genderError = false;
        newFormValidation.genderErrTxt = '';
        newFormValidation.errCount = Math.max(
          newFormValidation.errCount - 1,
          0,
        );
        newFormValidation.errMsg = false;
        return newFormValidation;
      });
    }
  }, [userAppointmentDetails.gender]);

  useEffect(() => {
    setSelectedDate(
      route?.params?.userEmailData?.appointmentDate
        ? route?.params?.userEmailData?.appointmentDate
        : '',
    );
  }, [route?.params?.userEmailData]);
  return (
    <>
      <ErrorPopUp
        errCount={appointmentFormValidation.errCount}
        errMsg={appointmentFormValidation.errMsg}
      />
      <ScrollView bounces={false}>
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: 1}}
          enableOnAndroid={true}
          keyboardOpeningTime={0}>
          <View style={styles.container}>
            <Text style={styles.heading}>Request an Appointment</Text>
            <View style={styles.line}></View>
            <Text style={styles.textLabel}>
              Name <Text style={styles.star}>*</Text>
            </Text>
            <View style={styles.parentInput}>
              <View style={styles.inputContainer}>
                <CustomTextInput
                  style={styles.input}
                  onBlur={() =>
                    onBlurErrorFirstName(
                      userAppointmentDetails,
                      setAppointFormValidation,
                      appointmentFormValidation,
                    )
                  }
                  onChange={() =>
                    onChangeFirstName(
                      userAppointmentDetails,
                      setAppointFormValidation,
                      appointmentFormValidation,
                    )
                  }
                  placeholder={''}
                  errorText={appointmentFormValidation.firstNameErrTxt}
                  value={userAppointmentDetails.firstName}
                  setUserDetails={setUserAppointmentDetails}
                  userDetails={userAppointmentDetails}
                  name="firstName"
                  errorMsg={appointmentFormValidation.firstNameErr}
                />
                <Text style={styles.bottomLabel}>First Name</Text>
              </View>
              <View style={styles.inputContainer}>
                <CustomTextInput
                  style={styles.input}
                  placeholder={''}
                  errorText={appointmentFormValidation.lastNameErrTxt}
                  onBlur={() =>
                    onBlurErrorLastName(
                      userAppointmentDetails,
                      setAppointFormValidation,
                      appointmentFormValidation,
                    )
                  }
                  onChange={() =>
                    onChangeLastName(
                      userAppointmentDetails,
                      setAppointFormValidation,
                      appointmentFormValidation,
                    )
                  }
                  value={userAppointmentDetails.lastName}
                  setUserDetails={setUserAppointmentDetails}
                  userDetails={userAppointmentDetails}
                  name="lastName"
                  errorMsg={appointmentFormValidation.lastNameErr}
                />
                <Text style={styles.bottomLabel}>Last Name</Text>
              </View>
            </View>
            <Text style={styles.textLabel}>
              Patient Gender <Text style={styles.star}>*</Text>
            </Text>
            <View style={styles.genderContainer}>
              <SelectDropdown
                data={gender}
                onSelect={(selectedItem, index) =>
                  setUserAppointmentDetails({
                    ...userAppointmentDetails,
                    gender: selectedItem.value,
                  })
                }
                defaultValueByIndex={
                  route?.params?.userEmailData.gender
                    ? route?.params?.userEmailData.gender === 'Male'
                      ? 0
                      : 1
                    : undefined
                }
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      {selectedItem && (
                        <Icon
                          name={selectedItem.icon}
                          style={styles.dropdownButtonIconStyle}
                        />
                      )}
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem.value) ||
                          'Select your Gender'}
                      </Text>
                      <Icon
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        style={styles.dropdownButtonArrowStyle}
                      />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      style={{
                        ...styles.dropdownItemStyle,
                        ...(isSelected && {backgroundColor: '#cacdcf'}),
                      }}>
                      <Icon
                        name={item.icon}
                        style={styles.dropdownItemIconStyle}
                      />
                      <Text style={styles.dropdownItemTxtStyle}>
                        {item.value}
                      </Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
                onBlur={() =>
                  onBlurErrorGender(
                    userAppointmentDetails,
                    setAppointFormValidation,
                    appointmentFormValidation,
                  )
                }
              />
              {appointmentFormValidation.genderError ? (
                <>
                  <View style={styles.errorMessage}>
                    <MaterialIcons
                      name="error-outline"
                      size={15}
                      color={errorRed}
                    />
                    <Text style={styles.errorText}>Gender is required.</Text>
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>
            <Text style={styles.textLabel}>
              Age <Text style={styles.star}>*</Text>
            </Text>
            <CustomTextInput
              style={[styles.input]}
              onChange={() =>
                onChangeAge(
                  userAppointmentDetails,
                  setAppointFormValidation,
                  appointmentFormValidation,
                )
              }
              onBlur={() =>
                onBlurErrorAge(
                  userAppointmentDetails,
                  setAppointFormValidation,
                  appointmentFormValidation,
                )
              }
              placeholder="ex: 23"
              errorText={appointmentFormValidation.ageErrTxt}
              type={'number-pad'}
              value={userAppointmentDetails.age}
              setUserDetails={setUserAppointmentDetails}
              userDetails={userAppointmentDetails}
              name="age"
              errorMsg={appointmentFormValidation.ageError}
            />
            <Text style={styles.textLabel}>
              Phone Number <Text style={styles.star}>*</Text>
            </Text>
            <CustomTextInput
              style={styles.input}
              onBlur={() =>
                onBlurErrorPhoneNo(
                  userAppointmentDetails,
                  setAppointFormValidation,
                  appointmentFormValidation,
                )
              }
              placeholder="(+91) 0000-0000"
              type={'number-pad'}
              onChange={() =>
                onChangePhoneNo(
                  userAppointmentDetails,
                  setAppointFormValidation,
                  appointmentFormValidation,
                )
              }
              errorText={appointmentFormValidation.phoneNoErrTxt}
              value={userAppointmentDetails.phoneNo}
              setUserDetails={setUserAppointmentDetails}
              userDetails={userAppointmentDetails}
              name="phoneNo"
              errorMsg={appointmentFormValidation.phoneNoErr}
              inputMode={'tel'}
            />
            <Text style={styles.textLabel}>
              Email <Text style={styles.star}>*</Text>
            </Text>
            <CustomTextInput
              style={styles.input}
              onChange={() =>
                onChangeEmail(
                  userAppointmentDetails,
                  setAppointFormValidation,
                  appointmentFormValidation,
                )
              }
              onBlur={() =>
                onBlurErrorEmail(
                  userAppointmentDetails,
                  setAppointFormValidation,
                  appointmentFormValidation,
                  emailExist,
                )
              }
              placeholder="example@example.com"
              errorText={appointmentFormValidation.emailErrTxt}
              value={userAppointmentDetails.email}
              setUserDetails={setUserAppointmentDetails}
              userDetails={userAppointmentDetails}
              name="email"
              errorMsg={appointmentFormValidation.emailError}
              autoCapitalize={'none'}
            />
            <Text style={styles.bottomLabel}>example@example.com</Text>
            <View>
              <Text style={styles.textLabel}>First Time Visit?</Text>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
                containerStyle={{flexDirection: 'row'}}
              />
            </View>
            <View>
              <Text style={styles.textLabel}>
                Select an Appointment Date <Text style={styles.star}>*</Text>
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={[
                    styles.calendar,
                    {borderColor: appointDateError ? errorRed : inputGrey},
                  ]}
                  onPress={showDatePicker}>
                  <Text>{selectedDate}</Text>
                  <View style={styles.calendarIcon}>
                    <FontAwesome
                      name="calendar"
                      size={18}
                      color={'grey'}
                      onPress={showDatePicker}
                    />
                  </View>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    minimumDate={todayDate}
                    date={
                      selectedDate
                        ? new Date(moment(selectedDate, 'DD/MM/YYYY'))
                        : todayDate
                    }
                  />
                </TouchableOpacity>
              </View>
              {appointDateError ? (
                <>
                  <View style={styles.errorMessage}>
                    <MaterialIcons
                      name="error-outline"
                      size={15}
                      color={errorRed}
                    />
                    <Text style={styles.errorText}>Please select date.</Text>
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>
            <Text style={styles.textLabel}>
              {day}, {month} {date}
            </Text>

            <View style={styles.appointSlot}>
              {timeData.map((data, index) => {
                return (
                  <>
                    <Pressable
                      key={data.id}
                      onPress={() => selectedSlot(data.id)}
                      style={[
                        styles.appointBox,
                        {
                          backgroundColor: data.isSelected
                            ? lightBlue
                            : 'transparent',
                        },
                      ]}>
                      <Text
                        style={[
                          styles.appointText,
                          {color: data.isSelected ? white : ''},
                        ]}>
                        {data.date}
                      </Text>
                    </Pressable>
                  </>
                );
              })}
            </View>
            {appointSlotError ? (
              <>
                <View style={styles.errorMessage}>
                  <MaterialIcons
                    name="error-outline"
                    size={15}
                    color={errorRed}
                  />
                  <Text style={styles.errorText}>
                    Please select appointment slot.
                  </Text>
                </View>
              </>
            ) : (
              <></>
            )}

            {timeData.map((data, index) => {
              return data.isSelected ? (
                <>
                  <View key={data.id} style={styles.selectSlot}>
                    <View key={data.id} style={styles.dateTime}>
                      <FontAwesome5
                        style={{margin: 5, marginTop: 10}}
                        name="calendar-check"
                        size={24}
                        color={white}
                      />
                      <View>
                        <Text style={[styles.selectText]}>Selected Time</Text>
                        <Text style={styles.selectText2}>
                          {data.date}, {day}, {month} {date}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.cancelBtn}
                      onPress={() => cancelSelect(data.id)}>
                      <Text style={styles.errorText2}>Cancel Selection</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <></>
              );
            })}
            <View>
              <Text style={styles.textLabel}>Comments</Text>
              <TextInput
                multiline={true}
                numberOfLines={14}
                value={comment}
                onChange={(text: any) => setComment(text)}
                style={styles.inputComment}
              />
            </View>
            <View style={styles.line}></View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <View style={styles.savebtn}>
        <TouchableOpacity
          disabled={isDisabled}
          onPress={() => handleSubmit()}
          style={[
            styles.button2,
            isDisabled
              ? {backgroundColor: '#78bf95'}
              : {backgroundColor: buttonGreen},
          ]}>
          <Text style={styles.btntext1}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const getStyles = (genderErr: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: white,
      width: '93%',
      padding: isTab() ? 20 : 15,
      alignSelf: 'center',
      marginTop: 15,
      marginBottom: 15,
      borderRadius: 10,
    },
    heading: {
      fontSize: isTab() ? actuatedNormalize(23) : 31,
      flexWrap: 'wrap',
      fontWeight: 'bold',
    },
    line: {
      backgroundColor: 'rgb(194, 190, 190)',
      width: '100%',
      height: 1,
      alignSelf: 'center',
      marginVertical: 20,
    },
    textLabel: {
      marginBottom: actuatedNormalize(10),
      marginTop: 10,
      fontSize: isTab() ? actuatedNormalize(12) : 17,
    },
    parentInput: {
      flexDirection: 'row',
      gap: '10%',
    },
    inputContainer: {
      width: '45%',
    },
    input: {
      borderWidth: 1,
      padding: 5,
      width: '100%',
      borderColor: inputGrey,
      borderRadius: 5,
      color: '#000',
    },
    bottomLabel: {
      marginTop: 5,
      fontSize: isTab() ? actuatedNormalize(7) : 12,
      color: 'rgb(85, 87, 86)',
    },
    calendar: {
      borderWidth: 1,
      padding: 5,
      width: '100%',
      borderColor: inputGrey,
      borderRadius: 5,
      height: 30,
    },
    genderContainer: {
      width: isTab() ? '30%' : '100%',
    },
    appointText: {
      textAlign: 'center',
      fontSize: 17,
      color: lightBlue,
    },
    appointBox: {
      borderWidth: 1,
      borderColor: lightBlue,
      width: '47%',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
    appointSlot: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignContent: 'flex-start',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: lightBlue,
      color: white,
    },
    selectSlot: {
      backgroundColor: lightBlue,
      borderRadius: 10,
      padding: 5,
      marginVertical: actuatedNormalize(10),
    },
    selectText: {
      // marginVertical: actuatedNormalize(10),
      marginTop: 10,
      marginBottom: 5,
      fontSize: isTab() ? actuatedNormalize(12) : 18,
      color: white,
      // marginLeft: 10
    },
    selectText2: {
      marginBottom: actuatedNormalize(10),
      fontSize: isTab() ? actuatedNormalize(12) : 18,
      color: white,
      // marginLeft: 35
    },
    inputComment: {
      borderWidth: 1,
      padding: 5,
      width: '100%',
      borderColor: inputGrey,
      borderRadius: 5,
      height: 150,
      textAlignVertical: 'top',
      color: '#000',
    },
    savebtn: {
      backgroundColor: white,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      marginBottom: 10,
    },
    button3: {
      borderWidth: 2,
      padding: 10,
      borderRadius: 5,
      borderColor: inputGrey,
    },
    btntext: {
      fontSize: 16,
    },
    btntext1: {
      fontSize: 16,
      color: white,
      textAlign: 'center',
    },
    button2: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: buttonGreen,
      borderColor: buttonGreen,
      width: '30%',
    },
    cancelBtn: {
      backgroundColor: '#dadef3',
      padding: 8,
      width: '50%',
      borderRadius: 10,
      marginLeft: 35,
      marginVertical: 10,
    },
    dateTime: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: '3%',
    },
    calendarIcon: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginLeft: -20,
      marginTop: -18,
    },
    errorMessage: {
      padding: 5,
      marginTop: 4,
      borderRadius: 5,
      flex: 1,
      flexDirection: 'row',
      gap: 5,
    },
    errorText: {
      color: errorRed,
      fontSize: 12,
      fontWeight: 500,
    },
    errorText2: {
      color: '#343c6a',
      fontWeight: 600,
      fontSize: 15,
      textAlign: 'center',
    },
    star: {
      color: errorRed,
      fontSize: 18,
    },
    dropdownButtonStyle: {
      width: 330,
      height: 42,
      // backgroundColor: '#E9ECEF',
      backgroundColor: white,
      color: '#000',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: genderErr ? errorRed : inputGrey,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 15,
      fontWeight: '400',
      color: '#151E26',
    },
    dropdownButtonArrowStyle: {
      fontSize: 23,
    },
    dropdownButtonIconStyle: {
      fontSize: 23,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      // backgroundColor: inputGrey,
      borderRadius: 8,
      color: '#000',
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 14,
      fontWeight: '500',
      color: '#000',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });

export default RequestAppointment;

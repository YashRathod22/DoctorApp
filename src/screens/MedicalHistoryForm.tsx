import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import {actuatedNormalize, isTab} from '../utils/Scaling';
import {gender} from '../utils/InputData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch, UseDispatch, useSelector} from 'react-redux';
import {storeData, updateUserData} from '../store/action';
import {buttonGreen, errorRed, inputGrey, white} from '../utils/Color';
import {
  onBlurErrorAge,
  onBlurErrorEmail,
  onBlurErrorFirstName,
  onBlurErrorGender,
  onBlurErrorHeight,
  onBlurErrorLastName,
  onBlurErrorReason,
  onBlurErrorWeight,
  onChangeAge,
  onChangeEmail,
  onChangeFirstName,
  onChangeHeight,
  onChangeLastName,
  onChangeReason,
  onChangeWeight,
} from '../utils/Validations';
import ErrorPopUp from '../components/ErrorPopUp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import moment from 'moment';
import {nanoid} from '@reduxjs/toolkit';

const MedicalHistoryForm = ({route}: any) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [heightError, setHeightError] = useState(false);
  const [weightError, setWeightError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [reasonError, setReasonError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [emailExist, setEmailExist] = useState(false);

  const [userDetails, setUserDetails] = useState({
    id: route?.params?.uniqueId ? route?.params?.uniqueId : nanoid(),
    firstName: route?.params?.userHistoryData.firstName || '',
    lastName: route?.params?.userHistoryData.lastName || '',
    age: route?.params?.userHistoryData.age || 0,
    gender: route?.params?.userHistoryData.gender || '',
    email: route?.params?.userHistoryData.email || '',
    height: route?.params?.userHistoryData.height || 0,
    weight: route?.params?.userHistoryData.weight || 0,
    dob: route?.params?.userHistoryData.dob || '',
    reason: route?.params?.userHistoryData.reason || '',
  });
  const todayDate = new Date();
  const [formValidation, setFormValidation] = useState({
    ...userDetails,
    firstNameErr: false,
    lastNameErr: false,
    ageError: false,
    emailError: false,
    heightError: false,
    weightError: false,
    reasonError: false,
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
    genderErrTxt: '',
  });

  useEffect(() => {
    if (route?.params?.userHistoryData) {
      setUserDetails({
        id: route?.params?.uniqueId || nanoid(),
        firstName: route?.params?.userHistoryData.firstName || '',
        lastName: route?.params?.userHistoryData.lastName || '',
        age: route?.params?.userHistoryData.age || 0,
        gender: route?.params?.userHistoryData.gender || '',
        email: route?.params?.userHistoryData.email || '',
        height: route?.params?.userHistoryData.height || 0,
        weight: route?.params?.userHistoryData.weight || 0,
        dob: route?.params?.userHistoryData.dob || '',
        reason: route?.params?.userHistoryData.reason || '',
      });
    }
  }, [route?.params?.userHistoryData]);

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (formValidation.errCount > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [formValidation.errCount]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.reducer.userDetails);
  const email = userData.map((data: any) => data.email);
  const checkEmail = (userEmail: string) => {
    if (route?.params?.userHistoryData) return false;

    const newAray = email?.filter((e: string) => e === userEmail);
    if (newAray[0] === userEmail) {
      return true;
    } else {
      return false;
    }
  };

  const handleConfirm = (date: any) => {
    const dt = new Date(date);
    // const dt1 = dt.toLocaleDateString();
    const day1 = String(dt.getDate()).padStart(2, '0');
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const year = dt.getFullYear();
    const dt1 = `${day1}/${month}/${year}`;

    setUserDetails(prevDetails => ({
      ...prevDetails,
      dob: dt1,
    }));
    setSelectedDate(dt1);
    // calculateAge(dt1);
    hideDatePicker();
  };

  // useEffect(() => {
  //   if (userDetails.dob !== '') {
  //     calculateAge(userDetails.dob);
  //   }
  // }, [userDetails.dob]);

  function calculateAge(birthDateStr) {
    const [day, month, year] = birthDateStr.split('/').map(Number);

    const birthDate = new Date(year, month - 1, day);

    if (isNaN(birthDate)) {
      return 'Invalid date format';
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    setUserDetails({...userDetails, age: age});
    return age;
  }

  const navigation = useNavigation<any>();

  const handleSubmit = () => {
    let newFormValidation = {...formValidation};
    newFormValidation.errCount = 0;

    if (userDetails.firstName === '') {
      newFormValidation.errCount += 1;
      newFormValidation.firstNameErr = true;
      newFormValidation.firstNameErrTxt = 'First name is required';
    } else {
      newFormValidation.firstNameErr = false;
    }

    if (userDetails.lastName === '') {
      newFormValidation.errCount += 1;
      newFormValidation.lastNameErr = true;
      newFormValidation.lastNameErrTxt = 'Last name is required';
    } else {
      newFormValidation.lastNameErr = false;
    }

    // if (!userDetails.age) {
    //   newFormValidation.errCount += 1;
    //   newFormValidation.ageError = true;
    //   newFormValidation.ageErrTxt = 'Age is required';
    // } else {
    //   newFormValidation.ageError = false;
    // }

    if (!userDetails.height) {
      newFormValidation.errCount += 1;
      newFormValidation.heightError = true;
      newFormValidation.heightErrTxt = 'Height is required';
    } else {
      newFormValidation.heightError = false;
    }

    if (!userDetails.weight) {
      newFormValidation.errCount += 1;
      newFormValidation.weightError = true;
      newFormValidation.weightErrTxt = 'Weight is required';
    } else {
      newFormValidation.weightError = false;
    }

    if (!userDetails.email) {
      setEmailError(true);
      newFormValidation.emailError = true;
      // newFormValidation.errCount += 1;
      newFormValidation.emailErrTxt = 'Email is required';
    } else {
      setEmailError(false);
      newFormValidation.emailError = false;
    }

    if (checkEmail(userDetails.email)) {
      setEmailExist(true);
      newFormValidation.emailError = true;
      newFormValidation.errMsg = true;
      newFormValidation.errCount += 1;
      newFormValidation.emailErrTxt = 'Email is already in use';
    } else {
      setEmailExist(false);
      newFormValidation.emailError = false;
      newFormValidation.errMsg = false;
    }

    if (userDetails.gender === '') {
      newFormValidation.errCount += 1;
      newFormValidation.genderError = true;
      newFormValidation.genderErrTxt = 'Gender is required!';
    } else {
      newFormValidation.genderError = false;
      newFormValidation.genderErrTxt = '';
    }

    if (userDetails.dob === '') {
      setDobError(true);
      newFormValidation.errCount += 1;
    } else {
      setDobError(false);
    }

    if (userDetails.reason === '') {
      newFormValidation.errCount += 1;
      newFormValidation.reasonError = true;
      newFormValidation.reasonErrTxt = 'Please mention reason';
    } else {
      newFormValidation.reasonError = false;
    }

    setFormValidation(newFormValidation);

    if (
      newFormValidation.errCount === 0 &&
      !newFormValidation.emailError &&
      !route?.params?.userHistoryData
    ) {
      dispatch(storeData(userDetails));
      navigation.navigate('FormSubmission', {fromHistory: true});
    }
    if (route?.params?.userHistoryData) {
      dispatch(updateUserData(userDetails));
      navigation.navigate('HistoryScreen');
    }
  };

  const styles = getStyles(formValidation.genderError);

  useEffect(() => {
    if (emailError && userDetails.email === '') {
      setFormValidation(prevFormValidation => {
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
  }, [emailError, userDetails.email]);

  useEffect(() => {
    if (userDetails.gender !== '') {
      setFormValidation(prevFormValidation => {
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
  }, [userDetails.gender]);

  useEffect(() => {
    if (userDetails.dob !== '') {
      setDobError(false);
      formValidation.errCount = Math.max(formValidation.errCount - 1, 0);
      calculateAge(userDetails.dob);
    }
  }, [userDetails.dob]);
  useEffect(() => {
    setSelectedDate(
      route?.params?.userHistoryData?.dob
        ? route?.params?.userHistoryData?.dob
        : '',
    );
  }, [route?.params?.userHistoryData]);
  return (
    <>
      <ErrorPopUp
        errCount={formValidation.errCount}
        errMsg={formValidation.errMsg}
      />

      <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <View style={styles.container}>
            <Text style={styles.heading}>General Patient Information</Text>
            <View style={styles.line}></View>
            <Text style={styles.textLabel}>
              Patient Gender <Text style={styles.star}>*</Text>
            </Text>
            <View style={styles.genderContainer}>
              <SelectDropdown
                data={gender}
                onSelect={(selectedItem, index) =>
                  setUserDetails({...userDetails, gender: selectedItem.value})
                }
                defaultValueByIndex={
                  route?.params?.userHistoryData.gender
                    ? route?.params?.userHistoryData.gender === 'Male'
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
                    userDetails,
                    setFormValidation,
                    formValidation,
                  )
                }
              />
              {formValidation.genderError ? (
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
              Patient Name <Text style={styles.star}>*</Text>{' '}
            </Text>
            <View style={styles.parentInput}>
              <View style={styles.inputContainer}>
                <CustomTextInput
                  style={styles.input}
                  onBlur={() =>
                    onBlurErrorFirstName(
                      userDetails,
                      setFormValidation,
                      formValidation,
                    )
                  }
                  placeholder={''}
                  errorText={formValidation.firstNameErrTxt}
                  value={userDetails.firstName}
                  onChange={() =>
                    onChangeFirstName(
                      userDetails,
                      setFormValidation,
                      formValidation,
                    )
                  }
                  setUserDetails={setUserDetails}
                  userDetails={userDetails}
                  name="firstName"
                  errorMsg={formValidation.firstNameErr}
                />
                <Text style={styles.bottomLabel}>First Name</Text>
              </View>
              <View style={styles.inputContainer}>
                <CustomTextInput
                  style={styles.input}
                  onChange={() =>
                    onChangeLastName(
                      userDetails,
                      setFormValidation,
                      formValidation,
                    )
                  }
                  onBlur={() =>
                    onBlurErrorLastName(
                      userDetails,
                      setFormValidation,
                      formValidation,
                    )
                  }
                  placeholder={''}
                  errorText={formValidation.lastNameErrTxt}
                  value={userDetails.lastName}
                  setUserDetails={setUserDetails}
                  userDetails={userDetails}
                  name="lastName"
                  errorMsg={formValidation.lastNameErr}
                />
                <Text style={styles.bottomLabel}>Last Name</Text>
              </View>
            </View>
            <Text style={styles.textLabel}>
              Patient Birth Date <Text style={styles.star}>*</Text>
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[
                  styles.calendar,
                  {borderColor: dobError ? errorRed : inputGrey},
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
                  maximumDate={todayDate}
                  date={
                    selectedDate
                      ? new Date(moment(selectedDate, 'DD/MM/YYYY'))
                      : todayDate
                  }
                  minimumDate={new Date(1900, 0, 1)}
                />
              </TouchableOpacity>
            </View>
            {dobError ? (
              <>
                <View style={styles.errorMessage}>
                  <MaterialIcons
                    name="error-outline"
                    size={15}
                    color={errorRed}
                  />
                  <Text style={styles.errorText}>
                    Date of birth is required.
                  </Text>
                </View>
              </>
            ) : (
              <></>
            )}
            <Text style={styles.textLabel}>
              Age <Text style={styles.star}>*</Text>
            </Text>
            <View style={styles.input}>
              <Text>
                {userDetails.age > 0
                  ? userDetails.age
                  : 'Select date from above'}
              </Text>
            </View>
            <Text style={styles.textLabel}>
              Patient Height (cm's) <Text style={styles.star}>*</Text>
            </Text>
            <CustomTextInput
              style={styles.input2}
              onChange={() =>
                onChangeHeight(userDetails, setFormValidation, formValidation)
              }
              onBlur={() =>
                onBlurErrorHeight(
                  userDetails,
                  setFormValidation,
                  formValidation,
                )
              }
              placeholder="ex: 172"
              errorText={formValidation.heightErrTxt}
              type={'number-pad'}
              value={userDetails.height}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="height"
              errorMsg={formValidation.heightError}
            />
            <Text style={styles.textLabel}>
              Patient Weight (kg's) <Text style={styles.star}>*</Text>
            </Text>
            <CustomTextInput
              style={styles.input2}
              onChange={() =>
                onChangeWeight(userDetails, setFormValidation, formValidation)
              }
              onBlur={() =>
                onBlurErrorWeight(
                  userDetails,
                  setFormValidation,
                  formValidation,
                )
              }
              placeholder="ex: 30"
              errorText={formValidation.weightErrTxt}
              type={'number-pad'}
              value={userDetails.weight}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="weight"
              errorMsg={formValidation.weightError}
            />
            <Text style={styles.textLabel}>
              Patient Email <Text style={styles.star}>*</Text>
            </Text>

            <CustomTextInput
              style={styles.input2}
              onChange={() =>
                onChangeEmail(userDetails, setFormValidation, formValidation)
              }
              onBlur={() =>
                onBlurErrorEmail(
                  userDetails,
                  setFormValidation,
                  formValidation,
                  emailExist,
                )
              }
              placeholder="ex: myname@example.com"
              errorText={formValidation.emailErrTxt}
              type={'email-address'}
              value={userDetails.email}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="email"
              errorMsg={formValidation.emailError}
              autoCapitalize={'none'}
            />
            <Text style={styles.bottomLabel}>example@example.com</Text>
            <Text style={styles.textLabel}>
              Reason for seeing the doctor: <Text style={styles.star}>*</Text>
            </Text>
            <CustomTextInput
              style={styles.input2}
              onChange={() =>
                onChangeReason(userDetails, setFormValidation, formValidation)
              }
              onBlur={() =>
                onBlurErrorReason(
                  userDetails,
                  setFormValidation,
                  formValidation,
                )
              }
              placeholder=""
              errorText={formValidation.reasonErrTxt}
              value={userDetails.reason}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="reason"
              errorMsg={formValidation.reasonError}
            />
            <View style={styles.line}></View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>

      <View style={styles.savebtn}>
        <TouchableOpacity
          disabled={isDisabled}
          onPress={handleSubmit}
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

const getStyles = (errorMsg: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: white,
      width: '93%',
      padding: 15,
      alignSelf: 'center',
      marginTop: 15,
      marginBottom: 15,
      borderRadius: 10,
    },
    heading: {
      fontSize: isTab() ? actuatedNormalize(20) : 30,
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
    genderContainer: {
      width: isTab() ? '30%' : '100%',
      position: 'relative',
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
    birthSelect: {
      flexDirection: 'row',
      gap: 20,
      // flex: 1,
      // width: isTab() ? '45%' : '32%'
      width: '100%',
    },
    input2: {
      borderWidth: 1,
      padding: 5,
      width: isTab() ? '30%' : '100%',
      borderColor: inputGrey,
      borderRadius: 5,
      color: '#000',
    },
    savebtn: {
      backgroundColor: white,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      marginBottom: 5,
    },
    button: {
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
    calendar: {
      borderWidth: 1,
      padding: 5,
      width: '100%',
      borderColor: inputGrey,
      borderRadius: 5,
      height: 30,
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
    star: {
      color: errorRed,
      fontSize: 18,
    },
    errorText: {
      color: errorRed,
      fontSize: 12,
      fontWeight: 500,
    },
    errorPopUp: {
      backgroundColor: errorRed,
    },
    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      color: white,
    },
    errorCountText: {
      color: '#000',
      fontSize: 15,
      textAlign: 'center',
    },
    errorCountContainer: {
      margin: 5,
      backgroundColor: white,
      paddingHorizontal: 5,
      alignSelf: 'center',
      borderRadius: 20,
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
      borderColor: errorMsg ? errorRed : inputGrey,
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
export default MedicalHistoryForm;

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {actuatedNormalize, isTab} from '../utils/Scaling';
import CustomTextInput from '../components/CustomTextInput';
import {gender} from '../utils/InputData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {buttonGreen, errorRed, inputGrey, white} from '../utils/Color';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  onBlurErrorFirstName,
  onBlurErrorLastName,
  onChangeFirstName,
  onChangeLastName,
} from '../utils/Validations';
import ErrorPopUp from '../components/ErrorPopUp';
import moment from 'moment';

const MedicalConsentForm = () => {
  const [selectedDate, setSelectedDate] = useState<any>('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    dob: '',
    gender: '',
    email: '',
    phoneNo: 0,
    address: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: 0,
    insuranceName: '',
    policyId: 0,
    insuranceType: '',
  });

  const [formValidation, setFormValidation] = useState({
    ...userDetails,
    firstNameErr: false,
    lastNameErr: false,
    ageError: false,
    emailError: false,
    genderError: false,
    phoneNoErr: false,
    addressErr: false,
    cityErr: false,
    stateErr: false,
    zipCodeErr: false,
    errMsg: false,
    errCount: 0,
    firstNameErrTxt: '',
    lastNameErrTxt: '',
    ageErrTxt: '',
    emailErrTxt: '',
    genderErrTxt: '',
    phoneNoErrTxt: '',
    addressErrTxt: '',
    cityErrTxt: '',
    stateErrTxt: '',
    zipCodeErrTxt: '',
  });
  const [dobError, setDobError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const todayDate = new Date();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
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

  useEffect(() => {
    if (userDetails.dob !== '') {
      setDobError(false);
      formValidation.errCount = Math.max(formValidation.errCount - 1, 0);
      calculateAge(userDetails.dob);
    }
  }, [userDetails.dob]);

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

    if (!userDetails.email) {
      setEmailError(true);
      newFormValidation.emailError = true;
      // newFormValidation.errCount += 1;
      newFormValidation.emailErrTxt = 'Email is required';
    } else {
      setEmailError(false);
      newFormValidation.emailError = false;
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

    setFormValidation(newFormValidation);
  };

  return (
    <>
      <ErrorPopUp
        errCount={formValidation.errCount}
        errMsg={formValidation.errMsg}
      />
      <ScrollView bounces={false}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <View style={styles.container}>
            <Text style={styles.heading}>Online Medical Consent Form</Text>
            <View style={styles.line}></View>
            <Text style={styles.textLabel}>Patient Information</Text>
            <View style={styles.line}></View>
            <View style={{flexDirection: isTab() ? 'row' : 'column'}}>
              <Text style={styles.textLabel}>Name</Text>
              <View style={styles.parentInput}>
                <View style={styles.inputContainer}>
                  <CustomTextInput
                    style={styles.input}
                    placeholder={'First Name'}
                    value={userDetails.firstName}
                    setUserDetails={setUserDetails}
                    userDetails={userDetails}
                    name="firstName"
                    onBlur={() =>
                      onBlurErrorFirstName(
                        userDetails,
                        setFormValidation,
                        formValidation,
                      )
                    }
                    onChange={() =>
                      onChangeFirstName(
                        userDetails,
                        setFormValidation,
                        formValidation,
                      )
                    }
                    errorMsg={formValidation.firstNameErr}
                    errorText={formValidation.firstNameErrTxt}
                  />
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
                    placeholder={'Last Name'}
                    errorText={formValidation.lastNameErrTxt}
                    value={userDetails.lastName}
                    setUserDetails={setUserDetails}
                    userDetails={userDetails}
                    name="lastName"
                    errorMsg={formValidation.lastNameErr}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.textLabel}>Age</Text>
            {/* <CustomTextInput
              style={styles.input}
              placeholder="ex: 23"
              value={userDetails.age}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="age"
            /> */}
            <View style={styles.input}>
              <Text>
                {userDetails.age > 0
                  ? userDetails.age
                  : 'Select date from above'}
              </Text>
            </View>
            <Text style={styles.textLabel}>Date of Birth</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.calendar}
                onPress={showDatePicker}>
                <Text>{selectedDate ? selectedDate : 'Select Date'}</Text>
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
            <Text style={styles.textLabel}>Gender</Text>
            <View style={styles.genderContainer}>
              <SelectDropdown
                data={gender}
                onSelect={(selectedItem, index) =>
                  setUserDetails({...userDetails, gender: selectedItem.value})
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
              />
            </View>
            <Text style={styles.textLabel}>Email</Text>
            <CustomTextInput
              style={styles.input}
              placeholder="example@example.com"
              value={userDetails.email}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="email"
            />
            <Text style={styles.textLabel}>Phone Number</Text>
            <CustomTextInput
              style={styles.input}
              placeholder="(+91) 0000-0000"
              value={userDetails.phoneNo}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="phoneNo"
            />
            <Text style={styles.textLabel}>Address</Text>
            <CustomTextInput
              style={styles.input}
              placeholder=""
              value={userDetails.address}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="address"
            />
            <Text style={styles.bottomLabel}>Street Address</Text>
            <CustomTextInput
              style={styles.input}
              placeholder=""
              value={userDetails.streetAddress}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="streetAddress"
            />
            <Text style={styles.bottomLabel}>Street Address Line 2</Text>
            <View style={styles.parentInput}>
              <View style={styles.inputContainer}>
                <CustomTextInput
                  style={styles.input}
                  placeholder={''}
                  value={userDetails.city}
                  setUserDetails={setUserDetails}
                  userDetails={userDetails}
                  name="city"
                />
                <Text style={styles.bottomLabel}>City</Text>
              </View>
              <View style={styles.inputContainer}>
                <CustomTextInput
                  style={styles.input}
                  placeholder={''}
                  value={userDetails.state}
                  setUserDetails={setUserDetails}
                  userDetails={userDetails}
                  name="state"
                />
                <Text style={styles.bottomLabel}>State / Province</Text>
              </View>
            </View>
            <CustomTextInput
              style={styles.input}
              placeholder=""
              value={userDetails.zipCode}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="zipCode"
            />
            <Text style={styles.bottomLabel}>Postal / Zip code</Text>
            <Text style={styles.textLabel}>Health Insurance Name</Text>
            <CustomTextInput
              style={styles.input}
              placeholder=""
              value={userDetails.insuranceName}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="insuranceName"
            />
            <Text style={styles.textLabel}>Insurance Policy ID</Text>
            <CustomTextInput
              style={styles.input}
              placeholder=""
              value={userDetails.policyId}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="policyId"
            />
            <Text style={styles.textLabel}>Insurance Package/Type</Text>
            <CustomTextInput
              style={styles.input}
              placeholder=""
              value={userDetails.insuranceType}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="insuranceType"
            />
            <View style={styles.line}></View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <View style={styles.savebtn}>
        <TouchableOpacity onPress={handleSubmit} style={styles.button2}>
          <Text style={styles.btntext1}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    fontSize: isTab() ? actuatedNormalize(23) : 33,
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
    marginBottom: actuatedNormalize(12),
    marginTop: 10,
    fontSize: isTab() ? actuatedNormalize(14) : 19,
    fontWeight: '600',
    marginVertical: isTab() ? 'auto' : 0,
    marginLeft: isTab() ? 10 : 0,
  },
  parentInput: {
    flexDirection: 'row',
    gap: isTab() ? '5%' : '10%',
    // justifyContent: isTab() ? 'center' : '',
    justifyContent: 'flex-end',
    // alignItems: isTab() ? 'center' : ''
    alignItems: 'center',
  },
  inputContainer: {
    width: isTab() ? '35%' : '45%',
  },
  input: {
    borderWidth: 1,
    padding: 7,
    width: '100%',
    borderColor: inputGrey,
    borderRadius: 5,
    color: '#000',
  },
  genderContainer: {
    width: isTab() ? '30%' : '100%',
  },
  bottomLabel: {
    marginTop: 5,
    fontSize: isTab() ? actuatedNormalize(7) : 12,
    color: 'rgb(85, 87, 86)',
    marginBottom: 9,
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
    borderColor: 'rgb(146, 150, 147)',
    borderRadius: 5,
    height: 30,
  },
  calendarIcon: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: -20,
    marginTop: -18,
  },
  dropdownButtonStyle: {
    width: 330,
    height: 40,
    // backgroundColor: '#E9ECEF',
    backgroundColor: white,
    color: '#000',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: inputGrey,
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

export default MedicalConsentForm;

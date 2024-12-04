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
  onBlurErrorAddress,
  onBlurErrorCity,
  onBlurErrorEmail,
  onBlurErrorFirstName,
  onBlurErrorGender,
  onBlurErrorInsuranceName,
  onBlurErrorInsuranceType,
  onBlurErrorLastName,
  onBlurErrorPhoneNo,
  onBlurErrorPolicyId,
  onBlurErrorState,
  onBlurErrorZipCode,
  onChangeAddress,
  onChangeCity,
  onChangeEmail,
  onChangeFirstName,
  onChangeInsuranceName,
  onChangeInsuranceType,
  onChangeLastName,
  onChangePhoneNo,
  onChangePolicyID,
  onChangeState,
  onChangeZipCode,
} from '../utils/Validations';
import ErrorPopUp from '../components/ErrorPopUp';
import moment from 'moment';
import {nanoid} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {storeConsentData} from '../store/action';

const MedicalConsentForm = () => {
  const [selectedDate, setSelectedDate] = useState<any>('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [userDetails, setUserDetails] = useState({
    id: nanoid(),
    firstName: '',
    lastName: '',
    age: 0,
    dob: '',
    gender: '',
    email: '',
    phoneNo: '',
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
    insuranceNameErr: false,
    policyIdErr: false,
    insuranceTypeErr: false,
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
    insuranceNameErrTxt: '',
    policyIdErrTxt: '',
    insuranceTypeErrTxt: '',
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

  const styles = getStyles(formValidation.genderError);

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

  const navigation = useNavigation<any>();

  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();
  const consentData = useSelector(
    (state: any) => state.reducer.userConsentData,
  );

  useEffect(() => {
    if (formValidation.errCount > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [formValidation.errCount]);

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

    if (!userDetails.phoneNo) {
      newFormValidation.errCount += 1;
      newFormValidation.phoneNoErr = true;
      newFormValidation.phoneNoErrTxt = 'Phone No is required';
    } else {
      newFormValidation.phoneNoErr = false;
    }

    if (!userDetails.zipCode) {
      newFormValidation.errCount += 1;
      newFormValidation.zipCodeErr = true;
      newFormValidation.zipCodeErrTxt = 'Zip Code is required';
    } else {
      newFormValidation.zipCodeErr = false;
    }

    if (!userDetails.policyId) {
      newFormValidation.errCount += 1;
      newFormValidation.policyIdErr = true;
      newFormValidation.policyIdErrTxt = 'Policy ID is required';
    } else {
      newFormValidation.policyIdErr = false;
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

    if (userDetails.address === '') {
      newFormValidation.errCount += 1;
      newFormValidation.addressErr = true;
      newFormValidation.addressErrTxt = 'Address is required!';
    } else {
      newFormValidation.addressErr = false;
    }

    if (userDetails.city === '') {
      newFormValidation.errCount += 1;
      newFormValidation.cityErr = true;
      newFormValidation.cityErrTxt = 'City name is required';
    } else {
      newFormValidation.cityErr = false;
    }

    if (userDetails.state === '') {
      newFormValidation.errCount += 1;
      newFormValidation.stateErr = true;
      newFormValidation.stateErrTxt = 'State name is required';
    } else {
      newFormValidation.stateErr = false;
    }

    if (userDetails.insuranceName === '') {
      newFormValidation.errCount += 1;
      newFormValidation.insuranceNameErr = true;
      newFormValidation.insuranceNameErrTxt = 'Insurance name is required';
    } else {
      newFormValidation.insuranceNameErr = false;
    }

    if (userDetails.insuranceType === '') {
      newFormValidation.errCount += 1;
      newFormValidation.insuranceTypeErr = true;
      newFormValidation.insuranceTypeErrTxt = 'Insurance Type is required';
    } else {
      newFormValidation.insuranceTypeErr = false;
    }

    setFormValidation(newFormValidation);

    if (newFormValidation.errCount === 0 && !newFormValidation.emailError) {
      dispatch(storeConsentData(userDetails));
      navigation.navigate('FormSubmission');
    }
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
              <Text style={styles.textLabel}>
                Name <Text style={styles.star}>*</Text>
              </Text>
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
            <Text style={styles.textLabel}>
              Age <Text style={styles.star}>*</Text>
            </Text>
            <View style={styles.input}>
              <Text>
                {userDetails.age > 0
                  ? userDetails.age
                  : 'Select date from below'}
              </Text>
            </View>
            <Text style={styles.textLabel}>
              Date of Birth <Text style={styles.star}>*</Text>
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[
                  styles.calendar,
                  {borderColor: dobError ? errorRed : inputGrey},
                ]}
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
            <Text style={styles.textLabel}>
              Gender <Text style={styles.star}>*</Text>
            </Text>
            <View style={styles.genderContainer}>
              <SelectDropdown
                data={gender}
                onSelect={(selectedItem, index) =>
                  setUserDetails({
                    ...userDetails,
                    gender: selectedItem.value,
                  })
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
              Email <Text style={styles.star}>*</Text>
            </Text>
            <CustomTextInput
              style={styles.input}
              onChange={() =>
                onChangeEmail(userDetails, setFormValidation, formValidation)
              }
              onBlur={() =>
                onBlurErrorEmail(
                  userDetails,
                  setFormValidation,
                  formValidation,
                  null,
                )
              }
              placeholder="example@example.com"
              errorText={formValidation.emailErrTxt}
              type={'email-address'}
              value={userDetails.email}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="email"
              errorMsg={formValidation.emailError}
              autoCapitalize={'none'}
            />
            <Text style={styles.textLabel}>
              Phone Number <Text style={styles.star}>*</Text>
            </Text>
            <CustomTextInput
              style={styles.input}
              onBlur={() =>
                onBlurErrorPhoneNo(
                  userDetails,
                  setFormValidation,
                  formValidation,
                )
              }
              placeholder="(+91) 0000-0000"
              type={'number-pad'}
              onChange={() =>
                onChangePhoneNo(userDetails, setFormValidation, formValidation)
              }
              errorText={formValidation.phoneNoErrTxt}
              value={userDetails.phoneNo}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="phoneNo"
              errorMsg={formValidation.phoneNoErr}
              inputMode={'tel'}
            />
            <Text style={styles.textLabel}>
              Address <Text style={styles.star}>*</Text>
            </Text>
            <CustomTextInput
              style={styles.input}
              onChange={() =>
                onChangeAddress(userDetails, setFormValidation, formValidation)
              }
              onBlur={() =>
                onBlurErrorAddress(
                  userDetails,
                  setFormValidation,
                  formValidation,
                )
              }
              placeholder=""
              errorText={formValidation.addressErrTxt}
              value={userDetails.address}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="address"
              errorMsg={formValidation.addressErr}
            />
            <Text style={styles.bottomLabel}>
              Street Address <Text style={styles.star1}>*</Text>
            </Text>
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
                  onBlur={() =>
                    onBlurErrorCity(
                      userDetails,
                      setFormValidation,
                      formValidation,
                    )
                  }
                  onChange={() =>
                    onChangeCity(userDetails, setFormValidation, formValidation)
                  }
                  errorMsg={formValidation.cityErr}
                  errorText={formValidation.cityErrTxt}
                />
                <Text style={styles.bottomLabel}>
                  City <Text style={styles.star1}>*</Text>
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <CustomTextInput
                  style={styles.input}
                  placeholder={''}
                  value={userDetails.state}
                  setUserDetails={setUserDetails}
                  userDetails={userDetails}
                  name="state"
                  onBlur={() =>
                    onBlurErrorState(
                      userDetails,
                      setFormValidation,
                      formValidation,
                    )
                  }
                  onChange={() =>
                    onChangeState(
                      userDetails,
                      setFormValidation,
                      formValidation,
                    )
                  }
                  errorMsg={formValidation.stateErr}
                  errorText={formValidation.stateErrTxt}
                />
                <Text style={styles.bottomLabel}>
                  State / Province <Text style={styles.star1}>*</Text>
                </Text>
              </View>
            </View>
            <CustomTextInput
              style={styles.input}
              placeholder={''}
              value={userDetails.zipCode}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="zipCode"
              type={'number-pad'}
              onBlur={() =>
                onBlurErrorZipCode(
                  userDetails,
                  setFormValidation,
                  formValidation,
                )
              }
              onChange={() =>
                onChangeZipCode(userDetails, setFormValidation, formValidation)
              }
              errorMsg={formValidation.zipCodeErr}
              errorText={formValidation.zipCodeErrTxt}
            />
            <Text style={styles.bottomLabel}>
              Postal / Zip code <Text style={styles.star1}>*</Text>
            </Text>
            <Text style={styles.textLabel}>
              Health Insurance Name <Text style={styles.star1}>*</Text>
            </Text>
            <CustomTextInput
              style={styles.input}
              placeholder={''}
              value={userDetails.insuranceName}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="insuranceName"
              onBlur={() =>
                onBlurErrorInsuranceName(
                  userDetails,
                  setFormValidation,
                  formValidation,
                )
              }
              onChange={() =>
                onChangeInsuranceName(
                  userDetails,
                  setFormValidation,
                  formValidation,
                )
              }
              errorMsg={formValidation.insuranceNameErr}
              errorText={formValidation.insuranceNameErrTxt}
            />
            <Text style={styles.textLabel}>
              Insurance Policy ID <Text style={styles.star1}>*</Text>
            </Text>
            <CustomTextInput
              style={styles.input}
              placeholder={''}
              value={userDetails.policyId}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="policyId"
              type={'number-pad'}
              onBlur={() =>
                onBlurErrorPolicyId(
                  userDetails,
                  setFormValidation,
                  formValidation,
                )
              }
              onChange={() =>
                onChangePolicyID(userDetails, setFormValidation, formValidation)
              }
              errorMsg={formValidation.policyIdErr}
              errorText={formValidation.policyIdErrTxt}
            />
            <Text style={styles.textLabel}>
              Insurance Package/Type <Text style={styles.star1}>*</Text>
            </Text>
            <CustomTextInput
              style={styles.input}
              placeholder={''}
              value={userDetails.insuranceType}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              name="insuranceType"
              onBlur={() =>
                onBlurErrorInsuranceType(
                  userDetails,
                  setFormValidation,
                  formValidation,
                )
              }
              onChange={() =>
                onChangeInsuranceType(
                  userDetails,
                  setFormValidation,
                  formValidation,
                )
              }
              errorMsg={formValidation.insuranceTypeErr}
              errorText={formValidation.insuranceTypeErrTxt}
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
      // justifyContent: 'flex-end',
      // alignItems: isTab() ? 'center' : ''
      // alignItems: 'center',
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
    star: {
      color: errorRed,
      fontSize: 18,
    },
    star1: {
      color: errorRed,
      fontSize: 13,
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

export default MedicalConsentForm;

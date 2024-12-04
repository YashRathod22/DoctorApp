import {View, Text, TextInput, StyleSheet, Keyboard} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {errorRed, inputGrey, white} from '../utils/Color';

const CustomTextInput = ({
  style,
  placeholder,
  value,
  setUserDetails,
  userDetails,
  name,
  errorMsg,
  type,
  errorText,
  onBlur,
  onFocus,
  maxLength,
  onChange,
  autoCapitalize,
  inputMode,
  editable,
  multiline,
  numberofLines,
}: any) => {
  return (
    <>
      <TextInput
        style={[style, {borderColor: errorMsg ? errorRed : inputGrey}]}
        placeholder={placeholder}
        value={value}
        onChangeText={txt => {
          const newObj: any = {};
          newObj[name] = txt;
          setUserDetails({...userDetails, ...newObj});
        }}
        keyboardType={type}
        onBlur={onBlur}
        onFocus={onFocus}
        maxLength={maxLength}
        onChange={onChange}
        autoCapitalize={autoCapitalize}
        inputMode={inputMode}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberofLines}
      />

      {errorMsg ? (
        <>
          <View style={styles.errorMsgContainer}>
            <MaterialIcons name="error-outline" size={15} color={errorRed} />
            <Text style={styles.errTxt}>
              {errorText ? errorText : 'This field is required.'}
            </Text>
          </View>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  errorMsgContainer: {
    // backgroundColor: errorRed,
    padding: 4,
    marginTop: 4,
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    gap: 3,
  },
  errTxt: {
    color: errorRed,
    fontSize: 12,
    fontWeight: 500,
  },
});
export default CustomTextInput;

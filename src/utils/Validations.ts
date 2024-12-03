export const onBlurErrorFirstName = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
) => {
  const newFormValidation = {...formValidation};
  const nameRegex = /^[a-zA-Z ]{2,40}$/;
  const validName = nameRegex.test(userDetails.firstName);

  if (userDetails.firstName === '') {
    if (!newFormValidation.firstNameErr) {
      newFormValidation.firstNameErr = true;
      newFormValidation.firstNameErrTxt = 'First name is required';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (userDetails.firstName.length < 3) {
    if (!newFormValidation.firstNameErr) {
      newFormValidation.firstNameErr = true;
      newFormValidation.firstNameErrTxt = 'First name is too small';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (!validName) {
    newFormValidation.firstNameErr = true;
    newFormValidation.firstNameErrTxt = 'First name is invalid!';
    newFormValidation.errMsg = true;
  } else {
    if (newFormValidation.firstNameErr) {
      newFormValidation.firstNameErr = false;
      newFormValidation.firstNameErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }
  setFormValidation(newFormValidation);
};

export const onChangeFirstName = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
): void => {
  const newFormValidation = {...formValidation};

  const firstNameLength = userDetails.firstName.length;
  const nameRegex = /^[a-zA-Z ]{2,40}$/;
  const validName = nameRegex.test(userDetails.firstName);

  if (firstNameLength < 2) {
    if (!newFormValidation.firstNameErr) {
      newFormValidation.firstNameErr = true;
      newFormValidation.firstNameErrTxt = 'First name is too small';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else if (!validName) {
    if (!newFormValidation.firstNameErr) {
      newFormValidation.firstNameErr = true;
      newFormValidation.firstNameErrTxt = 'First name is invalid!';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else if (firstNameLength > 2) {
    if (newFormValidation.firstNameErr) {
      newFormValidation.firstNameErr = false;
      newFormValidation.firstNameErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }

  setFormValidation({
    ...newFormValidation,
    firstNameErr: newFormValidation.firstNameErr,
    firstNameErrTxt: newFormValidation.firstNameErrTxt,
    errCount: newFormValidation.errCount,
  });
};

export const onBlurErrorLastName = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
) => {
  const newFormValidation = {...formValidation};
  const nameRegex = /^[a-zA-Z ]{2,40}$/;
  const validName = nameRegex.test(userDetails.lastName);

  if (userDetails.lastName === '') {
    if (!newFormValidation.lastNameErr) {
      newFormValidation.lastNameErr = true;
      newFormValidation.lastNameErrTxt = 'Last name is required';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (userDetails.lastName.length < 3) {
    if (!newFormValidation.lastNameErr) {
      newFormValidation.lastNameErr = true;
      newFormValidation.lastNameErrTxt = 'Last name is too small';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (!validName) {
    newFormValidation.lastNameErr = true;
    newFormValidation.lastNameErrTxt = 'Last name is invalid!';
    newFormValidation.errMsg = true;
  } else {
    if (newFormValidation.lastNameErr) {
      newFormValidation.lastNameErr = false;
      newFormValidation.lastNameErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }

  setFormValidation({
    ...newFormValidation,
    lastNameErr: newFormValidation.lastNameErr,
    lastNameErrTxt: newFormValidation.lastNameErrTxt,
    errCount: newFormValidation.errCount,
  });
};

export const onChangeLastName = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
): void => {
  const newFormValidation = {...formValidation};

  const lastNameLength = userDetails.lastName.length;
  const nameRegex = /^[a-zA-Z ]{2,40}$/;
  const validName = nameRegex.test(userDetails.lastName);

  if (lastNameLength < 2) {
    if (!newFormValidation.lastNameErr) {
      newFormValidation.lastNameErr = true;
      newFormValidation.lastNameErrTxt = 'Last name is too small';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else if (!validName) {
    if (!newFormValidation.lastNameErr) {
      newFormValidation.lastNameErr = true;
      newFormValidation.lastNameErrTxt = 'Last name is invalid!';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else if (lastNameLength > 2) {
    if (newFormValidation.lastNameErr) {
      newFormValidation.lastNameErr = false;
      newFormValidation.lastNameErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }

  setFormValidation({
    ...newFormValidation,
    lastNameErr: newFormValidation.lastNameErr,
    lastNameErrTxt: newFormValidation.lastNameErrTxt,
    errCount: newFormValidation.errCount,
  });
};

export const onBlurErrorAge = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
) => {
  const newFormValidation = {...formValidation};

  if (userDetails.age < 1) {
    if (!newFormValidation.ageError) {
      newFormValidation.ageError = true;
      newFormValidation.ageErrTxt = 'Age is required';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (userDetails.age > 100) {
    if (!newFormValidation.ageError) {
      newFormValidation.ageError = true;
      newFormValidation.ageErrTxt = 'Age is invalid';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else {
    if (newFormValidation.ageError) {
      newFormValidation.ageError = false;
      newFormValidation.ageErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }
  setFormValidation(newFormValidation);
};

export const onChangeAge = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
): void => {
  const newFormValidation = {...formValidation};

  if (userDetails.age < 1) {
    if (!newFormValidation.ageError) {
      newFormValidation.ageError = true;
      newFormValidation.ageErrTxt = 'Age is invalid';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (userDetails.age > 100) {
    if (!newFormValidation.ageError) {
      newFormValidation.ageError = true;
      newFormValidation.ageErrTxt = 'Age is invalid';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else {
    if (newFormValidation.ageError) {
      newFormValidation.ageError = false;
      newFormValidation.ageErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }

  setFormValidation({
    ...newFormValidation,
    ageError: newFormValidation.ageError,
    ageErrTxt: newFormValidation.ageErrTxt,
    errCount: newFormValidation.errCount,
  });
};

export const onBlurErrorGender = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
) => {
  const newFormValidation = {...formValidation};

  if (userDetails.gender === '') {
    if (!newFormValidation.genderError) {
      newFormValidation.genderError = true;
      newFormValidation.genderErrTxt = 'Gender is required';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else {
    newFormValidation.genderError = false;
    newFormValidation.genderErrTxt = '';
    newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
    newFormValidation.errMsg = false;
  }
  setFormValidation(newFormValidation);
};

export const onBlurErrorPhoneNo = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
) => {
  const newFormValidation = {...formValidation};
  const phoneNoLength = userDetails.phoneNo.length;
  const isValid = phoneNoLength > 8 && phoneNoLength < 11;
  const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
  const isValidPhoneNo = phoneRegex.test(userDetails.phoneNo);

  if (userDetails.phoneNo === '') {
    if (!newFormValidation.phoneNoErr) {
      newFormValidation.phoneNoErr = true;
      newFormValidation.phoneNoErrTxt = 'Phone No is required';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (!isValidPhoneNo) {
    newFormValidation.phoneNoErr = true;
    newFormValidation.phoneNoErrTxt = 'Phone No is invalid!';
    newFormValidation.errMsg = true;
  } else {
    if (newFormValidation.phoneNoErr) {
      newFormValidation.phoneNoErr = false;
      newFormValidation.phoneNoErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }
  setFormValidation(newFormValidation);
};

export const onChangePhoneNo = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
): void => {
  const newFormValidation = {...formValidation};

  const phoneNoLength = userDetails.phoneNo.length;
  const isValid = phoneNoLength > 8 && phoneNoLength < 11;
  const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{8}$/;
  const isValidPhoneNo = phoneRegex.test(userDetails.phoneNo);

  if (!isValidPhoneNo) {
    if (!newFormValidation.phoneNoErr) {
      newFormValidation.phoneNoErr = true;
      newFormValidation.phoneNoErrTxt = 'Phone No is invalid!';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else if (isValidPhoneNo) {
    if (newFormValidation.phoneNoErr) {
      newFormValidation.phoneNoErr = false;
      newFormValidation.phoneNoErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }

  setFormValidation({
    ...newFormValidation,
    phoneNoErr: newFormValidation.phoneNoErr,
    phoneNoErrTxt: newFormValidation.phoneNoErrTxt,
    errCount: newFormValidation.errCount,
  });
};

export const onBlurErrorHeight = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
) => {
  const newFormValidation = {...formValidation};
  const heightLength = userDetails.height.length;
  const isValid = heightLength > 2 && heightLength < 4;

  if (!userDetails.height) {
    if (!newFormValidation.heightError) {
      newFormValidation.heightError = true;
      newFormValidation.heightErrTxt = 'Height is required';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (!isValid) {
    if (!newFormValidation.heightError) {
      newFormValidation.heightError = true;
      newFormValidation.heightErrTxt = 'Height is invalid';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else {
    if (newFormValidation.heightError) {
      newFormValidation.heightError = false;
      newFormValidation.heightErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }
  setFormValidation(newFormValidation);
};

export const onChangeHeight = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
): void => {
  const newFormValidation = {...formValidation};

  const heightLength = userDetails.height.length;
  const isValid = heightLength > 1 && heightLength < 3;

  if (!isValid) {
    if (!newFormValidation.heightError) {
      newFormValidation.heightError = true;
      newFormValidation.heightErrTxt = 'Height is invalid';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else {
    if (newFormValidation.heightError) {
      newFormValidation.heightError = false;
      newFormValidation.heightErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }

  setFormValidation({
    ...newFormValidation,
    heightError: newFormValidation.heightError,
    heightErrTxt: newFormValidation.heightErrTxt,
    errCount: newFormValidation.errCount,
  });
};

export const onBlurErrorWeight = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
) => {
  const newFormValidation = {...formValidation};
  const weightLength = userDetails.weight.length;
  const isValid = weightLength > 1 && weightLength < 4;
  if (!userDetails.weight) {
    if (!newFormValidation.weightError) {
      newFormValidation.weightError = true;
      newFormValidation.weightErrTxt = 'Weight is required';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (!isValid) {
    if (!newFormValidation.weightError) {
      newFormValidation.weightError = true;
      newFormValidation.weightErrTxt = 'Height is invalid';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else {
    if (newFormValidation.weightError) {
      newFormValidation.weightError = false;
      newFormValidation.weightErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }
  setFormValidation(newFormValidation);
};

export const onChangeWeight = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
): void => {
  const newFormValidation = {...formValidation};

  const weightLength = userDetails.weight.length;
  const isValid = weightLength > 0 && weightLength < 3;

  if (!isValid) {
    if (!newFormValidation.weightError) {
      newFormValidation.weightError = true;
      newFormValidation.weightErrTxt = 'Weight is invalid';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else {
    if (newFormValidation.weightError) {
      newFormValidation.weightError = false;
      newFormValidation.weightErrTxt = 'Weight is invalid!';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }

  setFormValidation({
    ...newFormValidation,
    weightError: newFormValidation.weightError,
    weightErrTxt: newFormValidation.weightErrTxt,
    errCount: newFormValidation.errCount,
  });
};

export const onBlurErrorEmail = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
  emailExist: any,
) => {
  const newFormValidation = {...formValidation};
  // const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValidEmail = emailRegex.test(userDetails.email);

  if (!userDetails.email) {
    if (!newFormValidation.emailError) {
      newFormValidation.emailError = true;
      newFormValidation.emailErrTxt = 'Email is required!';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else if (!isValidEmail) {
    newFormValidation.emailError = true;
    newFormValidation.emailErrTxt = 'Email is invalid!';
    newFormValidation.errMsg = true;
  } else {
    if (newFormValidation.emailError && !emailExist) {
      newFormValidation.emailError = false;
      newFormValidation.emailErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }

  setFormValidation(newFormValidation);
};

export const onChangeEmail = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
) => {
  const newFormValidation = {...formValidation};
  // const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = emailRegex.test(userDetails.email);

  if (!isValid) {
    if (!newFormValidation.emailError) {
      newFormValidation.emailError = true;
      newFormValidation.emailErrTxt = 'Email is invalid!';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else {
    if (newFormValidation.emailError) {
      newFormValidation.emailError = false;
      newFormValidation.emailErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }

  setFormValidation({
    ...newFormValidation,
    emailError: newFormValidation.emailError,
    emailErrTxt: newFormValidation.emailErrTxt,
    errCount: newFormValidation.errCount,
  });
};

export const onBlurErrorReason = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
): void => {
  if (!userDetails.reason && userDetails.reason.length <= 5) {
    setFormValidation({
      ...formValidation,
      errCount: formValidation.errCount + 1,
      reasonError: true,
      reasonErrTxt: 'Reason should be more than 3 characters!',
    });
  } else {
    if (
      formValidation.errCount > 0 &&
      formValidation.reasonError &&
      formValidation.reason.length > 4
    ) {
      setFormValidation({
        ...formValidation,
        errCount: formValidation.errCount - 1,
        reasonError: false,
      });
    }
  }
};

export const onChangeReason = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
): void => {
  userDetails.reason.length > 2
    ? setFormValidation({
        ...formValidation,
        reasonError: false,
        errCount: formValidation.errCount - 1,
      })
    : setFormValidation({
        ...formValidation,
        reasonError: true,
        errMsg: true,
        reasonErrTxt: 'Reason should be more than 3 characters!',
      });
};

export const onBlurErrorAddress = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
): void => {
  if (!userDetails.address && userDetails.address.length <= 5) {
    setFormValidation({
      ...formValidation,
      errCount: formValidation.errCount + 1,
      addressErr: true,
      errMsg: true,
      addressErrTxt: 'Address should be more than 3 characters!',
    });
  } else {
    if (
      formValidation.errCount > 0 &&
      formValidation.addressErr &&
      formValidation.address.length > 4
    ) {
      setFormValidation({
        ...formValidation,
        errCount: formValidation.errCount - 1,
        errMsg: false,
        addressErr: false,
      });
    }
  }
};

export const onChangeAddress = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
): void => {
  userDetails.address.length > 2
    ? setFormValidation({
        ...formValidation,
        addressErr: false,
        errCount: formValidation.errCount - 1,
      })
    : setFormValidation({
        ...formValidation,
        addressErr: true,
        errMsg: true,
        addressErrTxt: 'Address should be more than 3 characters!',
      });
};

export const onBlurErrorCity = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
) => {
  const newFormValidation = {...formValidation};
  const cityRegex = /^[a-zA-Z ]{2,40}$/;
  const validName = cityRegex.test(userDetails.city);

  if (userDetails.city === '') {
    if (!newFormValidation.cityErr) {
      newFormValidation.cityErr = true;
      newFormValidation.cityErrTxt = 'City name is required';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (userDetails.city.length < 3) {
    if (!newFormValidation.cityErr) {
      newFormValidation.cityErr = true;
      newFormValidation.cityErrTxt = 'City name is too small';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (!validName) {
    newFormValidation.cityErr = true;
    newFormValidation.cityErrTxt = 'City name is invalid!';
    newFormValidation.errMsg = true;
  } else {
    if (newFormValidation.cityErr) {
      newFormValidation.cityErr = false;
      newFormValidation.cityErr = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }
  setFormValidation(newFormValidation);
};

export const onChangeCity = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
): void => {
  const newFormValidation = {...formValidation};

  const cityLength = userDetails.city.length;
  const nameRegex = /^[a-zA-Z ]{2,40}$/;
  const validName = nameRegex.test(userDetails.city);

  if (cityLength < 1) {
    if (!newFormValidation.cityErr) {
      newFormValidation.cityErr = true;
      newFormValidation.cityErrTxt = 'City name is too small';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else if (!validName) {
    if (!newFormValidation.cityErr) {
      newFormValidation.cityErr = true;
      newFormValidation.cityErrTxt = 'City name is invalid!';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else if (cityLength > 1) {
    if (newFormValidation.cityErr) {
      newFormValidation.cityErr = false;
      newFormValidation.cityErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }

  setFormValidation({
    ...newFormValidation,
    cityErr: newFormValidation.cityErr,
    cityErrTxt: newFormValidation.cityErrTxt,
    errCount: newFormValidation.errCount,
  });
};

export const onBlurErrorState = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
) => {
  const newFormValidation = {...formValidation};
  const stateRegex = /^[a-zA-Z ]{2,40}$/;
  const validName = stateRegex.test(userDetails.state);

  if (userDetails.state === '') {
    if (!newFormValidation.stateErr) {
      newFormValidation.stateErr = true;
      newFormValidation.stateErrTxt = 'State name is required';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (userDetails.state.length < 3) {
    if (!newFormValidation.stateErr) {
      newFormValidation.stateErr = true;
      newFormValidation.stateErrTxt = 'State name is too small';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (!validName) {
    newFormValidation.stateErr = true;
    newFormValidation.stateErrTxt = 'State name is invalid!';
    newFormValidation.errMsg = true;
  } else {
    if (newFormValidation.stateErr) {
      newFormValidation.stateErr = false;
      newFormValidation.stateErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }
  setFormValidation(newFormValidation);
};

export const onChangeState = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
): void => {
  const newFormValidation = {...formValidation};

  const stateLength = userDetails.state.length;
  const nameRegex = /^[a-zA-Z ]{2,40}$/;
  const validName = nameRegex.test(userDetails.state);

  if (stateLength < 1) {
    if (!newFormValidation.stateErr) {
      newFormValidation.stateErr = true;
      newFormValidation.stateErrTxt = 'State name is too small';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else if (!validName) {
    if (!newFormValidation.stateErr) {
      newFormValidation.stateErr = true;
      newFormValidation.stateErrTxt = 'State name is invalid!';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else if (stateLength > 1) {
    if (newFormValidation.stateErr) {
      newFormValidation.stateErr = false;
      newFormValidation.stateErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }

  setFormValidation({
    ...newFormValidation,
    stateErr: newFormValidation.stateErr,
    stateErrTxt: newFormValidation.stateErrTxt,
    errCount: newFormValidation.errCount,
  });
};

export const onBlurErrorZipCode = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
) => {
  const newFormValidation = {...formValidation};
  const zipCodeLength = userDetails.zipCode.length;
  const isValid = zipCodeLength > 5 && zipCodeLength < 7;

  if (!userDetails.zipCode) {
    if (!newFormValidation.zipCodeErr) {
      newFormValidation.zipCodeErr = true;
      newFormValidation.zipCodeErrTxt = 'Zip code is required';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (!isValid) {
    if (!newFormValidation.zipCodeErr) {
      newFormValidation.zipCodeErr = true;
      newFormValidation.zipCodeErrTxt = 'Zip code is invalid';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else {
    if (newFormValidation.zipCodeErr) {
      newFormValidation.zipCodeErr = false;
      newFormValidation.zipCodeErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }
  setFormValidation(newFormValidation);
};

export const onChangeZipCode = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
): void => {
  const newFormValidation = {...formValidation};

  const zipCodeLength = userDetails.zipCode.length;
  const isValid = zipCodeLength > 4 && zipCodeLength < 6;

  if (!isValid) {
    if (!newFormValidation.zipCodeErr) {
      newFormValidation.zipCodeErr = true;
      newFormValidation.zipCodeErrTxt = 'Zip code is invalid';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else {
    if (newFormValidation.zipCodeErr) {
      newFormValidation.zipCodeErr = false;
      newFormValidation.zipCodeErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }

  setFormValidation({
    ...newFormValidation,
    zipCodeErr: newFormValidation.zipCodeErr,
    zipCodeErrTxt: newFormValidation.zipCodeErrTxt,
    errCount: newFormValidation.errCount,
  });
};

export const onBlurErrorInsuranceName = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
) => {
  const newFormValidation = {...formValidation};
  const INRegex = /^[a-zA-Z ]{2,40}$/;
  const validName = INRegex.test(userDetails.insuranceName);

  if (userDetails.insuranceName === '') {
    if (!newFormValidation.insuranceNameErr) {
      newFormValidation.insuranceNameErr = true;
      newFormValidation.insuranceNameErrTxt = 'Insurance name is required';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (userDetails.insuranceName.length < 3) {
    if (!newFormValidation.insuranceNameErr) {
      newFormValidation.insuranceNameErr = true;
      newFormValidation.insuranceNameErrTxt =
        'Insurance name should be more than 3 characters!';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (!validName) {
    newFormValidation.insuranceNameErr = true;
    newFormValidation.insuranceNameErrTxt = 'Insurance name is invalid!';
    newFormValidation.errMsg = true;
  } else {
    if (newFormValidation.insuranceNameErr) {
      newFormValidation.insuranceNameErr = false;
      newFormValidation.insuranceNameErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }
  setFormValidation(newFormValidation);
};

export const onChangeInsuranceName = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
): void => {
  const newFormValidation = {...formValidation};

  const INLength = userDetails.insuranceName.length;
  const nameRegex = /^[a-zA-Z ]{2,40}$/;
  const validName = nameRegex.test(userDetails.insuranceName);

  if (INLength < 1) {
    if (!newFormValidation.insuranceNameErr) {
      newFormValidation.insuranceNameErr = true;
      newFormValidation.insuranceNameErrTxt =
        'Insurance name should be more than 3 characters!';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else if (!validName) {
    if (!newFormValidation.insuranceNameErr) {
      newFormValidation.insuranceNameErr = true;
      newFormValidation.insuranceNameErrTxt = 'Insurance name is invalid!';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else if (INLength > 1) {
    if (newFormValidation.insuranceNameErr) {
      newFormValidation.insuranceNameErr = false;
      newFormValidation.insuranceNameErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }

  setFormValidation({
    ...newFormValidation,
    insuranceNameErr: newFormValidation.insuranceNameErr,
    insuranceNameErrTxt: newFormValidation.insuranceNameErrTxt,
    errCount: newFormValidation.errCount,
  });
};

export const onBlurErrorPolicyId = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
) => {
  const newFormValidation = {...formValidation};
  const policyIdLength = userDetails.policyId.length;
  const isValid = policyIdLength > 8 && policyIdLength < 11;

  if (!userDetails.policyId) {
    if (!newFormValidation.policyIdErr) {
      newFormValidation.policyIdErr = true;
      newFormValidation.policyIdErrTxt = 'Policy ID is required';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (!isValid) {
    if (!newFormValidation.policyIdErr) {
      newFormValidation.policyIdErr = true;
      newFormValidation.policyIdErrTxt =
        'Policy ID should be of 10 characters!';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else {
    if (newFormValidation.policyIdErr) {
      newFormValidation.policyIdErr = false;
      newFormValidation.policyIdErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }
  setFormValidation(newFormValidation);
};

export const onChangePolicyID = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
): void => {
  const newFormValidation = {...formValidation};

  const policyIDLength = userDetails.policyId.length;
  const isValid = policyIDLength > 8 && policyIDLength < 10;

  if (!isValid) {
    if (!newFormValidation.policyIdErr) {
      newFormValidation.policyIdErr = true;
      newFormValidation.policyIdErrTxt =
        'Policy ID should be of 10 characters!';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else {
    if (newFormValidation.policyIdErr) {
      newFormValidation.policyIdErr = false;
      newFormValidation.policyIdErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }

  setFormValidation({
    ...newFormValidation,
    policyIdErr: newFormValidation.policyIdErr,
    policyIdErrTxt: newFormValidation.policyIdErrTxt,
    errCount: newFormValidation.errCount,
  });
};

export const onBlurErrorInsuranceType = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
) => {
  const newFormValidation = {...formValidation};
  const INRegex = /^[a-zA-Z ]{2,40}$/;
  const validName = INRegex.test(userDetails.insuranceType);

  if (userDetails.insuranceType === '') {
    if (!newFormValidation.insuranceTypeErr) {
      newFormValidation.insuranceTypeErr = true;
      newFormValidation.insuranceTypeErrTxt =
        'Insurance package name is required';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (userDetails.insuranceType.length < 3) {
    if (!newFormValidation.insuranceTypeErr) {
      newFormValidation.insuranceTypeErr = true;
      newFormValidation.insuranceTypeErrTxt =
        'Insurance package name should be more than 3 characters!';
      newFormValidation.errCount += 1;
      newFormValidation.errMsg = true;
    }
  } else if (!validName) {
    newFormValidation.insuranceTypeErr = true;
    newFormValidation.insuranceTypeErrTxt =
      'Insurance package name is invalid!';
    newFormValidation.errMsg = true;
  } else {
    if (newFormValidation.insuranceTypeErr) {
      newFormValidation.insuranceTypeErr = false;
      newFormValidation.insuranceTypeErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }
  setFormValidation(newFormValidation);
};

export const onChangeInsuranceType = (
  userDetails: any,
  setFormValidation: any,
  formValidation: any,
): void => {
  const newFormValidation = {...formValidation};

  const INLength = userDetails.insuranceType.length;
  const nameRegex = /^[a-zA-Z ]{2,40}$/;
  const validName = nameRegex.test(userDetails.insuranceType);

  if (INLength < 1) {
    if (!newFormValidation.insuranceTypeErr) {
      newFormValidation.insuranceTypeErr = true;
      newFormValidation.insuranceTypeErrTxt =
        'Insurance package name should be more than 3 characters!';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else if (!validName) {
    if (!newFormValidation.insuranceTypeErr) {
      newFormValidation.insuranceTypeErr = true;
      newFormValidation.insuranceTypeErrTxt =
        'Insurance package name is invalid!';
      newFormValidation.errCount = Math.max(newFormValidation.errCount + 1, 0);
      newFormValidation.errMsg = true;
    }
  } else if (INLength > 1) {
    if (newFormValidation.insuranceTypeErr) {
      newFormValidation.insuranceTypeErr = false;
      newFormValidation.insuranceTypeErrTxt = '';
      newFormValidation.errCount = Math.max(newFormValidation.errCount - 1, 0);
      newFormValidation.errMsg = false;
    }
  }

  setFormValidation({
    ...newFormValidation,
    insuranceTypeErr: newFormValidation.insuranceTypeErr,
    insuranceTypeErrTxt: newFormValidation.insuranceTypeErrTxt,
    errCount: newFormValidation.errCount,
  });
};

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
      reasonErrTxt: 'Please mention the reason',
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
    : setFormValidation({...formValidation, reasonError: true, errMsg: true});
};

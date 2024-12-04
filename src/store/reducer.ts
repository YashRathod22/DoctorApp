import {
  CONSENT_DATA,
  DELETE_DATA,
  DELETE_USER_DATA,
  UPDATE_APPOINTMENT,
  UPDATE_USER_DATA,
  USER_APPOINT_DATA,
  USER_DATA,
} from './actionType';

const initialState = {
  userDetails: [],
  userAppointData: [],
  userConsentData: [],
  errorCount: 0,
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_DATA:
      const isNewUserData = !state.userDetails.some(
        userData => userData.id === action.data.id,
      );
      return {
        // ...state,
        // userDetails: [...state.userDetails, action.data],
        ...state,
        userDetails: isNewUserData
          ? [...state.userDetails, action.data]
          : state.userDetails,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        userDetails: state.userDetails.map(userData =>
          userData.id === action.data.id
            ? {...userData, ...action.data}
            : userData,
        ),
      };

    case DELETE_USER_DATA:
      return {
        ...state,
        userDetails: state.userDetails.filter(
          userData => userData.id !== action.data,
        ),
      };
    case USER_APPOINT_DATA:
      const isNewAppointment = !state.userAppointData.some(
        appointment => appointment.id === action.data.id,
      );

      return {
        ...state,
        userAppointData: isNewAppointment
          ? [...state.userAppointData, action.data]
          : state.userAppointData,
      };

    case UPDATE_APPOINTMENT:
      return {
        ...state,
        userAppointData: state.userAppointData.map(appointment =>
          appointment.id === action.data.id
            ? {...appointment, ...action.data}
            : appointment,
        ),
      };

    case DELETE_DATA:
      return {
        ...state,
        userAppointData: state.userAppointData.filter(
          appointment => appointment.id !== action.data,
        ),
      };

    case CONSENT_DATA:
      const isNewConsentData = !state.userConsentData.some(
        appointment => appointment.id === action.data.id,
      );
      return {
        ...state,
        userConsentData: isNewConsentData
          ? [...state.userConsentData, action.data]
          : state.userConsentData,
      };
    default:
      return state;
  }
};

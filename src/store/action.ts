import {
  DELETE_DATA,
  DELETE_USER_DATA,
  UPDATE_APPOINTMENT,
  UPDATE_USER_DATA,
  USER_APPOINT_DATA,
  USER_DATA,
} from './actionType';

export function storeData(details: any) {
  return {
    type: USER_DATA,
    data: details,
  };
}

export function updateUserData(details: any) {
  return {
    type: UPDATE_USER_DATA,
    data: details,
  };
}

export function deleteUserData(details: any) {
  return {
    type: DELETE_USER_DATA,
    data: details,
  };
}

export function storeAppointData(details: any) {
  return {
    type: USER_APPOINT_DATA,
    data: details,
  };
}

export function updateAppointData(details: any) {
  return {
    type: UPDATE_APPOINTMENT,
    data: details,
  };
}

export function deleteData(details: any) {
  return {
    type: DELETE_DATA,
    data: details,
  };
}

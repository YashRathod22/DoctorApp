import { DELETE_DATA, UPDATE_APPOINTMENT, USER_APPOINT_DATA, USER_DATA } from "./actionType";

export function storeData(details: any) {
    return {
        type: USER_DATA,
        data: details
    }
}

export function storeAppointData(details: any) {
    return {
        type: USER_APPOINT_DATA,
        data: details
    }
}

export function updateAppointData(details: any) {
    return {
        type: UPDATE_APPOINTMENT,
        data: details
    }
}

export function deleteData(details: any) {
    return {
        type: DELETE_DATA,
        data: details
    }
}

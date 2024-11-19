import { DELETE_DATA, UPDATE_APPOINTMENT, USER_APPOINT_DATA, USER_DATA } from "./actionType";

const initialState = {
    userDetails: [],
    userAppointData: [],
    errorCount: 0
}

export const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_DATA:
            return {
                ...state,
                userDetails: [...state.userDetails, action.data]
            }
        case USER_APPOINT_DATA:
            const isNewAppointment = !state.userAppointData.some(appointment => appointment.email === action.data.email);

            return {
                ...state,
                userAppointData: isNewAppointment
                    ? [...state.userAppointData, action.data]
                    : state.userAppointData
            };

        case UPDATE_APPOINTMENT:
            return {
                ...state,
                userAppointData: state.userAppointData.map(appointment =>
                    appointment.email === action.data.email
                        ? { ...appointment, ...action.data }
                        : appointment
                )
            };
        case DELETE_DATA:
            return {
                ...state,
                userAppointData: state.userAppointData.filter(appointment => appointment.email !== action.data.email)
            }


        default:
            return state
    }
}
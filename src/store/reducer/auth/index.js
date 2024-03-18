import { AUTH_FALIURE, AUTH_SUCCESS, AUTH_WATCHER } from "../../constant";

const initialState = {
  authError: null,
  authLoader: false,
  userData: false,
};

export default function authReducer(
  state = initialState,
  action
) {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case AUTH_WATCHER:
      return {
        ...state,
        authLoader: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        authError: null,
        userData: action.payload,
        authLoader: false,
      };
    case AUTH_FALIURE:
      return {
        ...state,
        authError: action,
        authLoader: false,
      };
    default:
      return state;
  }
}

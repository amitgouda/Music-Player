import commonActionType from "./ActionTypes/common";

export const toggleSnackBar = (open, messageType = "", message = "") => {
  return {
    type: commonActionType.TOGGLE_SNACK_BAR,
    isSnackBarOpen: open,
    messageType,
    message,
  };
};

export const toggleModalState = (isOpen = false, modalType, modalProps) => {
  return {
    type: commonActionType.TOGGLE_MODAL,
    isOpen,
    modalType,
    modalProps,
  };
};

export const setSongsState = (data = []) => {
  return {
    type: commonActionType.SET_SONGS_LIST,
    payload: data,
  };
};

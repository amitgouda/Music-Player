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

export const setSongsSearchState = (data = '') => {
  return {
    type: commonActionType.SET_SEARCH_SONGS_LIST,
    payload: data,
  };
};

export const setPlaylistState = (data = []) => {
  return {
    type: commonActionType.SET_PLAYLIST_LIST,
    payload: data,
  };
};

export const setUserState = (data = {}) => {
  return {
    type: commonActionType.SET_USER_DATA,
    payload: data,
  };
};

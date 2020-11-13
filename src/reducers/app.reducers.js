import commonActionTypes from "../Actions/ActionTypes/common";
import { getLocalStorageData } from "../SharedComponent/helpers/common";
const iState = {
  isOpen: false,
  messageType: "",
  message: "",
  songList: [],
  playList: [],
  searchString: "",
  userData: {
    _id: getLocalStorageData("userData")?._id || "",
    email: getLocalStorageData("userData")?.email || "",
  },
};

const appReducer = (state = iState, action) => {
  switch (action.type) {
    case commonActionTypes.TOGGLE_SNACK_BAR:
      state.isSnackBarOpen = action.isSnackBarOpen;
      state.messageType = action.messageType;
      state.message = action.message;
      break;
    case commonActionTypes.TOGGLE_MODAL:
      state.isOpen = action.isOpen;
      state.modalProps = action.modalProps;
      state.modalType = action.modalType;
      break;
    case commonActionTypes.SET_SONGS_LIST:
      state.songList = action.payload;
      break;
    case commonActionTypes.SET_PLAYLIST_LIST:
      state.playList = action.payload;
      break;
    case commonActionTypes.SET_SEARCH_SONGS_LIST:
      state.searchString = action.payload;
      break;
    case commonActionTypes.SET_USER_DATA:
      state.userData = action.payload;
      break;
    default:
      break;
  }
  return { ...state };
};

export default appReducer;

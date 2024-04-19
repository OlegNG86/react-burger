import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal";

const initialModalState = {
  isModalOpen: false,
};

export const modalReducer = (state = initialModalState, action: {type: string}) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        isModalOpen: true,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isModalOpen: false,
      };
    }
    default: {
      return state;
    }
  }
};

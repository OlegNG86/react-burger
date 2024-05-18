import { OPEN_MODAL, CLOSE_MODAL, TModalActions } from "../actions/modal";

export type TModalState = {
  isModalOpen: boolean;
}

export const initialModalState: TModalState = {
  isModalOpen: false,
};

export const modalReducer = (
  state = initialModalState,
  action: TModalActions
): TModalState => {
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

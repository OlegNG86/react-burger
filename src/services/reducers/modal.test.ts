import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal";
import { modalReducer } from "./modal";
import { TModalActions } from "../actions/modal";

type TModalState = {
  isModalOpen: boolean;
};

describe("modalReducer", () => {
  const initialModalState: TModalState = {
    isModalOpen: false,
  };
  it("should return the initial state", () => {
    expect(modalReducer(undefined, {} as TModalActions)).toEqual(
      initialModalState
    );
  });

  it("should handle OPEN_MODAL action", () => {
    const action = { type: OPEN_MODAL };
    const newState = modalReducer(undefined, action);
    expect(newState).toEqual({ isModalOpen: true });
  });

  it("should handle CLOSE_MODAL action", () => {
    const action = { type: CLOSE_MODAL };
    const newState = modalReducer({ isModalOpen: true }, action);
    expect(newState).toEqual({ isModalOpen: false });
  });
});

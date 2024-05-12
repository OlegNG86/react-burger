export const OPEN_MODAL: "OPEN_MODAL" = "OPEN_MODAL";
export const CLOSE_MODAL: "CLOSE_MODAL" = "CLOSE_MODAL";

export interface IOpenModalAction {
  (): { type: typeof OPEN_MODAL };
}

export interface ICloseModalAction {
  (): { type: typeof CLOSE_MODAL };
}

export type TModalActions =
  | ReturnType<IOpenModalAction>
  | ReturnType<ICloseModalAction>;

export const openModal: IOpenModalAction = () => {
  return {
    type: OPEN_MODAL,
  };
};

export const closeModal: ICloseModalAction = () => {
  return {
    type: CLOSE_MODAL,
  };
};

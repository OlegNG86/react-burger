import { TOrder } from "../../utils/types";

export const ORDERS_CONNECTION_INIT: 'ORDERS_CONNECTION_INIT' = 'ORDERS_CONNECTION_INIT';
export const ORDERS_CONNECTION_CLOSE: 'ORDERS_CONNECTION_CLOSE' = 'ORDERS_CONNECTION_CLOSE';
export const ORDERS_CONNECTION_SUCCESS: 'ORDERS_CONNECTION_SUCCESS' = 'ORDERS_CONNECTION_SUCCESS';
export const ORDERS_CONNECTION_CLOSED: 'ORDERS_CONNECTION_CLOSED' = 'ORDERS_CONNECTION_CLOSED';
export const ORDERS_CONNECTION_ERROR: 'ORDERS_CONNECTION_ERROR' = 'ORDERS_CONNECTION_ERROR';
export const ORDERS_GET_MESSAGE: 'ORDERS_GET_MESSAGE' = 'ORDERS_GET_MESSAGE';

export const ordersWsActions = {
    wsInit: ORDERS_CONNECTION_INIT,
    wsClose: ORDERS_CONNECTION_CLOSE,
    onOpen: ORDERS_CONNECTION_SUCCESS,
    onClose: ORDERS_CONNECTION_CLOSED,
    onError: ORDERS_CONNECTION_ERROR,
    onMessage: ORDERS_GET_MESSAGE,
};

export interface IOrdersConnectionInitAction {
    readonly type: typeof ORDERS_CONNECTION_INIT;
}

export interface IOrdersConnectionCloseAction {
    readonly type: typeof ORDERS_CONNECTION_CLOSE;
}

export interface IOrdersConnectionSuccessAction {
    readonly type: typeof ORDERS_CONNECTION_SUCCESS;
}

export interface IOrdersConnectionClosedAction {
    readonly type: typeof ORDERS_CONNECTION_CLOSED;
}

export interface IOrdersConnectionErrorAction {
    readonly type: typeof ORDERS_CONNECTION_ERROR;
    payload: string | null;
}

export interface IOrdersGetMessageAction {
    readonly type: typeof ORDERS_GET_MESSAGE;
    payload: {
        data: {
            orders: TOrder[];
            total: number;
            totalToday: number;
        };
    };
}

export type TOrdersActions =
    | IOrdersConnectionInitAction
    | IOrdersConnectionCloseAction
    | IOrdersConnectionSuccessAction
    | IOrdersConnectionClosedAction
    | IOrdersConnectionErrorAction
    | IOrdersGetMessageAction;
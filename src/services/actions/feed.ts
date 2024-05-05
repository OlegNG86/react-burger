import { TOrder } from "../../utils/types";

export const FEED_CONNECTION_INIT: 'FEED_CONNECTION_INIT' = 'FEED_CONNECTION_INIT';
export const FEED_CONNECTION_CLOSE: 'FEED_CONNECTION_CLOSE' = 'FEED_CONNECTION_CLOSE';
export const FEED_CONNECTION_SUCCESS: 'FEED_CONNECTION_SUCCESS' = 'FEED_CONNECTION_SUCCESS';
export const FEED_CONNECTION_CLOSED: 'FEED_CONNECTION_CLOSED' = 'FEED_CONNECTION_CLOSED';
export const FEED_CONNECTION_ERROR: 'FEED_CONNECTION_ERROR' = 'FEED_CONNECTION_ERROR';
export const FEED_GET_MESSAGE: 'FEED_GET_MESSAGE' = 'FEED_GET_MESSAGE';

export const feedWsActions = {
    wsInit: FEED_CONNECTION_INIT,
    wsClose: FEED_CONNECTION_CLOSE,
    onOpen: FEED_CONNECTION_SUCCESS,
    onClose: FEED_CONNECTION_CLOSED,
    onError: FEED_CONNECTION_ERROR,
    onMessage: FEED_GET_MESSAGE,
};

export interface IFeedConnectionInitAction {
    readonly type: typeof FEED_CONNECTION_INIT;
}

export interface IFeedConnectionCloseAction {
    readonly type: typeof FEED_CONNECTION_CLOSE;
}

export interface IFeedConnectionSuccessAction {
    readonly type: typeof FEED_CONNECTION_SUCCESS;
}

export interface IFeedConnectionClosedAction {
    readonly type: typeof FEED_CONNECTION_CLOSED;
}

export interface IFeedConnectionErrorAction {
    readonly type: typeof FEED_CONNECTION_ERROR;
    payload: {
        error: any;
    };
}

export interface IFeedGetMessageAction {
    readonly type: typeof FEED_GET_MESSAGE;
    payload: {
        data: {
            orders: TOrder[];
            total: number;
            totalToday: number;
        };
    };
}

export type TFeedActions =
    | IFeedConnectionInitAction
    | IFeedConnectionCloseAction
    | IFeedConnectionSuccessAction
    | IFeedConnectionClosedAction
    | IFeedConnectionErrorAction
    | IFeedGetMessageAction;
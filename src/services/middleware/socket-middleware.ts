import { Middleware, UnknownAction } from "redux";
import { convertErrorResponseToString } from "../../utils/common";

type WsActionTypes = {
  wsInit: string;
  wsClose: string;
  wsSendMessage?: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export interface ActionTemplate {
  type: string;
  payload: any;
}

export type TActionSelfCopy = <T extends UnknownAction>(
  action: T,
  ...extraArgs: any[]
) => T;

export const checkActionObject = (data: unknown): data is ActionTemplate => {
  return (
    typeof data === "object" &&
    data instanceof Object &&
    "payload" in data &&
    "type" in data &&
    typeof data.type === "string"
  );
};

export const socketMiddleware = (
  wsActions: WsActionTypes
): Middleware<{}, unknown, TActionSelfCopy> => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      next(action);
      if (!checkActionObject(action)) return;

      const { dispatch } = store;
      const { type, payload } = action;
      const {
        wsInit,
        wsClose,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;
      if (!payload) return;
      if (type === wsInit) {
        socket = new WebSocket(payload);
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: convertErrorResponseToString(event) });
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({
            type: onMessage,
            payload: {
              data: parsedData,
              timestamp: new Date().getTime() / 100,
            },
          });
        };

        socket.onclose = (event: Event) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      if (wsClose && type === wsClose && socket) {
        socket.close();
      }

      if (wsSendMessage && type === wsSendMessage && socket) {
        socket.send(JSON.stringify(payload));
      }
    };
  };
};

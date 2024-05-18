import { store } from "./index";
import burgerIngredientsReducer from "./burger-ingredients";
import burgerConstructorReducer from "./burger-constructor";
import { modalReducer } from "./modal";
import orderReducer from "./order-details";
import authorizationReducer from "./authorization";
import userReducer from "./user";
import { feedReducer } from "./feed";
import { ordersReducer } from "./orders";

describe("rootReducer", () => {
  it("should handle initial state", () => {
    expect(store.getState().ingredients).toEqual(
      burgerIngredientsReducer(undefined, {} as any)
    );
    expect(store.getState().burgerConstructor).toEqual(
      burgerConstructorReducer(undefined, {} as any)
    );
    expect(store.getState().modal).toEqual(modalReducer(undefined, {} as any));
    expect(store.getState().order).toEqual(orderReducer(undefined, {} as any));
    expect(store.getState().authorization).toEqual(
      authorizationReducer(undefined, {} as any)
    );
    expect(store.getState().user).toEqual(userReducer(undefined, {} as any));
    expect(store.getState().feed).toEqual(feedReducer(undefined, {} as any));
    expect(store.getState().orders).toEqual(
      ordersReducer(undefined, {} as any)
    );
  });
});

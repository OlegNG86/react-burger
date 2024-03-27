import {
    SET_USER_DATA,
  } from "../actions/authorization";
  
  const initialState = {
    auth: false,
    profile: {
        email: "",
        name: "", 
    },
  };
  
  const authorizationReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER_DATA:
        return {
          ...state,
          auth: !!action.payload.name && !!action.payload.email,
          profile: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authorizationReducer;
  
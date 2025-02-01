const initialState = {
    user: {},
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case "UPDATE_PROFILE":
        return {
          ...state,
          user: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default profileReducer;
  
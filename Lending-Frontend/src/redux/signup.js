const reducer = (state = 0, actions) => {
  switch (actions.type) {
    case "NEXT":
      state = state + 1;
      return state;
    case "PREV":
      state = state - 1;
      return state;
    case "RESET":
      state = 0;
    default:
      return state;
  }
};

export default reducer;

const reducer = (state = false, actions) => {
  switch (actions.type) {
    case "LOAD":
      return true;
    case "UNLOAD":
      return false;
    default:
      return state;
  }
};

export default reducer;

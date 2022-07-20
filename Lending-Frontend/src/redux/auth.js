const reducer = (
  state = localStorage.getItem("profile")
    ? { user: JSON.parse(localStorage.getItem("profile")) }
    : null,
  actions
) => {
  switch (actions.type) {
    case "LOGIN":
      localStorage.setItem("profile", JSON.stringify(actions.data.user));
      localStorage.setItem("token", "Bearer " + actions.data.token);
      return { ...state, ...actions.data };
    case "UPDATE PROFILE":
      localStorage.setItem("profile", JSON.stringify(actions.data));
      return { ...state, user: actions.data };
    case "LOGOUT":
      localStorage.clear();
      return { user: null, token: "" };
    default:
      return { ...state };
  }
};

export default reducer;

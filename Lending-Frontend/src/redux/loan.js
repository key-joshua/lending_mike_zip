const reducer = (
  state = {
    loans: [],
    loan: {},
    granted: [],
    totalPages: 0,
    page: 0,
    total: 0,
  },
  actions
) => {
  switch (actions.type) {
    case "GET LOANS":
      return {
        ...state,
        ...(!actions.loan
          ? { loans: [...actions.data.results] }
          : { granted: [...actions.data.results] }),
        totalPages: actions.data.totalePages,
        page: actions.data.page,
        total: actions.data.results,
      };
    case "RESET_LOANS":
      return {
        loans: [],
        loan: {},
        totalPages: 0,
        granted: [],
        page: 0,
        total: 0,
      };

    case "SINGLE LOAN":
      return { ...state, loan: actions.data };
    default:
      return { ...state };
  }
};

export default reducer;

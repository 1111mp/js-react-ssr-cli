export const CHANGE_LIST = "HOME/CHANGE_LIST";

const defaultState = {
  name: "react ssr",
  list: [],
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_LIST:
      const newState = {
        ...state,
        list: action.list,
      };
      return newState;
    default:
      return state;
  }
};

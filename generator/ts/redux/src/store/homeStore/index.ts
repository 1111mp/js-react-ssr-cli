export const CHANGE_LIST = "HOME/CHANGE_LIST";

const defaultState: any = {
  name: "react ssr",
  list: [],
};
export default (state: any = defaultState, action: any) => {
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

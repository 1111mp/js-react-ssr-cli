//actions.js
import axios from "axios";
import { CHANGE_LIST } from "./index";
//普通action
const changeList = (list: any) => ({
  type: CHANGE_LIST,
  list,
});
//异步操作的action(采用thunk中间件)
export const getHomeList = () => {
  return (dispatch: any) => {
    return axios.get("http://localhost:3000/api").then((res: any) => {
      // console.log(res)
      const list = res.data;
      dispatch(changeList(list));
    });
  };
};

import { observable, action } from "mobx";
import axios from "axios";

export default class HomeStore {
  @observable name = "react ssr";
  @observable list = [];

  @action.bound
  getHomeList() {
    return axios.get("http://localhost:3000/api").then((res) => {
      // console.log(res)
      this.list = res.data;
    });
  }
}

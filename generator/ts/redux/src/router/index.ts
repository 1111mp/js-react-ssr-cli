import loadable from "@loadable/component";
import { getHomeList } from "../store/homeStore/actions";

export default [
  {
    path: "/",
    component: loadable(() => import("../pages/home")),
    exact: true,
    asyncData(store: any, params: any) {
      console.log(params);
      return store.dispatch(getHomeList());
    },
    key: "home",
  },
  {
    path: "/login",
    component: loadable(() => import("../pages/login")),
    exact: true,
    key: "login",
  },
];

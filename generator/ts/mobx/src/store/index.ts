import { createContext, useContext } from "react";
import { RouterStore } from "mobx-react-router";
import HomeStore from "./homeStore";

/** https://ts.xcatliu.com/basics/declaration-files.html declare var 声明全局变量 */
declare var _$process: any;

if (_$process.env.NODE_ENV === "development") {
  import("mobx-logger").then((logger) => {
    logger.enableLogging({
      predicate: () => true,
      action: true,
      reaction: true,
      transaction: true,
      compute: true,
    });
  });
}

const storageMap: any = {
  routerStore: RouterStore,
  homeStore: HomeStore,
};

function mergeObservables(target: any) {
  let source = (window as any).__INITIAL_STATE__;
  if (source) {
    for (let key in target) {
      if (typeof source !== "undefined") {
        target[key] = Object.assign(target[key], source[key]);
      }
    }
  }
}

export function createStore() {
  let store: any = {};

  Object.keys(storageMap).forEach((key) => {
    store[key] = new storageMap[key]();
  });

  if (typeof window !== "undefined") {
    mergeObservables(store);
  }

  return {
    ...store,
  };
}

const stores = createStore();

export const StoreContext = createContext(stores);

export const useStores = () => useContext(StoreContext);

export function useTargetStore(target: string) {
  const stores = useStores();

  return target ? stores[target] : stores;
}

export default stores;

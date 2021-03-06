import { createContext, useContext } from 'react';
import { RouterStore } from "mobx-react-router";
import HomeStore from "./homeStore";

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

const storageMap = {
  routerStore: RouterStore,
  homeStore: HomeStore,
};

function mergeObservables(target) {
  let source = window.__INITIAL_STATE__;
  if (source) {
    for (let key in target) {
      if (typeof source !== "undefined") {
        target[key] = Object.assign(target[key], source[key]);
      }
    }
  }
}

function createStore() {
  let store = {};

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

export function useTargetStore(target) {
  const stores = useStores();

  return target ? stores[target] : stores;
}

export default stores;

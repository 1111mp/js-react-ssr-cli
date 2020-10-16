import React from "react";
import { MobXProviderContext, useObserver } from "mobx-react";

export function useStores() {
  return React.useContext(MobXProviderContext);
}

export function useTargetStore(target) {
  const { store } = useStores();
  return useObserver(() => store[target]);
}

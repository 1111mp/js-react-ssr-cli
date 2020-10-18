import React from "react";
import { MobXProviderContext, useObserver } from "mobx-react";

export function useStores() {
  return React.useContext(MobXProviderContext);
}

export function useTargetStore(target: string) {
  const { store } = useStores();
  return useObserver(() => store[target]);
}

import { createContext, Context } from "react";
import { StompSessionProviderContext } from "../interfaces/StompSessionProviderContext";

const StompContextMap = new Map<
  string,
  Context<StompSessionProviderContext | undefined>
>();

const getStompContext = (id: string) => {
  if (StompContextMap.has(id)) {
    return StompContextMap.get(id) as Context<
      StompSessionProviderContext | undefined
    >;
  }

  const context = createContext<StompSessionProviderContext | undefined>(
    undefined,
  );

  StompContextMap.set(id, context);

  return context;
};

export default getStompContext;

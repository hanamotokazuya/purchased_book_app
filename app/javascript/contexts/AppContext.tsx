import React, { createContext } from "react";

// const AppContext = createContext<Context | undefined>(undefined);
const AppContext = createContext({} as { state: State; dispatch: React.Dispatch<Action> });

export default AppContext;

import React, { useState, useEffect, useContext, useRef } from "react";

const AppContext = React.createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode})=>{
  const [prevStepCount, setPrevStepCount] = useState<number>(0)

  return(
    <AppContext.Provider value={{
        prevStepCount, setPrevStepCount        
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = ()=>{
  return useContext(AppContext);
}
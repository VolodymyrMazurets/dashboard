import React, { useState, useContext, createContext, FC } from 'react';

interface LoaderType {
  show: () => void;
  hide: () => void;
  active: boolean;
}

interface LoaderContextType {
  spinnerLoader: LoaderType;
  lineLoader: LoaderType;
}

const initContext: LoaderType = {
  show: () => undefined,
  hide: () => undefined,
  active: false,
};

export const LoaderContext = createContext<LoaderContextType>({
  lineLoader: initContext,
  spinnerLoader: initContext,
});
export const useLoader = () => useContext(LoaderContext);

export const LoaderContextProvider: FC = ({ children }) => {
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const [lineLoading, setLineLoading] = useState(false);

  const spinnerLoader = {
    show: () => setSpinnerLoading(true),
    hide: () => setTimeout(() => setSpinnerLoading(false), 1000),
    active: spinnerLoading,
  };
  const lineLoader = {
    show: () => setLineLoading(true),
    hide: () => setTimeout(() => setLineLoading(false), 1000),
    active: lineLoading,
  };
  return (
    <LoaderContext.Provider value={{ spinnerLoader, lineLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

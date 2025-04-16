// context/AppContext.tsx
import { createContext, useState, ReactNode, useContext } from "react";

type AppContextType = {
  step: number;
  setStep: (step: number) => void;
  imageUrl: string;
  setImageUrl: (url: string) => void;
};

const defaultContext: AppContextType = {
  step: 0,
  setStep: () => {},
  imageUrl: "",
  setImageUrl: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <AppContext.Provider value={{ step, setStep, imageUrl, setImageUrl }}>
      {children}
    </AppContext.Provider>
  );
};

// optional helper hook
export const useAppContext = () => useContext(AppContext);

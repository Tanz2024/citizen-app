import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'citizen-bd.low-data-mode';

type LowDataModeContextValue = {
  isLowDataMode: boolean;
  setLowDataMode: (value: boolean) => void;
};

const LowDataModeContext = createContext<LowDataModeContextValue | null>(null);

export function LowDataModeProvider({ children }: PropsWithChildren) {
  const [isLowDataMode, setIsLowDataMode] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value === 'true') setIsLowDataMode(true);
    });
  }, []);

  function setLowDataMode(value: boolean) {
    setIsLowDataMode(value);
    AsyncStorage.setItem(STORAGE_KEY, value ? 'true' : 'false');
  }

  return (
    <LowDataModeContext.Provider value={{ isLowDataMode, setLowDataMode }}>
      {children}
    </LowDataModeContext.Provider>
  );
}

export function useLowDataMode() {
  const context = useContext(LowDataModeContext);
  if (!context) {
    throw new Error('useLowDataMode must be used within a LowDataModeProvider');
  }
  return context;
}

// context/HeaderContext.tsx
'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type HeaderContextType = {
  headerContent: ReactNode;
  setHeaderContent: (content: ReactNode) => void;
};

const HeaderContext = createContext<HeaderContextType>({
  headerContent: null,
  setHeaderContent: () => {},
});

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [headerContent, setHeaderContent] = useState<ReactNode>(null);
  return (
    <HeaderContext.Provider value={{ headerContent, setHeaderContent }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);

// ✅ The reusable slot component
export const HeaderSlot = ({ children }: { children: ReactNode }) => {
  const { setHeaderContent } = useHeader();

  useEffect(() => {
    setHeaderContent(children);
    return () => setHeaderContent(null);
  }, []);

  return null;
};

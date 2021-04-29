import { createContext } from 'react';
import { TokenContextType } from 'src/types/TokenContext';

const contextDefaultValues: TokenContextType = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
};

export const TokenContext = createContext<TokenContextType>(contextDefaultValues);

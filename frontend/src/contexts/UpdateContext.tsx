import { createContext, type SetStateAction } from 'react';

export const UpdateContext = createContext<{
  needsUpdate: boolean;
  setNeedsUpdate: React.Dispatch<SetStateAction<boolean>>;
}>({ needsUpdate: true, setNeedsUpdate: () => {} });

'use client';
import { DesignerContext } from '@/providers/ContextProvider';
import { useContext } from 'react';

const useDesign = () => {
  const isValid = useContext(DesignerContext);
  if (!isValid) throw new Error('Something went wrong with useContext');
  return isValid;
};
export default useDesign;

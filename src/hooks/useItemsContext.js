import { useContext } from 'react';
import { ItemsContext } from '../contexts/ItemsContextProvider';

function useItemsContext() {
  const context = useContext(ItemsContext);
  if (!useContext) {
    throw new Error(
      'useItemsContext must be used within a ItemsContextProvider'
    );
  }
  return context;
}
export default useItemsContext;

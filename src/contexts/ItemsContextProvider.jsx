import { initialItems } from '../lib/constants';
import { secondaryBtns } from '../lib/constants';
import { useState, useEffect, createContext } from 'react';

export const ItemsContext = createContext();
function ItemsContextProvider({ children }) {
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem('items')) || initialItems
  );

  const handleAddItem = value =>
    setItems(items => [
      ...items,
      { id: new Date().getTime(), name: value, packed: false },
    ]);

  const handleToggleItem = item =>
    setItems(
      items.map(i => (i.id !== item.id ? i : { ...i, packed: !i.packed }))
    );

  const handleRemoveItem = itemX =>
    setItems(items => items.filter(i => i.id !== itemX.id));

  const markAllAs = packed =>
    setItems(items => items.map(item => ({ ...item, packed })));

  const setEventsButtons = text => {
    const actions = {
      [secondaryBtns[0]]: () => markAllAs(true),
      [secondaryBtns[1]]: () => markAllAs(false),
      [secondaryBtns[2]]: () => setItems(initialItems),
      [secondaryBtns[3]]: () => setItems([]),
    };
    actions[text]?.();
  };

  const countPacked = () => ({
    packed: items.filter(item => item.packed).length,
    total: items.length,
  });

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  return (
    <ItemsContext.Provider
      value={{
        items,
        handleAddItem,
        handleToggleItem,
        handleRemoveItem,
        setEventsButtons,
        countPacked,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}
export default ItemsContextProvider;

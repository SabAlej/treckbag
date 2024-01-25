import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialItems, secondaryBtns } from '../lib/constants';

const useItemStore = create(
  persist(
    (set, get) => {
      const actions = {
        [secondaryBtns[0]]: () => get().markAllAs(true),
        [secondaryBtns[1]]: () => get().markAllAs(false),
        [secondaryBtns[2]]: () => get().setItems(initialItems),
        [secondaryBtns[3]]: () => get().setItems([]),
      };

      return {
        items: initialItems,
        removeAllItems: () => {
          set(() => ({ items: [] }));
        },
        resetToInitialItems: () => {
          set(() => ({ items: initialItems }));
        },
        addItem: value => {
          set(state => ({
            items: [
              ...state.items,
              { id: new Date().getTime(), name: value, packed: false },
            ],
          }));
        },
        removeItem: item => {
          set(state => ({ items: state.items.filter(i => i.id !== item.id) }));
        },
        toggleItem: item => {
          set(state => ({
            items: state.items.map(i =>
              i.id !== item.id ? i : { ...i, packed: !i.packed }
            ),
          }));
        },
        markAllAs: packed => {
          set(state => ({
            items: state.items.map(item => ({ ...item, packed })),
          }));
        },
        setItems: items => set({ items }),
        countPacked: () => ({
          packed: get().items.filter(item => item.packed).length,
          total: get().items.length,
        }),
        setEventsButtons: text => {
          actions[text]?.();
        },
      };
    },
    {
      name: 'items',
    }
  )
);

export default useItemStore;
